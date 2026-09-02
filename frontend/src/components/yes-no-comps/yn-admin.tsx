import { useCards } from "@/hooks";
import type { IYnCard } from "@/types";
import { BiLike, BiTimeFive } from "react-icons/bi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { YnAdminCreateCardModal } from "./yn-admin-create-card-modal";
import { YnAdminEditCardModal } from "./yn-admin-edit-card-modal";
import { YnAdminDeleteCardModal } from "./yn-admin-delete-card-modal";
import { YnAdminLogoutModal } from "./yn-admin-logout-modal";
import { YnAdminCreateCategoriesModal } from "./yn-admin-create-categories-modal";
import { YnAdminImagePreviewModal } from "./yn-admin-image-preview-modal";
import { YnSkeletonTable } from "./yn-skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowUpDown, ChevronsDown, ChevronsUp, Plus } from "lucide-react";
import { useEffect, useRef } from "react";

export function YnAdmin() {
  const [searchParams, setSearchParams] = useSearchParams();

  const limitInputRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const limit = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page")) || 1;
  const nameSort = searchParams.get("nameSort") || null;
  const idSort = searchParams.get("idSort") || null;

  const {
    data: cards,
    isLoading,
    isError,
  } = useCards({
    page,
    limit,
    idSort,
    nameSort,
  });

  useEffect(() => {
    if (window.innerWidth < 768) {
      tableRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [limit, page]);

  const totalPages = cards?.pagination.totalPages || 1;
  const hasNext = cards?.pagination.hasNext || false;
  const hasPrev = cards?.pagination.hasPrev || false;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  function setPage(nextPage: number) {
    setSearchParams((prev) => {
      prev.set("page", String(nextPage));
      return prev;
    });
  }

  function setNameSort(nameSort: string | null) {
    setSearchParams((prev) => {
      prev.set("nameSort", String(nameSort));
      prev.delete("idSort");

      return prev;
    });
  }

  function setIdSort(idSort: string) {
    setSearchParams((prev) => {
      prev.set("idSort", String(idSort));
      prev.delete("nameSort");

      return prev;
    });
  }

  function setLimit(limit: number) {
    setSearchParams((prev) => {
      prev.set("limit", String(limit));
      prev.set("page", "1");
      return prev;
    });
  }

  function handleLimitChange() {
    const inputValue = limitInputRef.current?.value;
    setLimit(Number(inputValue));
  }

  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto max-w-7xl px-6 pt-15 text-center lg:px-0">
        <h1 className="text-4xl font-bold tracking-wider">Данетки</h1>
      </section>

      <section className="mx-auto mt-8 w-full max-w-7xl md:mt-12">
        <div className="flex flex-col gap-0 px-6 md:flex-row md:gap-4 lg:justify-end lg:px-0">
          <YnAdminCreateCardModal className="mx-auto shrink lg:mx-0 lg:max-w-none" />
          <YnAdminCreateCategoriesModal className="mx-auto shrink lg:mx-0 lg:max-w-none" />
          <YnAdminLogoutModal className="mx-auto shrink lg:mx-0 lg:max-w-none" />
        </div>

        {isLoading && <YnSkeletonTable />}

        {!isLoading && cards?.data.length === 0 && (
          <p className="mt-4 px-6 text-center text-lg opacity-70 lg:text-start">
            Карточек нет
          </p>
        )}

        {isError && (
          <p className="mt-4 px-6 text-center text-lg opacity-70 lg:text-start">
            Произошла ошибка при загрузке карточек
          </p>
        )}

        {!isLoading && (cards?.data.length ?? 0) > 0 && (
          <div
            ref={tableRef}
            className="bg-cards-list mt-4 rounded-lg p-4 shadow sm:p-6"
          >
            <Table className="text-base">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead
                    onClick={() => {
                      setIdSort(idSort === "asc" ? "desc" : "asc");
                    }}
                    className="hover:bg-muted/50 flex cursor-pointer items-center gap-1 transition"
                  >
                    ID
                    {!idSort ? (
                      <ArrowUpDown />
                    ) : idSort === "asc" ? (
                      <ChevronsUp />
                    ) : (
                      <ChevronsDown />
                    )}
                  </TableHead>
                  <TableHead className="hover:bg-muted/50 transition">
                    Изображение
                  </TableHead>
                  <TableHead
                    onClick={() => {
                      setNameSort(nameSort === "asc" ? "desc" : "asc");
                    }}
                    className="hover:bg-muted/50 flex cursor-pointer items-center gap-1 transition"
                  >
                    Название
                    {!nameSort ? (
                      <ArrowUpDown />
                    ) : nameSort === "asc" ? (
                      <ChevronsUp />
                    ) : (
                      <ChevronsDown />
                    )}
                  </TableHead>
                  <TableHead className="hover:bg-muted/50 transition">
                    Вопрос
                  </TableHead>
                  <TableHead className="hover:bg-muted/50 transition">
                    Категории
                  </TableHead>
                  <TableHead className="hover:bg-muted/50 transition">
                    <span className="flex items-center gap-1">
                      <BiLike strokeWidth={0.5} />
                      Оценка
                    </span>
                  </TableHead>
                  <TableHead className="hover:bg-muted/50 transition">
                    <span className="flex items-center gap-1">
                      <BiTimeFive strokeWidth={0.5} />
                      Время
                    </span>
                  </TableHead>
                  <TableHead className="hover:bg-muted/50 transition">
                    <span className="flex items-center gap-1">
                      <HiArrowsUpDown strokeWidth={0.5} />
                      Сложность
                    </span>
                  </TableHead>
                  <TableHead className="hover:bg-muted/50 text-right transition">
                    Действия
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {cards?.data.map((card: IYnCard) => (
                  <TableRow
                    key={card.id}
                    style={{ backgroundColor: card.cardColor }}
                    className="border-0"
                  >
                    <TableCell className="truncate font-medium">
                      {card.id}
                    </TableCell>
                    <TableCell>
                      <YnAdminImagePreviewModal
                        image={card.image}
                        title={card.title}
                      />
                    </TableCell>
                    <TableCell className="max-w-48 truncate font-medium">
                      {card.title}
                    </TableCell>
                    <TableCell className="max-w-sm whitespace-normal">
                      <p className="line-clamp-2">{card.question}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex max-w-56 flex-wrap gap-1">
                        {card.categories.map((category) => (
                          <span
                            key={category.id}
                            className="rounded-full px-2 py-1 text-xs font-semibold"
                            style={{ backgroundColor: category.color }}
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{card.liked}%</TableCell>
                    <TableCell>{card.duration} мин.</TableCell>
                    <TableCell>{card.difficulty}/10</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2 text-3xl">
                        <YnAdminEditCardModal card={card} />
                        <YnAdminDeleteCardModal cardId={card.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow className="bg-cards-list">
                  <TableCell colSpan={9} className="pl-0">
                    <div className="relative max-w-[150px] min-w-[100px] lg:ml-auto">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleLimitChange();
                        }}
                      >
                        <Input
                          ref={limitInputRef}
                          placeholder="Лимит"
                          className="pr-10"
                          defaultValue={limit}
                          type="number"
                        />

                        <Button
                          size="icon"
                          type="submit"
                          variant="ghost"
                          className="absolute top-1/2 right-1 -translate-y-1/2 hover:bg-transparent"
                        >
                          <Plus />
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
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
                        ? "hover:bg-muted cursor-pointer"
                        : "pointer-events-none opacity-50"
                    }
                  />
                </PaginationItem>
                {pages.map((pageNum) => (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => setPage(pageNum)}
                      isActive={page === pageNum}
                      className="hover:bg-muted border-foreground/40 cursor-pointer"
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
                        ? "hover:bg-muted cursor-pointer"
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
