import { Footer, YnMain } from "@/components";
import { Header } from "@/components/header";

export function YnPage() {
  return (
    <div className="bg-container-background lg:bg-background">
      <Header />
      <YnMain />
      <Footer />
    </div>
  );
}
