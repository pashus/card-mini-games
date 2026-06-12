import { createReviewService, getReviewsService } from "../services";

export async function createReview(req: any, res: any) {
  try {
    const { cardId, liked, difficulty, duration } = req.body;
    const review = await createReviewService(
      cardId,
      liked,
      difficulty,
      duration,
    );

    return res.status(201).json(review);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}

export async function getReviews(req: any, res: any) {
  try {
    const reviews = await getReviewsService();

    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}
