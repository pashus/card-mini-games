import { cardsQueries } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cardsQueries.deleteCard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    // onError: () => {},
  });
}
