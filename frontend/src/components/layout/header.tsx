import { LuAngry, LuAnnoyed, LuSmile } from "react-icons/lu";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-header flex min-h-20 flex-col items-center gap-1 px-6 py-2 text-center sm:flex-row sm:justify-between sm:gap-0 lg:px-12">
      <Link
        to="/"
        className="cursor-pointer text-2xl font-black uppercase select-none sm:text-3xl"
      >
        Карточные игрушки
      </Link>
      <div className="flex gap-4">
        <Link className="text-2xl" to="#">
          <LuAngry strokeWidth={2.5} className="transition hover:text-black" />
        </Link>
        <Link className="text-2xl" to="/yes-no-game">
          <LuAnnoyed
            strokeWidth={2.5}
            className="transition hover:text-black"
          />
        </Link>
        <Link className="text-2xl" to="/yes-no-game/admin">
          <LuSmile strokeWidth={2.5} className="transition hover:text-black" />
        </Link>
      </div>
    </header>
  );
}
