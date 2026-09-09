import { cardsQueries } from "@/api";
import type { ApiError, IYnCardResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export function useDeleteCard() {
  const queryClient = useQueryClient();

  return useMutation<IYnCardResponse, AxiosError<ApiError>, string>({
    mutationFn: (id: string) => cardsQueries.deleteCard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: (error) => {
      console.error("Ошибка при удалении карточки", error);
    },
  });
}
