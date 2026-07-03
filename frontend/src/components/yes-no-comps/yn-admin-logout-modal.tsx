import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useLogout } from "@/hooks";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface YnAdminLogoutModalProps {
  className?: string;
}

export function YnAdminLogoutModal({ className }: YnAdminLogoutModalProps) {
  const [open, setOpen] = useState(false);
  const { mutate } = useLogout();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button
        variant="destructive"
        className={cn("w-full cursor-pointer text-lg lg:w-auto", className)}
        size="lg"
        type="button"
        onClick={() => {
          setOpen(true);
        }}
      >
        Выйти
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Вы уверены?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="ghost" className="hover:bg-muted">
            Отмена
          </AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={() => mutate()}>
            Выйти
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
