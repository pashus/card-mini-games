import { reviewQueries } from "@/api";
import type { ApiError, IYnReview, IYnReviewResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation<
    IYnReviewResponse,
    AxiosError<ApiError>,
    Omit<IYnReview, "id" | "createdAt">
  >({
    mutationFn: (data: Omit<IYnReview, "id" | "createdAt">) =>
      reviewQueries.createReview(data),
    onSuccess: (data: IYnReviewResponse) => {
      queryClient.invalidateQueries({
        queryKey: ["cards", String(data.cardId)],
      });
    },
    onError: (error) => {
      console.log("Ошибка при создании отзыва", error);
    },
  });
}
