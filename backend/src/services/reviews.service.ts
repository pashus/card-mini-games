import prisma from "../prisma";

export async function createReviewService(
  cardId: number,
  liked: number,
  difficulty: number,
  duration: number,
) {
  return await prisma.reviews.create({
    data: {
      cardId: cardId,
      liked: liked,
      difficulty: difficulty,
      duration: duration,
    },
  });
}

export async function getReviewsService() {
  return await prisma.reviews.findMany();
}
