import { cardsQueries } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => cardsQueries.createCard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    // onError: () => {},
  });
}
