import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useCards } from "@/hooks";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { YnAdminCreateCardModal } from "./yn-admin-create-card-modal";
import { YnAdminCreateCategoriesModal } from "./yn-admin-create-categories-modal";
import { YnAdminLogoutModal } from "./yn-admin-logout-modal";
import { YnSkeletonTable } from "./yn-skeleton";
import { YnAdminTable } from "./yn-admin-table";

export function YnAdmin() {
  const [searchParams, setSearchParams] = useSearchParams();

  const tableRef = useRef<HTMLDivElement>(null);
  const limit = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page")) || 1;
  const nameSort = searchParams.get("nameSort") || null;
  const idSort = searchParams.get("idSort") || null;

  const {
    data: cards,
    isLoading,
    isError,
  } = useCards({ page, limit, idSort, nameSort });

  useEffect(() => {
    if (window.innerWidth < 768)
      tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [limit, page]);

  useEffect(() => {
    if (window.innerWidth >= 768)
      window.scrollTo({ behavior: "smooth", top: 0 });
  }, [page]);

  const totalPages = cards?.pagination.totalPages || 1;
  const hasNext = cards?.pagination.hasNext || false;
  const hasPrev = cards?.pagination.hasPrev || false;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const setPage = (nextPage: number) =>
    setSearchParams((prev) => {
      prev.set("page", String(nextPage));
      return prev;
    });

  const setNameSort = (nextNameSort: string | null) =>
    setSearchParams((prev) => {
      prev.set("nameSort", String(nextNameSort));
      prev.delete("idSort");
      return prev;
    });

  const setIdSort = (nextIdSort: string) =>
    setSearchParams((prev) => {
      prev.set("idSort", String(nextIdSort));
      prev.delete("nameSort");
      return prev;
    });

  const setLimit = (nextLimit: number) =>
    setSearchParams((prev) => {
      prev.set("limit", String(nextLimit));
      prev.set("page", "1");
      return prev;
    });

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

        {!isLoading && cards && cards.data.length > 0 && (
          <div
            ref={tableRef}
            className="bg-cards-list mt-4 rounded-lg px-6 py-4 shadow"
          >
            <YnAdminTable
              cards={cards.data}
              idSort={idSort}
              limit={limit}
              nameSort={nameSort}
              onIdSortChange={setIdSort}
              onLimitChange={setLimit}
              onNameSortChange={setNameSort}
            />
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
