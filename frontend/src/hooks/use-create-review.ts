import { reviewQueries } from "@/api";
import type { IReview } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useCreateReview() {
  return useMutation({
    mutationFn: (data: Omit<IReview, "id">) => reviewQueries.createReview(data),
    // onSuccess: () => {
    //   console.log("Отправилось");
    // },
    // onError: () => {
    //   console.log("Ошибка");
    // },
  });
}
