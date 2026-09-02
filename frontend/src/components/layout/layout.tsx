import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export function Layout() {
  const location = useLocation();
  const isNotFoundPage = location.pathname === "/not-found";
  const isRipPage = location.pathname === "/rip";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.search]);

  return (
    <div className="flex min-h-svh flex-col">
      <div className="flex min-h-svh flex-1 flex-col">
        <Header />
        <main
          className={cn(
            `flex flex-1 flex-col px-0`,
            isNotFoundPage || isRipPage ? "" : "pt-6 pb-12 lg:px-12",
          )}
        >
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
