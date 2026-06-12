import prisma from "../prisma";

export async function mapCard(card: any, ...other: any) {
  const avg = await prisma.reviews.aggregate({
    where: { cardId: card.id },
    _avg: {
      duration: true,
      difficulty: true,
      liked: true,
    },
  });

  const nextCardIdObj = await prisma.yes_no_cards.findFirst({
    where: {
      id: {
        gt: card.id,
      },
    },
    select: {
      id: true,
    },
  });

  const avgDuration = Math.round(avg._avg.duration ?? 0);
  const avgDifficulty = Math.round(avg._avg.difficulty ?? 0);
  const avgLiked = Math.round(avg._avg.liked ?? 0);

  const nextCardId = nextCardIdObj?.id ?? null;

  return {
    ...card,
    nextYnCardId: nextCardId,
    categories: card.categories.map((item: any) => item.category),
    duration: avgDuration,
    difficulty: avgDifficulty,
    liked: avgLiked,
    ...other,
  };
}
