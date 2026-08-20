import { categoriesQueries } from "@/api";
import type { IYnCategory } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<IYnCategory, "id">[]) =>
      categoriesQueries.createCategories(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: () => {
      console.log("Ошибка при создании категорий");
    },
  });
}
