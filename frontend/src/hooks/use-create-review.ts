import { reviewQueries } from "@/api";
import type { IYnReview } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<IYnReview, "id">) =>
      reviewQueries.createReview(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["cards", String(data.cardId)],
      });
    },
    onError: () => {
      console.log("Ошибка");
    },
  });
}
