import { cardsQueries } from "@/api";
import type { IYnCard } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<IYnCard, "id">) => cardsQueries.createCard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    // onError: () => {},
  });
}
