import { CODE_ERROR } from "../constants";
import { createReviewService, getReviewsService } from "../services";
import type { IYnReview } from "../types";
import { failure, success } from "../utils";

export async function createReview(req: any, res: any) {
  try {
    const { cardId, liked, difficulty, duration } = req.body;
    const review = await createReviewService(
      cardId,
      liked,
      difficulty,
      duration,
    );

    return res.status(201).json(success<IYnReview>(review));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(failure(500, CODE_ERROR[500], "Ошибка сервера"));
  }
}

export async function getReviews(req: any, res: any) {
  try {
    const reviews = await getReviewsService();

    return res.status(200).json(success<IYnReview[]>(reviews));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(failure(500, CODE_ERROR[500], "Ошибка сервера"));
  }
}
