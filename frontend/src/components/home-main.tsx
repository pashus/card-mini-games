import { Card } from "@/components/ui/card";
import daNetkiImg from "@/assets/1.png";
import blackJackImg from "@/assets/2.png";
import { useNavigate } from "react-router-dom";

export function HomeMain() {
  const navigate = useNavigate();

  return (
    <main className="bg-container-background container mx-auto flex flex-1 flex-col px-8 py-12 md:px-12">
      <h2 className="self-center text-2xl font-semibold">
        Во что сегодня поиграем?
      </h2>
      <div className="flex flex-1 flex-col items-center justify-between gap-4 py-8 lg:flex-row">
        <Card
          onClick={() => navigate("/yes-no-game")}
          className="xs:w-100 h-100 w-80 transform cursor-pointer overflow-hidden p-0 shadow-xl transition-transform duration-200 hover:scale-105 sm:h-130 sm:w-120 md:h-155 md:w-160 2xl:h-175 2xl:w-170"
        >
          <img src={daNetkiImg} alt="Данетки" className="h-full object-cover" />
        </Card>
        <Card
          onClick={() => navigate("/dark-jack-game")}
          className="xs:w-100 h-100 w-80 transform cursor-pointer overflow-hidden p-0 shadow-xl transition-transform duration-200 hover:scale-105 sm:h-130 sm:w-120 md:h-155 md:w-160 2xl:h-175 2xl:w-170"
        >
          <img
            src={blackJackImg}
            alt="Темный Джек"
            className="h-full object-cover"
          />
        </Card>
      </div>
    </main>
  );
}
