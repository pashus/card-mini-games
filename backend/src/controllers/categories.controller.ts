import { createCategoryService, getCategoriesService } from "../services";

export async function createCategory(req: any, res: any) {
  try {
    const { name, color } = req.body;
    const category = await createCategoryService(name, color);

    return res.status(201).json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}

export async function getCategories(req: any, res: any) {
  try {
    const categories = await getCategoriesService();

    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}
