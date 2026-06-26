import { adminQueries } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useLogout() {
  return useMutation({
    mutationFn: () => adminQueries.logout(),
    onSuccess: () => {},
    onError: () => {},
  });
}
