import { categoriesQueries } from "@/api";
import type { ApiError, IYnCategory } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export function useCreateCategories() {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError<ApiError>, Omit<IYnCategory, "id">[]>({
    mutationFn: (data: Omit<IYnCategory, "id">[]) =>
      categoriesQueries.createCategories(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      console.error("Ошибка при создании категорий", error);
    },
  });
}
