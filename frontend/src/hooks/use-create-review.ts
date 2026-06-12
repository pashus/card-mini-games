import { reviewQueries } from "@/api";
import type { IYnReview, IYnReviewResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<IYnReview, "id" | "createdAt">) =>
      reviewQueries.createReview(data),
    onSuccess: (data: IYnReviewResponse) => {
      queryClient.invalidateQueries({
        queryKey: ["cards", String(data.cardId)],
      });
    },
    onError: () => {
      console.log("Ошибка при создании отзыва");
    },
  });
}
