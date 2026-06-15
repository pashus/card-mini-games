import { cardsQueries } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useCard(id: string) {
  return useQuery({
    queryKey: ["cards", id],
    queryFn: () => cardsQueries.getCard(id),
  });
}
