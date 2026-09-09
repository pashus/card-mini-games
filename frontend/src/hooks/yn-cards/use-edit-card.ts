import { cardsQueries } from "@/api";
import type { ApiError, IYnCardResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export function useEditCard(id: string) {
  const queryClient = useQueryClient();

  return useMutation<IYnCardResponse, AxiosError<ApiError>, FormData>({
    mutationFn: (data: FormData) => cardsQueries.editCard(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: (error) => {
      console.error("Ошибка при редактировании карточки", error);
    },
  });
}
