import { adminQueries } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      adminQueries.login(data.email, data.password),
    onSuccess: () => {},
    onError: () => {},
  });
}
