import { useState } from "react";
import { useDeleteCard } from "@/hooks/use-delete-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { DeleteButton } from "../delete-button";

export function YnAdminDeleteCardModal({ cardId }: { cardId: string }) {
  const [open, setOpen] = useState(false);
  const { mutate } = useDeleteCard();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <DeleteButton
        onClick={() => {
          setOpen(true);
        }}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Вы уверены?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-muted border-0">
            Отмена
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => mutate(cardId)}
          >
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
