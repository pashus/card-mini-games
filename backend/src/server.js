require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { pool } = require("./db/pool");

const app = express();
const uploadsDir = path.join(__dirname, "..", "uploads");

fs.mkdirSync(uploadsDir, { recursive: true });
app.set("trust proxy", true);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname) || ".jpg";
    const safeBaseName = path
      .basename(file.originalname, extension)
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .slice(0, 50);
    cb(null, `${Date.now()}-${safeBaseName}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: { files: 1, fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image uploads are allowed"));
      return;
    }

    cb(null, true);
  },
});

function removeUploadedFile(file) {
  if (!file) {
    return;
  }

  fs.rm(file.path, { force: true }, () => {});
}

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

function buildFileUrl(req, filePath) {
  return `${req.protocol}://${req.get("host")}${filePath}`;
}

function getLocalUploadPathFromUrl(value) {
  if (!value) {
    return null;
  }

  if (value.startsWith("/uploads/")) {
    return value;
  }

  if (!/^https?:\/\//i.test(value)) {
    return null;
  }

  try {
    const parsedUrl = new URL(value);
    return parsedUrl.pathname.startsWith("/uploads/")
      ? parsedUrl.pathname
      : null;
  } catch {
    return null;
  }
}

function toStoredImagePath(image) {
  return getLocalUploadPathFromUrl(image) ?? image;
}

function normalizeImageUrl(req, image) {
  if (!image) {
    return image;
  }

  const localUploadPath = getLocalUploadPathFromUrl(image);
  if (localUploadPath) {
    return buildFileUrl(req, localUploadPath);
  }

  return image;
}

function removeLocalUploadByPath(imagePath) {
  const localUploadPath = getLocalUploadPathFromUrl(imagePath);
  if (!localUploadPath) {
    return;
  }

  const filePath = path.join(uploadsDir, path.basename(localUploadPath));
  fs.rm(filePath, { force: true }, () => {});
}

function mapCard(req, row) {
  return {
    id: String(row.id),
    nextYnCardId: row.next_yn_card_id ? String(row.next_yn_card_id) : null,
    title: row.title,
    image: normalizeImageUrl(req, row.image),
    cardColor: row.card_color,
    question: row.question,
    answer: row.answer,
    categories: row.categories ?? [],
    popularity: Number(row.popularity),
    difficulty: Number(row.difficulty),
    duration: Number(row.duration),
  };
}

const cardSelect = `
  SELECT
    c.id,
    next_card_data.next_yn_card_id,
    c.title,
    c.image,
    c.card_color,
    c.question,
    c.answer,
    categories_data.categories,
    reviews_data.popularity,
    reviews_data.difficulty,
    reviews_data.duration
  FROM yes_no_cards c
  LEFT JOIN LATERAL (
    SELECT next_card.id AS next_yn_card_id
    FROM yes_no_cards next_card
    WHERE next_card.id > c.id
    ORDER BY next_card.id ASC
    LIMIT 1
  ) AS next_card_data ON TRUE
  LEFT JOIN LATERAL (
    SELECT COALESCE(
      json_agg(
        json_build_object('name', cc.name, 'color', cc.color)
        ORDER BY cc.id
      ),
      '[]'::json
    ) AS categories
    FROM card_categories cc
    WHERE cc.card_id = c.id
  ) AS categories_data ON TRUE
  LEFT JOIN LATERAL (
    SELECT
      COALESCE(
        ROUND(
          AVG(
            CASE r.liked
              WHEN 'yes' THEN 100
              WHEN 'meh' THEN 50
              ELSE 0
            END
          )
        ),
        0
      ) AS popularity,
      COALESCE(
        ROUND(
          AVG(
            CASE r.difficulty
              WHEN 'low' THEN 3
              WHEN 'medium' THEN 6
              ELSE 9
            END
          )
        ),
        0
      ) AS difficulty,
      COALESCE(ROUND(AVG(r.duration)), 0) AS duration
    FROM reviews r
    WHERE r.card_id = c.id
  ) AS reviews_data ON TRUE
`;

app.get("/api/v1/yes-no-cards", async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safeLimit =
    Number.isFinite(limit) && limit > 0 ? Math.min(limit, 50) : 10;
  const offset = (safePage - 1) * safeLimit;

  const totalResult = await pool.query(
    "SELECT COUNT(*)::int AS count FROM yes_no_cards",
  );
  const total = totalResult.rows[0].count;

  const cardsResult = await pool.query(
    `${cardSelect}
      ORDER BY c.id DESC
      LIMIT $1 OFFSET $2`,
    [safeLimit, offset],
  );

  const totalPages = Math.max(1, Math.ceil(total / safeLimit));

  res.json({
    data: cardsResult.rows.map((row) => mapCard(req, row)),
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages,
      hasNext: safePage < totalPages,
      hasPrev: safePage > 1,
    },
  });
});

