import { CODE_ERROR } from "../constants";
import {
  createCardService,
  deleteCardService,
  getCardService,
  getCardsService,
  updateCardService,
} from "../services";
import type { IYnCard } from "../types";
import { failure, success } from "../utils";

export async function createCard(req: any, res: any) {
  try {
    const { title, cardColor, question, answer } = req.body;
    const categories = JSON.parse(req.body.categories);
    const image = `/uploads/${req.file.filename}`;
    // const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const card: IYnCard = await createCardService(
      title,
      cardColor,
      question,
      answer,
      image,
      categories,
    );

    return res.status(201).json(success<IYnCard>(card));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(failure(500, CODE_ERROR[500], "Ошибка сервера"));
  }
}

export async function getCard(req: any, res: any) {
  try {
    const card: IYnCard = await getCardService(Number(req.params.id));
    if (!card) {
      return res
        .status(404)
        .json(
          failure(404, CODE_ERROR[404], "Карточка по такому id не найдена"),
        );
    }

    return res.status(200).json(success<IYnCard>(card));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(failure(500, CODE_ERROR[500], "Ошибка сервера"));
  }
}

export async function getCards(req: any, res: any) {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 12);
  const idSort = req.query.idSort ?? "desc";
  const nameSort = req.query.nameSort ?? undefined;

  try {
    const { cards, total }: { cards: IYnCard[]; total: number } =
      await getCardsService(page, limit, idSort, nameSort);
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json(
      success<IYnCard[]>(cards, {
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      }),
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(failure(500, CODE_ERROR[500], "Ошибка сервера"));
  }
}

export async function updateCard(req: any, res: any) {
  try {
    const id = Number(req.params.id);
    const { title, cardColor, question, answer } = req.body;
    const categories = JSON.parse(req.body.categories);
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const card: IYnCard = await updateCardService(id, {
      title,
      cardColor,
      question,
      answer,
      image,
      categories,
    });

    return res.status(200).json(success<IYnCard>(card));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(failure(500, CODE_ERROR[500], "Ошибка сервера"));
  }
}

export async function deleteCard(req: any, res: any) {
  try {
    const card: IYnCard = await deleteCardService(Number(req.params.id));

    return res.status(200).json(success<IYnCard>(card));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(failure(500, CODE_ERROR[500], "Ошибка сервера"));
  }
}
