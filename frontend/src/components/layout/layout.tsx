import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";
import { cn } from "@/lib/utils";

export function Layout() {
  const location = useLocation();
  const isNotFoundPage = location.pathname === "/not-found";

  return (
    <>
      <Header />
      <main
        className={cn(
          `flex min-h-[calc(100svh-112px)] flex-col px-0`,
          isNotFoundPage ? "" : "pt-6 pb-12 lg:px-12",
        )}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
