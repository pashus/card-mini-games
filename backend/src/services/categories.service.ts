import prisma from "../prisma";

export async function createCategoriesService(
  categories: { color: string; name: string }[],
) {
  return await prisma.categories.createMany({
    data: categories,
  });
}

export async function getCategoriesService() {
  return await prisma.categories.findMany();
}
