import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useCards } from "@/hooks/use-cards";
import { useEffect } from "react";
import type { IYnCard } from "@/types";
import { Link, useSearchParams } from "react-router-dom";
import { HiOutlineLightBulb } from "react-icons/hi";
import { BiLike } from "react-icons/bi";
import { BiTimeFive } from "react-icons/bi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { YnSkeletonGrid } from "./yn-skeleton";
import { YnRulesModal } from "./yn-rules-modal";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { TextArrow } from "../text-arrow";

export function Yn() {
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = 12;
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
      <section className="mx-auto flex h-8 w-full max-w-[1550px] items-center justify-start px-6 lg:px-0">
        <TextArrow to="/" text="На главную" where="left" />
      </section>

      {/* <SearchInput
          onChange={handleSearch}
          placeholderText="Найдите нужную данетку"
          className="absolute top-6 right-6 max-w-xl"
        /> */}

      <section className="mx-auto max-w-7xl px-6 pt-7 text-center lg:px-0">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-center text-4xl font-bold tracking-wider">
            Данетки
          </h1>
          <YnRulesModal />
        </div>
        <p className="mt-4 text-lg opacity-80">
          Задавай вопросы, получай только «ДА» или «НЕТ» и попробуй разгадать
          ситуацию.
        </p>
      </section>

      <div className="flex flex-1 flex-col justify-between">
        <section className="mx-auto mt-16 w-full max-w-7xl">
          <h2 className="mb-6 px-6 text-2xl font-semibold tracking-wider lg:px-0">
            Выберите данетку
          </h2>

          {isLoading && <YnSkeletonGrid />}

          {!isLoading && cards?.data.length === 0 && (
            <p className="text-start text-lg opacity-70">Карточек нет</p>
          )}

          {isError && (
            <p className="text-start text-lg opacity-70">
              Произошла ошибка при загрузке карточек
            </p>
          )}

          {!isLoading && (cards?.data.length ?? 0) > 0 && (
            <div className="grid grid-cols-1 gap-6 rounded-lg bg-[#fff7f09e] p-6 shadow sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cards?.data.map((card: IYnCard) => (
                <Link key={card.id} to={`/yes-no-game/card/${card.id}`}>
                  <Card
                    className="h-100 overflow-hidden py-0 transition hover:-translate-y-1 hover:shadow-lg"
                    style={{ backgroundColor: card.cardColor }}
                  >
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
                          <BiLike strokeWidth={0.5} />
                          {card.liked + "%"}
                        </div>
                        <div className="text-md flex items-center gap-1">
                          <BiTimeFive strokeWidth={0.5} />
                          {card.duration + " мин."}
                        </div>
                        <div className="text-md flex items-center gap-1">
                          <HiArrowsUpDown strokeWidth={0.5} />
                          {card.difficulty + "/10"}
                        </div>
                      </CardContent>
                      <div className="scrollbar-hide flex flex-row gap-2 overflow-x-auto whitespace-nowrap">
                        {card.categories.map((category) => (
                          <div
                            key={category.id}
                            className="mt-1 flex items-center rounded-xl px-2 py-1 text-center text-sm font-medium shadow-sm select-none"
                            style={{ backgroundColor: category.color }}
                          >
                            {category.name}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
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
                          ? "hover:bg-hover-pagination-button-bg cursor-pointer"
                          : "pointer-events-none opacity-50"
                      }
                    />
                  </PaginationItem>
                  {pages.map((pageNum) => (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => setPage(pageNum)}
                        isActive={page === pageNum}
                        className="hover:bg-hover-pagination-button-bg border-foreground/40 cursor-pointer"
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
                          ? "hover:bg-hover-pagination-button-bg cursor-pointer"
                          : "pointer-events-none opacity-50"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </section>

        <section className="mx-auto mt-20 flex max-w-7xl flex-col items-center px-6 text-lg opacity-70 lg:px-0">
          <HiOutlineLightBulb className="text-3xl" />
          <span className="text-center">
            Совет: начинайте с общих вопросов и постепенно сужайте круг - так вы
            быстрее придёте к разгадке
          </span>
        </section>
      </div>
    </div>
  );
}
