import { LuArrowBigLeft } from "react-icons/lu";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useCards } from "@/hooks/use-cards";
import { useEffect, useState } from "react";
import type { ICard } from "@/types";
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

export function YnMain() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = 8;
  function setPage(nextPage: number) {
    setSearchParams({ page: String(nextPage) });
  }

  const { data: cards, isLoading } = useCards(page, limit);

  const totalPages = cards?.pagination.totalPages || 1;
  const hasNext = cards?.pagination.hasNext || false;
  const hasPrev = cards?.pagination.hasPrev || false;
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-container-background relative container mx-auto flex min-h-[calc(100vh-64px)] flex-col justify-between px-4 py-12 md:px-12">
      <div>
        <Link
          to="/"
          className="absolute top-6 left-6 flex items-start gap-1 text-3xl font-bold transition hover:text-black"
        >
          <LuArrowBigLeft />
          <span className="text-xl sm:inline">Главная</span>
        </Link>

        {/* <SearchInput
          onChange={handleSearch}
          placeholderText="Найдите нужную данетку"
          className="absolute top-6 right-6 max-w-xl"
        /> */}

        <section className="pt-7 text-center">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-center text-4xl font-bold">Данетки</h1>
            <YnRulesModal />
          </div>
          <p className="mt-4 text-lg opacity-80">
            Задавай вопросы, получай только «ДА» или «НЕТ» и попробуй разгадать
            ситуацию.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-semibold">Выберите данетку</h2>

          {isLoading && <YnSkeletonGrid />}

          {!isLoading && !cards?.data && (
            <p className="text-start text-lg opacity-70">Карточек нет</p>
          )}

          {!isLoading && cards?.data && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cards.data.map((card: ICard) => (
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
                          <BiLike />
                          {card.popularity + "%"}
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
                      <div className="flex flex-row gap-2">
                        {card.categories.map((category) => (
                          <div
                            key={category.name}
                            className="mt-1 flex items-center rounded-xl px-2 py-1 text-center text-sm font-semibold shadow-sm select-none"
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

      <section className="mt-20 flex flex-col items-center text-lg opacity-70">
        <HiOutlineLightBulb className="text-3xl" />
        <span className="text-center">
          Совет: начинайте с общих вопросов и постепенно сужайте круг - так вы
          быстрее придёте к разгадке
        </span>
      </section>
    </main>
  );
}
