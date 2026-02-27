import { cardsQueries } from "@/api";
import type { ICard } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<ICard, "id">) => cardsQueries.createCard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    // onError: () => {},
  });
}
