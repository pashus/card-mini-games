import { cardsQueries } from "@/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useCards(page: number, limit: number) {
  return useQuery({
    queryKey: ["cards", page],
    queryFn: () => cardsQueries.getCards(page, limit),
    placeholderData: keepPreviousData,
  });
}
