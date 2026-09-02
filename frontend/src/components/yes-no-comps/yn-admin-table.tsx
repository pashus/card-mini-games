import { BiLike, BiTimeFive } from "react-icons/bi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { ArrowUpDown, ChevronsDown, ChevronsUp } from "lucide-react";
import type { IYnCard } from "@/types";
import { LimitInput } from "../limit-input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { YnAdminDeleteCardModal } from "./yn-admin-delete-card-modal";
import { YnAdminEditCardModal } from "./yn-admin-edit-card-modal";
import { YnAdminImagePreviewModal } from "./yn-admin-image-preview-modal";

interface YnAdminTableProps {
  cards: IYnCard[];
  idSort: string | null;
  limit: number;
  nameSort: string | null;
  onIdSortChange: (sort: string) => void;
  onLimitChange: (limit: number) => void;
  onNameSortChange: (sort: string | null) => void;
}

export function YnAdminTable({
  cards,
  idSort,
  limit,
  nameSort,
  onIdSortChange,
  onLimitChange,
  onNameSortChange,
}: YnAdminTableProps) {
  return (
    <Table className="text-base">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead
            onClick={() => onIdSortChange(idSort === "asc" ? "desc" : "asc")}
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
            onClick={() =>
              onNameSortChange(nameSort === "asc" ? "desc" : "asc")
            }
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
          <TableHead className="hover:bg-muted/50 transition">Вопрос</TableHead>
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
        {cards.map((card) => (
          <TableRow
            key={card.id}
            style={{ backgroundColor: card.cardColor }}
            className="border-0"
          >
            <TableCell className="truncate font-medium">{card.id}</TableCell>
            <TableCell>
              <YnAdminImagePreviewModal image={card.image} title={card.title} />
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
          <TableCell colSpan={9} className="px-0">
            <div className="relative flex max-w-37.5 min-w-25 items-center gap-2 lg:ml-auto">
              <LimitInput limit={limit} onLimitChange={onLimitChange} />
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
