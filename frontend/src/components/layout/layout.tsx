import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";
import { cn } from "@/lib/utils";

export function Layout() {
  const location = useLocation();
  const isNotFoundPage = location.pathname === "/not-found";

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main
        className={cn(
          `flex flex-1 flex-col px-0`,
          isNotFoundPage ? "" : "pt-6 pb-12 lg:px-12",
        )}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
