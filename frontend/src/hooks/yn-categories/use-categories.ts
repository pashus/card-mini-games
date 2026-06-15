import { categoriesQueries } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesQueries.getCategories(),
    staleTime: Infinity,
  });
}
