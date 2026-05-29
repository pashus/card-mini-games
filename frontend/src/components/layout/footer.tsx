export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground mx-auto flex h-8 w-full items-center justify-between px-6 md:text-lg lg:px-12">
      <span className="hidden select-none md:block">
        Мартынов Павел Максимович
      </span>
      <span className="select-none md:hidden">Мартынов П. М.</span>
      <span className="select-none">2026</span>
      <span className="select-none">
        <a target="_blank" href="https://t.me/pashusss">
          @pashusss
        </a>
      </span>
    </footer>
  );
}
