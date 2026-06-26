import prisma from "../prisma";
import { mapCard } from "../utils";

export async function createCardService(
  title: string,
  cardColor: string,
  question: string,
  answer: string,
  image: string,
  categories: number[],
) {
  const card = await prisma.yes_no_cards.create({
    data: {
      title,
      cardColor,
      question,
      answer,
      image,
      categories: {
        create: categories.map((categoryId: number) => ({
          category: {
            connect: {
              id: categoryId,
            },
          },
        })),
      },
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  // возможно мапы нужно делать в контроллере, а не в сервисе
  return mapCard(card);
}

export async function getCardService(id: number) {
  const card = await prisma.yes_no_cards.findUnique({
    where: { id },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  // иначе выводит просто {categories: []}, даже если карточки с таким id нет
  if (!card) {
    return null;
  }
  return mapCard(card);
}

export async function getCardsService(
  page: number,
  limit: number,
  sort: "asc" | "desc",
) {
  const cards = await prisma.yes_no_cards.findMany({
    skip: (page - 1) * limit,
    take: limit,
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
    orderBy: {
      id: sort,
    },
  });

  const total = await prisma.yes_no_cards.count();
  const mappedCards = await Promise.all(cards.map((card) => mapCard(card)));

  return {
    cards: mappedCards,
    total,
  };
}

export async function updateCardService(
  id: number,
  data: {
    title: string;
    cardColor: string;
    question: string;
    answer: string;
    image: string;
    categories: number[];
  },
) {
  const card = await prisma.yes_no_cards.update({
    where: { id },
    data: {
      title: data.title,
      cardColor: data.cardColor,
      question: data.question,
      answer: data.answer,
      image: data.image,
      categories: {
        deleteMany: {},
        create: data.categories.map((categoryId) => ({
          category: {
            connect: { id: categoryId },
          },
        })),
      },
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  return mapCard(card);
}

export async function deleteCardService(id: number) {
  return await prisma.yes_no_cards.delete({
    where: { id },
  });
}
