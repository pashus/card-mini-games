import prisma from "../prisma";

export async function createCategoryService(name: string, color: string) {
  return await prisma.categories.create({
    data: {
      name: name,
      color: color,
    },
  });
}

export async function getCategoriesService() {
  return await prisma.categories.findMany();
}
