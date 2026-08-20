import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useCards } from "@/hooks";
import { useEffect } from "react";
import type { IYnCard } from "@/types";
import { BiLike } from "react-icons/bi";
import { BiTimeFive } from "react-icons/bi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { YnSkeletonGrid } from "./yn-skeleton";
import { YnAdminCreateCardModal } from "./yn-admin-create-card-modal";
import { YnAdminEditCardModal } from "./yn-admin-edit-card-modal";
import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { YnAdminDeleteCardModal } from "./yn-admin-delete-card-modal";
import { YnAdminLogoutModal } from "./yn-admin-logout-modal";
import { YnAdminCreateCategoriesModal } from "./yn-admin-create-categories-modal";

export function YnAdmin() {
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = 100;
  const page = Number(searchParams.get("page")) || 1;
  const sort = "desc";

  const { data: cards, isLoading, isError } = useCards({ page, limit, sort });

  const totalPages = cards?.pagination.totalPages || 1;
  const hasNext = cards?.pagination.hasNext || false;
  const hasPrev = cards?.pagination.hasPrev || false;
  const pages: number[] = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  function setPage(nextPage: number) {
    setSearchParams({ page: String(nextPage) });
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* <SearchInput
        onChange={handleSearch}
        placeholderText="Найдите нужную данетку"
        className="absolute top-6 right-6 max-w-xl"
      /> */}

      <section className="mx-auto max-w-7xl px-6 pt-15 text-center lg:px-0">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-center text-4xl font-bold tracking-wider">
            Данетки
          </h1>
        </div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-7xl md:mt-12">
        <div className="flex flex-col gap-0 px-6 md:flex-row md:gap-4 lg:justify-end lg:px-0">
          <YnAdminCreateCardModal className="mx-auto shrink lg:mx-0 lg:max-w-none" />
          <YnAdminCreateCategoriesModal className="mx-auto shrink lg:mx-0 lg:max-w-none" />
          <YnAdminLogoutModal className="mx-auto shrink lg:mx-0 lg:max-w-none" />
        </div>

        {isLoading && <YnSkeletonGrid />}

        {!isLoading && cards?.data.length === 0 && (
          <p className="px-6 text-center text-lg opacity-70 lg:text-start">
            Карточек нет
          </p>
        )}

        {isError && (
          <p className="px-6 text-center text-lg opacity-70 lg:text-start">
            Произошла ошибка при загрузке карточек
          </p>
        )}

        {!isLoading && (cards?.data.length ?? 0) > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-6 rounded-lg bg-[#fff7f09e] p-6 shadow sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cards?.data.map((card: IYnCard) => (
              <Card
                key={card.id}
                className="relative h-100 overflow-hidden py-0 transition hover:shadow-lg"
                style={{ backgroundColor: card.cardColor }}
              >
                <div className="absolute top-3 left-3 text-3xl">
                  <YnAdminEditCardModal card={card} />
                </div>
                <div className="absolute top-3 right-3 text-3xl">
                  <YnAdminDeleteCardModal cardId={card.id} />
                </div>
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-48 w-full object-cover"
                />
                <CardContent className="p-4 pt-0">
                  <CardTitle className="text-center text-xl">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {card.question}
                  </CardDescription>
                  <CardContent className="mt-2 flex justify-between px-0">
                    <div className="text-md flex items-center gap-1">
                      <BiLike />
                      {card.liked + "%"}
                    </div>
                    <div className="text-md flex items-center gap-1">
                      <BiTimeFive />
                      {card.duration + " мин."}
                    </div>
                    <div className="text-md flex items-center gap-1">
                      <HiArrowsUpDown />
                      {card.difficulty + "/10"}
                    </div>
                  </CardContent>
                  <div className="scrollbar-hide flex flex-row gap-2 overflow-x-auto whitespace-nowrap">
                    {card.categories.map((category) => (
                      <div
                        key={category.id}
                        className="mt-1 flex items-center rounded-xl px-2 py-1 text-center text-sm font-semibold shadow-sm select-none"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => page > 1 && setPage(page - 1)}
                    className={
                      hasPrev
                        ? "cursor-pointer"
                        : "pointer-events-none opacity-50"
                    }
                  />
                </PaginationItem>
                {pages.map((pageNum) => (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => setPage(pageNum)}
                      isActive={page === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => page < totalPages && setPage(page + 1)}
                    className={
                      hasNext
                        ? "cursor-pointer"
                        : "pointer-events-none opacity-50"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </section>
    </div>
  );
}
