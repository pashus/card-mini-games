import { api } from "@/api";
import type { IYnReview } from "@/types";

export const reviewQueries = {
  getReview: async (id: string) => {
    const res = await api.get(`/reviews/${id}`);
    return res.data;
  },

  getReviews: async () => {
    const res = await api.get(`/reviews`);
    return res.data;
  },

  createReview: async (data: Omit<IYnReview, "id">) => {
    const res = await api.post(`/reviews`, data);
    return res.data;
  },
};
