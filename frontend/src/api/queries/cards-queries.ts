import { api } from "@/api";
import type { IYnCard, IYnCardsParams, IYnCardsResponse } from "@/types";

export const cardsQueries = {
  getCard: async (id: string) => {
    const res = await api.get<IYnCard>(`/yes-no-cards/${id}`);
    return res.data;
  },

  getCards: async ({
    page,
    limit,
    idSort = "asc",
    nameSort = null,
  }: IYnCardsParams) => {
    const res = await api.get<IYnCardsResponse>("/yes-no-cards", {
      params: { page, limit, idSort, nameSort },
    });
    return res.data;
  },

  createCard: async (data: FormData) => {
    const res = await api.post<IYnCard>("/yes-no-cards", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  deleteCard: async (id: string) => {
    const res = await api.delete<{ message: string }>(`/yes-no-cards/${id}`);
    return res.data;
  },

  editCard: async (id: string, data: FormData) => {
    const res = await api.patch<IYnCard>(`/yes-no-cards/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
};
