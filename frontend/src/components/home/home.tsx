import { Card } from "@/components/ui/card";
import daNetkiImg from "@/assets/1.png";
import blackJackImg from "@/assets/2.png";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex flex-1 flex-col">
      <h2 className="self-center text-2xl font-semibold">
        Во что сегодня поиграем?
      </h2>

      <section className="mx-auto grid w-full max-w-7xl gap-6 pt-8 lg:grid-cols-2">
        <Card
          onClick={() => navigate("/yes-no-game")}
          className="cursor-pointer overflow-hidden p-0 shadow-xl transition-transform duration-200 hover:scale-105"
        >
          <div className="aspect-4/4 h-150 w-full sm:h-160 md:h-170 lg:aspect-4/3 lg:h-180">
            <img
              src={daNetkiImg}
              alt="Данетки"
              className="h-full w-full object-cover"
            />
          </div>
        </Card>

        <Card
          onClick={() => navigate("/dark-jack-game")}
          className="cursor-pointer overflow-hidden p-0 shadow-xl transition-transform duration-200 hover:scale-105"
        >
          <div className="aspect-4/4 h-150 w-full sm:h-160 md:h-170 lg:aspect-4/3 lg:h-180">
            <img
              src={blackJackImg}
              alt="Темный Джек"
              className="h-full w-full object-cover"
            />
          </div>
        </Card>
      </section>
    </div>
  );
}
