export function RestInPeace() {
  return (
    <div
      className="text-rip-foreground flex flex-1 flex-col justify-center"
      style={{
        backgroundImage: `url(/rip-bg.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="self-center pt-6 text-center text-4xl font-bold tracking-wider opacity-90">
        Rest in peace
      </h1>
      <section className="mx-auto mb-12 flex w-full max-w-7xl flex-col items-center gap-4 self-center px-6 pt-7 text-center lg:px-0">
        <p className="text-center text-sm opacity-90 sm:text-base">
          Вчера, 14 июня 2026 года, Оливер и ещё 5 человек погибли вследствие
          столкновения двух вертолётов в Рио-де-Жанейро.
        </p>
        <div className="w-full max-w-2xl">
          <img
            src="/oliver.webp"
            alt="Оливер Три"
            className="w-full object-cover"
          />
        </div>
        <div className="w-full max-w-2xl self-center text-end text-sm opacity-90 sm:text-base">
          Покойся с миром, Оливер Три Никелл.
        </div>
      </section>
    </div>
  );
}
