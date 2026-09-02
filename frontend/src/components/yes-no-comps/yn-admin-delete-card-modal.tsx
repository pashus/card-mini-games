import { useState } from "react";
import { useDeleteCard } from "@/hooks";
import { DeleteButton } from "../delete-button";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface YnAdminDeleteCardModalProps {
  cardId: string;
}

export function YnAdminDeleteCardModal({
  cardId,
}: YnAdminDeleteCardModalProps) {
  const [open, setOpen] = useState(false);
  const { mutate } = useDeleteCard();

  function handleDelete() {
    setOpen(false);
    mutate(cardId);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DeleteButton onClick={() => setOpen(true)} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-start">Вы уверены?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="hover:bg-muted">
              Отмена
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
