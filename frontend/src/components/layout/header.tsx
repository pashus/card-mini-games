import { LuAngry, LuAnnoyed, LuFrown, LuSmile } from "react-icons/lu";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header bg-header flex min-h-20 px-6 py-2">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-center gap-1 text-center sm:flex-row sm:justify-between sm:gap-0 lg:px-12">
        <Link
          to="/"
          className="cursor-pointer text-2xl font-black uppercase select-none sm:text-3xl"
        >
          Карточные игрушки
        </Link>
        <div className="flex gap-4">
          <Link className="text-2xl" to="/yes-no-game">
            <LuSmile
              strokeWidth={2.5}
              className="transition hover:text-black"
            />
          </Link>
          <Link className="text-2xl" to="/admin/login">
            <LuAnnoyed
              strokeWidth={2.5}
              className="transition hover:text-black"
            />
          </Link>
          <Link className="text-2xl" to="/admin/yes-no-game">
            <LuAngry
              strokeWidth={2.5}
              className="transition hover:text-black"
            />
          </Link>
          <Link className="text-2xl" to="/rip">
            <LuFrown
              strokeWidth={2.5}
              className="transition hover:text-black"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
