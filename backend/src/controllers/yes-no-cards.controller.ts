import {
  createCardService,
  deleteCardService,
  getCardService,
  getCardsService,
  updateCardService,
} from "../services";

export async function createCard(req: any, res: any) {
  try {
    const { title, cardColor, question, answer } = req.body;
    const categories = JSON.parse(req.body.categories);
    const image = `/uploads/${req.file.filename}`;
    // const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const card = await createCardService(
      title,
      cardColor,
      question,
      answer,
      image,
      categories,
    );

    return res.status(201).json(card);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}

export async function getCard(req: any, res: any) {
  try {
    const card = await getCardService(Number(req.params.id));
    if (!card) {
      return res
        .status(404)
        .json({ error: "Карточка по такому id не найдена" });
    }

    return res.status(200).json(card);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}

export async function getCards(req: any, res: any) {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 12);
  const sort = req.query.sort ?? "desc";

  try {
    const { cards, total } = await getCardsService(page, limit, sort);
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      data: cards,
      pagination: {
        page: page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}

export async function updateCard(req: any, res: any) {
  try {
    const id = Number(req.params.id);
    const { title, cardColor, question, answer } = req.body;
    const categories = JSON.parse(req.body.categories);
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const card = await updateCardService(id, {
      title,
      cardColor,
      question,
      answer,
      image,
      categories,
    });

    return res.status(200).json(card);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}

export async function deleteCard(req: any, res: any) {
  try {
    const card = await deleteCardService(Number(req.params.id));

    return res.status(200).json({ message: "Карточка успешно удалена" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}
