import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex flex-col items-center px-6 lg:px-0">
        <h2 className="text-center text-3xl font-semibold tracking-widest">
          Во что сегодня поиграем?
        </h2>

        <div className="via-foreground/90 mt-2 h-0.5 w-full bg-linear-to-r from-transparent to-transparent" />
      </div>

      <section className="mt-6 flex w-full max-w-5xl flex-col items-center gap-4 px-6 sm:gap-2 lg:grid lg:grid-cols-2 lg:gap-6 lg:px-0">
        <Card
          onClick={() => navigate("/yes-no-game")}
          className="w-full max-w-xs cursor-pointer overflow-hidden border-0 bg-transparent p-0 shadow-none transition-transform duration-200 hover:scale-105 sm:max-w-sm lg:max-w-lg"
        >
          <div className="h-34 sm:h-48 lg:h-56">
            <img
              src="/1.webp"
              alt="Данетки"
              className="h-full w-full object-cover"
            />
          </div>
        </Card>

        <Card
          onClick={() => navigate("/dark-jack-game")}
          className="w-full max-w-xs cursor-pointer overflow-hidden border-0 bg-transparent p-0 shadow-none transition-transform duration-200 hover:scale-105 sm:max-w-sm lg:max-w-lg"
        >
          <div className="h-34 sm:h-48 lg:h-56">
            <img
              src="/2.webp"
              alt="Темный Джек"
              className="h-full w-full object-cover"
            />
          </div>
        </Card>
      </section>
    </div>
  );
}
