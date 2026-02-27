require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { pool } = require("./db/pool");

const app = express();

app.use(cors());
app.use(express.json());

function mapCard(row) {
  return {
    id: String(row.id),
    title: row.title,
    image: row.image,
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
    data: cardsResult.rows.map(mapCard),
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

  return res.json(mapCard(result.rows[0]));
});

app.post("/api/v1/yes-no-cards", async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      title,
      image,
      cardColor,
      question,
      answer,
      categories = [],
    } = req.body;
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

    return res.status(201).json(mapCard(result.rows[0]));
  } catch (error) {
    await client.query("ROLLBACK");
    return res
      .status(400)
      .json({ message: "Could not create card", error: error.message });
  } finally {
    client.release();
  }
});

app.patch("/api/v1/yes-no-cards/:id", async (req, res) => {
  const id = Number(req.params.id);
  const client = await pool.connect();

  try {
    const {
      title,
      image,
      cardColor,
      question,
      answer,
      categories = [],
    } = req.body;
    await client.query("BEGIN");

    const updated = await client.query(
      `UPDATE yes_no_cards
        SET title = $1, image = $2, card_color = $3, question = $4, answer = $5, updated_at = NOW()
        WHERE id = $6
        RETURNING id`,
      [title, image, cardColor, question, answer, id],
    );

    if (updated.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Card not found" });
    }

    await client.query("DELETE FROM card_categories WHERE card_id = $1", [id]);
    for (const category of categories) {
      await client.query(
        `INSERT INTO card_categories (card_id, name, color)
          VALUES ($1, $2, $3)`,
        [id, category.name, category.color],
      );
    }

    await client.query("COMMIT");

    const result = await pool.query(`${cardSelect} WHERE c.id = $1`, [id]);

    return res.json(mapCard(result.rows[0]));
  } catch (error) {
    await client.query("ROLLBACK");
    return res
      .status(400)
      .json({ message: "Could not update card", error: error.message });
  } finally {
    client.release();
  }
});

app.delete("/api/v1/yes-no-cards/:id", async (req, res) => {
  const id = Number(req.params.id);
  const result = await pool.query("DELETE FROM yes_no_cards WHERE id = $1", [
    id,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Card not found" });
  }

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
  res.status(500).json({ message: "Internal server error" });
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
