import OliverTree from "@/assets/oliver.jpeg";

export function RestInPeace() {
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="self-center pt-15 text-center text-4xl font-bold tracking-wider">
        Rest in peace
      </h1>
      <section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 self-center px-6 pt-7 text-center lg:px-0">
        <p className="text-center text-sm sm:text-base">
          Вчера, 14 июня 2026 года, Оливер и ещё 5 человек погибли вследствие
          столкновения двух вертолётов в Рио-де-Жанейро.
        </p>
        <div className="w-full max-w-2xl">
          <img
            src={OliverTree}
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
