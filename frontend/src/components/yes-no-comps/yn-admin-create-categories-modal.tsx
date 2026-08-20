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
import { cn } from "@/lib/utils";
import { YnAdminCreateCategoriesForm } from "./yn-admin-create-categories-form";
import { Tag } from "lucide-react";

interface YnAdminCreateCategoriesModalProps {
  className?: string;
}

export function YnAdminCreateCategoriesModal({
  className,
}: YnAdminCreateCategoriesModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        size="lg"
        className={cn(
          "mb-4 w-full cursor-pointer text-lg lg:mb-0 lg:w-auto",
          className,
        )}
      >
        <Tag />
        Создать категорию
      </Button>
      <DialogContent className="max-h-[90svh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Создание категории</DialogTitle>
          <YnAdminCreateCategoriesForm
            onClose={() => setOpen(false)}
            onPendingChange={setIsPending}
          />
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            form="yn-create-categories-form"
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
