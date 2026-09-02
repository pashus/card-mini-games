import { useState } from "react";
import { useLogout } from "@/hooks";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface YnAdminLogoutModalProps {
  className?: string;
}

export function YnAdminLogoutModal({ className }: YnAdminLogoutModalProps) {
  const [open, setOpen] = useState(false);
  const { mutate } = useLogout();

  function handleLogout() {
    setOpen(false);
    mutate();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="destructive"
        className={cn("w-full cursor-pointer text-lg lg:w-auto", className)}
        size="lg"
        type="button"
        onClick={() => setOpen(true)}
      >
        Выйти
      </Button>
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
          <Button variant="destructive" onClick={handleLogout}>
            Выйти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
