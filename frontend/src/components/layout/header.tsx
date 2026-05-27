import { LuAngry, LuAnnoyed, LuSmile } from "react-icons/lu";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-header flex min-h-20 flex-col items-center gap-1 px-4 py-2 text-center sm:flex-row sm:justify-between sm:gap-0 md:px-12">
      <Link
        to="/"
        className="cursor-pointer text-2xl font-extrabold uppercase select-none sm:text-3xl"
      >
        Карточные игрушки
      </Link>
      <div className="flex gap-4">
        <Link className="text-2xl" to="#">
          <LuAngry className="hover:text-emodzi-hover transition" />
        </Link>
        <Link className="text-2xl" to="/yes-no-game">
          <LuAnnoyed className="hover:text-emodzi-hover transition" />
        </Link>
        <Link className="text-2xl" to="/yes-no-game/admin">
          <LuSmile className="hover:text-emodzi-hover transition" />
        </Link>
      </div>
    </header>
  );
}
