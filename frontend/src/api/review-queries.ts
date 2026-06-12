import { api } from "@/api";
import type { IYnReview, IYnReviewResponse } from "@/types";

export const reviewQueries = {
  getReview: async (id: string) => {
    const res = await api.get<IYnReviewResponse>(`/reviews/${id}`);
    return res.data;
  },

  getReviews: async () => {
    const res = await api.get<IYnReviewResponse[]>(`/reviews`);
    return res.data;
  },

  createReview: async (data: Omit<IYnReview, "id" | "createdAt">) => {
    const res = await api.post<IYnReviewResponse>(`/reviews`, data);
    return res.data;
  },
};
