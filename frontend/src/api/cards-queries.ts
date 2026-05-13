import { api } from "@/api";
import type { IYnCard, ICardsResponse } from "@/types";

export const cardsQueries = {
  getCard: async (id: string) => {
    const res = await api.get<IYnCard>(`/yes-no-cards/${id}`);
    return res.data;
  },

  getCards: async (page: number, limit: number) => {
    const res = await api.get<ICardsResponse>("/yes-no-cards", {
      params: { page, limit },
    });
    return res.data;
  },

  createCard: async (data: Omit<IYnCard, "id">) => {
    const res = await api.post<IYnCard>("/yes-no-cards", data);
    console.log(res.data);
    return res.data;
  },

  deleteCard: async (id: string) => {
    const res = await api.delete<{ message: string }>(`/yes-no-cards/${id}`);
    return res.data;
  },

  editCard: async (
    id: string,
    data: Omit<IYnCard, "id" | "popularity" | "difficulty" | "duration">,
  ) => {
    const res = await api.patch<IYnCard>(`/yes-no-cards/${id}`, data);
    return res.data;
  },
};
