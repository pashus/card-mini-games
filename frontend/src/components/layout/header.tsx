import { LuAngry, LuAnnoyed, LuSmile } from "react-icons/lu";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-header flex min-h-20 flex-col items-center gap-1 px-12 py-2 text-center sm:flex-row sm:justify-between sm:gap-0">
      <Link to="/" className="cursor-pointer text-3xl font-bold select-none">
        КАРТОЧНЫЕ ИГРУШКИ
      </Link>
      <div className="flex gap-4">
        <a className="text-2xl" href="#">
          <LuAngry />
        </a>
        <a className="text-2xl" href="#">
          <LuAnnoyed />
        </a>
        <a className="text-2xl" href="#">
          <LuSmile />
        </a>
      </div>
    </header>
  );
}
