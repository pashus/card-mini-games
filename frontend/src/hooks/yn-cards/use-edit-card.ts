import { cardsQueries } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditCard(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => cardsQueries.editCard(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: () => {
      console.log("Ошибка при редактировании карточки");
    },
  });
}
