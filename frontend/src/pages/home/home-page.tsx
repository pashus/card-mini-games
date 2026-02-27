import { Footer } from "@/components";
import { Header } from "@/components/header";
import { HomeMain } from "@/components/home-main";

export function HomePage() {
  return (
    <div className="bg-container-background lg:bg-background flex min-h-screen flex-col">
      <Header />
      <HomeMain />
      <Footer />
    </div>
  );
}