app.get("/api/v1/yes-no-cards/:id", async (req, res) => {
  const id = Number(req.params.id);

  const result = await pool.query(`${cardSelect} WHERE c.id = $1`, [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Card not found" });
  }

  return res.json(mapCard(req, result.rows[0]));
});

app.post("/api/v1/yes-no-cards", upload.single("image"), async (req, res) => {
  const client = await pool.connect();
  try {
    const categories =
      typeof req.body.categories === "string" && req.body.categories.length > 0
        ? JSON.parse(req.body.categories)
        : [];
    const { title, cardColor, question, answer } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    await client.query("BEGIN");

    const createCard = await client.query(
      `INSERT INTO yes_no_cards (title, image, card_color, question, answer)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id`,
      [title, image, cardColor, question, answer],
    );

    const cardId = createCard.rows[0].id;

    for (const category of categories) {
      await client.query(
        `INSERT INTO card_categories (card_id, name, color)
          VALUES ($1, $2, $3)`,
        [cardId, category.name, category.color],
      );
    }

    await client.query("COMMIT");

    const result = await pool.query(`${cardSelect} WHERE c.id = $1`, [cardId]);

    return res.status(201).json(mapCard(req, result.rows[0]));
  } catch (error) {
    await client.query("ROLLBACK");
    removeUploadedFile(req.file);
    return res
      .status(400)
      .json({ message: "Could not create card", error: error.message });
  } finally {
    client.release();
  }
});

app.patch(
  "/api/v1/yes-no-cards/:id",
  upload.single("image"),
  async (req, res) => {
    const id = Number(req.params.id);
    const client = await pool.connect();

    try {
      const categories =
        typeof req.body.categories === "string" &&
        req.body.categories.length > 0
          ? JSON.parse(req.body.categories)
          : [];
      const { title, cardColor, question, answer } = req.body;
      await client.query("BEGIN");

      const existingCardResult = await client.query(
        "SELECT image FROM yes_no_cards WHERE id = $1",
        [id],
      );

      if (existingCardResult.rows.length === 0) {
        removeUploadedFile(req.file);
        await client.query("ROLLBACK");
        return res.status(404).json({ message: "Card not found" });
      }

      const previousImage = existingCardResult.rows[0].image;
      const nextImage = req.file
        ? `/uploads/${req.file.filename}`
        : toStoredImagePath(req.body.image || previousImage);

      if (!nextImage) {
        removeUploadedFile(req.file);
        await client.query("ROLLBACK");
        return res.status(400).json({ message: "Image is required" });
      }

      const updated = await client.query(
        `UPDATE yes_no_cards
        SET title = $1, image = $2, card_color = $3, question = $4, answer = $5, updated_at = NOW()
        WHERE id = $6
        RETURNING id`,
        [title, nextImage, cardColor, question, answer, id],
      );

      await client.query("DELETE FROM card_categories WHERE card_id = $1", [
        id,
      ]);
      for (const category of categories) {
        await client.query(
          `INSERT INTO card_categories (card_id, name, color)
          VALUES ($1, $2, $3)`,
          [id, category.name, category.color],
        );
      }

      await client.query("COMMIT");

      if (req.file && previousImage !== nextImage) {
        removeLocalUploadByPath(previousImage);
      }

      const result = await pool.query(`${cardSelect} WHERE c.id = $1`, [id]);

      return res.json(mapCard(req, result.rows[0]));
    } catch (error) {
      await client.query("ROLLBACK");
      removeUploadedFile(req.file);
      return res
        .status(400)
        .json({ message: "Could not update card", error: error.message });
    } finally {
      client.release();
    }
  },
);

app.delete("/api/v1/yes-no-cards/:id", async (req, res) => {
  const id = Number(req.params.id);
  const existingCardResult = await pool.query(
    "SELECT image FROM yes_no_cards WHERE id = $1",
    [id],
  );

  if (existingCardResult.rows.length === 0) {
    return res.status(404).json({ message: "Card not found" });
  }

  const image = existingCardResult.rows[0].image;

  await pool.query("DELETE FROM yes_no_cards WHERE id = $1", [id]);
  removeLocalUploadByPath(image);

  return res.json({ message: "Card deleted" });
});

app.get("/api/v1/reviews", async (_req, res) => {
  const result = await pool.query(
    'SELECT id, card_id AS "cardId", liked, difficulty, duration FROM reviews ORDER BY id DESC',
  );
  res.json(result.rows);
});

app.get("/api/v1/reviews/:id", async (req, res) => {
  const id = Number(req.params.id);
  const result = await pool.query(
    'SELECT id, card_id AS "cardId", liked, difficulty, duration FROM reviews WHERE id = $1',
    [id],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Review not found" });
  }

  return res.json(result.rows[0]);
});

app.post("/api/v1/reviews", async (req, res) => {
  const { cardId, liked, difficulty, duration } = req.body;

  const result = await pool.query(
    `INSERT INTO reviews (card_id, liked, difficulty, duration)
      VALUES ($1, $2, $3, $4)
      RETURNING id, card_id AS "cardId", liked, difficulty, duration`,
    [cardId, liked, difficulty, duration],
  );

  res.status(201).json(result.rows[0]);
});

app.get("/api/v1/health", (_req, res) => {
  res.json({ ok: true });
});

app.use((error, _req, res, _next) => {
  console.error(error);

  if (error instanceof multer.MulterError) {
    return res.status(400).json({ message: error.message });
  }

  if (error.message === "Only image uploads are allowed") {
    return res.status(400).json({ message: error.message });
  }

  res.status(500).json({ message: "Internal server error" });
});

const port = Number(process.env.SERVER_PORT);
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
