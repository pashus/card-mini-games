import { adminQueries } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => adminQueries.me(),
    retry: false, // чтобы убрать стандартные 3 попытки запроса при ошибке
    staleTime: 5 * 60 * 1000,
  });
}
