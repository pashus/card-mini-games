import { reviewQueries } from "@/api";
import type { IReview } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<IReview, "id">) => reviewQueries.createReview(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["cards", String(data.cardId)],
      });
    },
    // onError: () => {
    //   console.log("Ошибка");
    // },
  });
}
