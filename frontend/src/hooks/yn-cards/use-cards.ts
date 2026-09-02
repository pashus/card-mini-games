import { cardsQueries } from "@/api";
import type { IYnCardsParams } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useCards({ page, limit, idSort, nameSort }: IYnCardsParams) {
  return useQuery({
    queryKey: ["cards", { page, limit, idSort, nameSort }],
    queryFn: () => cardsQueries.getCards({ page, limit, idSort, nameSort }),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
}
