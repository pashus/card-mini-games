import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { YnAdminCreateCardForm } from "./yn-admin-create-card-form";

export function YnAdminCreateCardModal() {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        size="lg"
        className="mb-4 w-full cursor-pointer text-lg lg:mb-0 lg:w-auto"
      >
        Добавить данетку
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Создание данетки</DialogTitle>
          <YnAdminCreateCardForm
            onClose={() => setOpen(false)}
            onPendingChange={setIsPending}
          />
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            form="yn-create-form"
            size="lg"
            className="cursor-pointer"
            disabled={isPending}
          >
            {isPending ? "Создание..." : "Создать"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
