import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";

export function Layout() {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-112px)] px-4 pt-6 pb-12 md:px-12">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
