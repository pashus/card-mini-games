import { Footer, YnCardMain } from "@/components";
import { Header } from "@/components/header";

export function YnCardPage() {
  return (
    <div className="bg-container-background lg:bg-background">
      <Header />
      <YnCardMain />
      <Footer />
    </div>
  );
}
