import { createCategoriesService, getCategoriesService } from "../services";

export async function createCategories(req: any, res: any) {
  try {
    const categories = req.body;
    console.log(categories);
    await createCategoriesService(categories);

    return res.status(201).json({ message: "Категории созданы" });
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
