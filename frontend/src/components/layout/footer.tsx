import { Link } from "react-router-dom";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer text-footer-foreground flex min-h-10 px-6">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-center justify-between gap-4 py-4 text-center text-lg sm:flex-row sm:gap-0 sm:py-0 lg:px-12">
        <span>Мартынов Павел Максимович</span>
        <span className="block sm:hidden">
          <Link to="/rip">Страница памяти</Link>
        </span>
        <span className="hidden select-none sm:block">{year}</span>
        <span className="select-none">
          <a target="_blank" href="https://t.me/pashusss">
            @pashusss
          </a>
        </span>
        <span className="block select-none sm:hidden">{year}</span>
      </div>
    </footer>
  );
}
