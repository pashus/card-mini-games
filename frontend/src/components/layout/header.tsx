/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMe } from "@/hooks";
import { cn } from "@/lib/utils";
import { LuAngry, LuAnnoyed, LuFrown, LuSmile } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { data: isAuth } = useMe();
  const location = useLocation();

  const isAdminRoute = location.pathname.includes("admin/");

  return (
    <header
      className={cn(`header bg-header flex min-h-20 px-6 py-2`, className)}
    >
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-center gap-1 text-center sm:flex-row sm:justify-between sm:gap-0 lg:px-12">
        <Link
          to={`${isAdminRoute ? "/admin/login" : "/"}`} // потом сделать просто страницу /admin с выбором админки данеток и темного джека
          className="cursor-pointer text-2xl font-black uppercase select-none sm:text-3xl"
        >
          {isAdminRoute ? "Админка" : "Карточные игрушки"}
        </Link>
        <div className="flex gap-4">
          <Link className="text-2xl" to="/yes-no-game">
            <LuSmile
              strokeWidth={2.5}
              className="transition hover:text-black"
            />
          </Link>
          {/* {!isAuth && (
            <Link className="text-2xl" to="/admin/login">
              <LuAnnoyed
                strokeWidth={2.5}
                className="transition hover:text-black"
              />
            </Link>
          )} */}
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
