import { api } from "@/api";
import type { ICard, ICardsResponse } from "@/types";

export const cardsQueries = {
  getCard: async (id: string) => {
    const res = await api.get<ICard>(`/yes-no-cards/${id}`);
    return res.data;
  },

  getCards: async (page: number, limit: number) => {
    const res = await api.get<ICardsResponse>("/yes-no-cards", {
      params: { page, limit },
    });
    return res.data;
  },

  createCard: async (data: Omit<ICard, "id">) => {
    const res = await api.post<ICard>("/yes-no-cards", data);
    console.log(res.data);
    return res.data;
  },

  deleteCard: async (id: string) => {
    const res = await api.delete<{ message: string }>(`/yes-no-cards/${id}`);
    return res.data;
  },

  editCard: async (
    id: string,
    data: Omit<ICard, "id" | "popularity" | "difficulty" | "duration">,
  ) => {
    const res = await api.patch<ICard>(`/yes-no-cards/${id}`, data);
    return res.data;
  },
};
