import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { EditButton } from "../edit-button";
import { YnAdminEditCardForm } from "./yn-admin-edit-card-form";
import type { IYnCard } from "@/types";

interface YnAdminEditCardModalProps {
  card: IYnCard;
}

export function YnAdminEditCardModal({ card }: YnAdminEditCardModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <EditButton
        onClick={() => {
          setOpen(true);
        }}
      />
      <DialogContent
        className="max-h-[90svh] overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center">
            Редактирование данетки
          </DialogTitle>
          <YnAdminEditCardForm
            card={card}
            onClose={() => setOpen(false)}
            onPendingChange={setIsPending}
          />
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            form="yn-edit-form"
            size="lg"
            className="cursor-pointer"
            disabled={isPending}
          >
            {isPending ? "Сохранение..." : "Сохранить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
