import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";

export function Layout() {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100svh-112px)] flex-col px-4 pt-6 pb-12 md:px-12">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
