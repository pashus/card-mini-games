import { adminQueries } from "@/api";
import type { ApiError } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError<ApiError>,
    { email: string; password: string }
  >({
    mutationFn: (data: { email: string; password: string }) =>
      adminQueries.login(data.email, data.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      console.error("Ошибка при входе", error);
    },
  });
}
