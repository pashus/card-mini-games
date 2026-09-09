import type { IYnCategoriesResponse, IYnCategory } from "@/types";
import { api } from "@/api";

export const categoriesQueries = {
  getCategories: async () => {
    const res = await api.get<IYnCategoriesResponse>("/categories");
    return res.data;
  },
  createCategories: async (data: Omit<IYnCategory, "id">[]) => {
    const res = await api.post<IYnCategoriesResponse>("/categories", data);
    return res.data;
  },
};
