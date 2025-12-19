import { cardsQueries } from "@/api";
import type { ICard } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditCard(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: Omit<ICard, "id" | "popularity" | "difficulty" | "duration">,
    ) => cardsQueries.editCard(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    // onError: () => {},
  });
}
