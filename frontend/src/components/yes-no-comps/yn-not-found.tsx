import bg from "@/assets/404-bg.png";

export function YnNotFound() {
  return (
    <div
      className="flex flex-1 items-center justify-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="mx-auto flex h-8 w-full max-w-[1550px] -translate-y-10 items-center justify-center px-6">
        <h2 className="text-not-found-foreground text-center text-4xl">
          Страница не найдена
        </h2>
      </section>
    </div>
  );
}
