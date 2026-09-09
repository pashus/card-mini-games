import { CODE_ERROR } from "../constants";
import { createCategoriesService, getCategoriesService } from "../services";
import type { IYnCategory } from "../types";
import { failure, success } from "../utils";

export async function createCategories(req: any, res: any) {
  try {
    const categories = req.body;
    const createdCategories = await createCategoriesService(categories);

    return res.status(201).json(success<IYnCategory[]>(createdCategories));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(failure(500, CODE_ERROR[500], "Ошибка сервера"));
  }
}

export async function getCategories(req: any, res: any) {
  try {
    const categories = await getCategoriesService();

    return res.status(200).json(success<IYnCategory[]>(categories));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(failure(500, CODE_ERROR[500], "Ошибка сервера"));
  }
}
