import { adminQueries } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useRefresh() {
  return useMutation({
    mutationFn: () => adminQueries.refresh(),
  });
}
