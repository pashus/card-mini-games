import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-1 items-center justify-center"
      style={{
        backgroundImage: `url(/404-bg.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="mx-auto flex w-full max-w-[1550px] -translate-y-10 flex-col items-center justify-center gap-4 px-6">
        <h2 className="text-not-found-foreground text-center text-4xl opacity-90">
          Страница не найдена
        </h2>
        <Button size="lg" onClick={() => navigate("/")} className="text-base">
          На главную
        </Button>
      </section>
    </div>
  );
}
