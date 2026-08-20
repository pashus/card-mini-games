import type { IYnCategory } from "@/types";
import { api } from "@/api";

export const categoriesQueries = {
  getCategories: async () => {
    const res = await api.get<IYnCategory[]>("/categories");
    return res.data;
  },
  createCategories: async (data: Omit<IYnCategory, "id">[]) => {
    const res = await api.post<IYnCategory[]>("/categories", data);
    return res.data;
  },
};
