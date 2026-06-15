import { cardsQueries } from "@/api";
import type { IYnCardsParams } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useCards({ page, limit, sort }: IYnCardsParams) {
  return useQuery({
    queryKey: ["cards", { page, limit, sort }],
    queryFn: () => cardsQueries.getCards({ page, limit, sort }),
    placeholderData: keepPreviousData,
  });
}
