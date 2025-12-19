import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { GiHelp } from "react-icons/gi";

export function YnRulesModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const wasOpened = localStorage.getItem("wasYnRulesModalOpened");
    if (!wasOpened) {
      const timer = setTimeout(() => {
        setOpen(true);
        localStorage.setItem("wasYnRulesModalOpened", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <GiHelp className="relative top-0.5 cursor-pointer text-3xl duration-200 hover:text-[#665a5a]" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Правила игры</DialogTitle>
          <DialogDescription className="text-md list-none text-center">
            <li>Ведущий загадывает ситуацию</li>
            <li>Игроки задают вопросы</li>
            <li>Ответы только «да», «нет» или «не имеет значения»</li>
            <li>Цель - полностью восстановить историю</li>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="cursor-pointer" onClick={() => setOpen(false)}>
            Понятно!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
