import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("bg-footer text-footer-foreground px-6", className)}>
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-5 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-12">
        <div className="flex flex-col gap-1 text-sm">
          <span className="text-base font-medium">
            Мартынов Павел Максимович
          </span>
          <span className="text-footer-foreground/75">© {year}</span>
        </div>

        <nav className="flex flex-col items-center gap-2 text-sm sm:items-end">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:justify-end">
            <Link className="transition hover:opacity-75" to="/rip">
              Страница памяти
            </Link>
            <Link className="transition hover:opacity-75" to="/admin/login">
              Админка
            </Link>
          </div>
          <a
            className="transition hover:opacity-75"
            target="_blank"
            rel="noreferrer"
            href="https://t.me/pashusss"
          >
            @pashusss
          </a>
        </nav>
      </div>
    </footer>
  );
}
