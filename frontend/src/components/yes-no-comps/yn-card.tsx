import { Navigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useEffect, useState } from "react";
import { useCard } from "@/hooks/use-card";
import { TextArrow, YnCardSkeleton, YnFeedBackForm } from "@/components";
import { motion } from "framer-motion";
import { BiLike } from "react-icons/bi";
import { BiTimeFive } from "react-icons/bi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { Skeleton } from "../ui/skeleton";
import { isAxiosError } from "axios";

export function YnCard() {
  const id = useParams().id;
  const [isAnswer, setIsAnswer] = useState(false);
  const [enteredAt, setEnteredAt] = useState("");

  const { data: card, isLoading, error } = useCard(id!);

  useEffect(() => {
    const now = new Date();
    setEnteredAt(
      now.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isAxiosError(error) && error.response?.status === 404) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div>
      <section className="mx-auto flex h-8 w-full max-w-[1550px] items-center justify-between">
        <TextArrow to="/yes-no-game" text="К списку" where="left" />
        <TextArrow
          to={`/yes-no-game/card/${card?.nextYnCardId}`}
          text="Следующая"
          where="right"
          disabled={isLoading || !card || card?.nextYnCardId === null}
        />
      </section>

      <section className="mx-auto flex justify-center pt-7">
        {isLoading ? (
          <YnCardSkeleton />
        ) : (
          <Card
            style={{ backgroundColor: card?.cardColor }}
            className="flex h-auto w-full max-w-5xl flex-col overflow-hidden shadow-xl lg:grid lg:h-[420px] lg:grid-cols-3"
          >
            <div className="flex max-h-80 items-center justify-center overflow-hidden lg:max-h-full lg:pl-8">
              <img
                src={card?.image}
                alt={card?.title}
                className="w-2/3 lg:w-auto"
              />
            </div>

            <div className="col-span-1 grid gap-4 p-8 py-4 text-center lg:col-span-2 lg:gap-6 lg:text-start">
              <div>
                <span className="text-muted-foreground text-sm uppercase">
                  Данетка
                </span>
                <h1 className="text-2xl font-bold">{card?.title}</h1>
              </div>

              <div className="relative flex-1 perspective-distant">
                <motion.div
                  animate={{ rotateY: isAnswer ? -180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="transform-3d"
                >
                  <div className="relative h-60 w-full text-sm transform-3d md:text-base lg:h-40">
                    <div className="absolute inset-0 flex items-center bg-white p-6 shadow-xl backface-hidden">
                      <p>{card?.question}</p>
                    </div>
                    <div className="bg-foreground absolute inset-0 flex transform-[rotateY(180deg)] items-center p-6 text-[#fff7f0] shadow-xl backface-hidden">
                      <p>{card?.answer}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-4 lg:mt-0">
                <Button
                  className="text-md h-12 w-full cursor-pointer lg:h-10 lg:w-40"
                  onClick={() => setIsAnswer(!isAnswer)}
                  size="lg"
                >
                  {isAnswer ? "Показать вопрос" : "Показать ответ"}
                </Button>
              </div>
            </div>
          </Card>
        )}
      </section>

      <section className="bg-card-stats xs:text-2xl mx-auto mt-16 flex h-30 max-w-7xl items-center justify-evenly text-xl font-semibold shadow-sm">
        <div className="flex flex-col items-center">
          <BiLike />
          {isLoading ? (
            <Skeleton className="mx-auto mt-1 h-7 w-13 bg-gray-300" />
          ) : (
            <span>{card?.popularity}%</span>
          )}
        </div>
        <div className="flex flex-col items-center">
          <BiTimeFive />
          {isLoading ? (
            <Skeleton className="mx-auto mt-1 h-7 w-13 bg-gray-300" />
          ) : (
            <span>{card?.duration} мин.</span>
          )}
        </div>
        <div className="flex flex-col items-center">
          <HiArrowsUpDown />
          {isLoading ? (
            <Skeleton className="mx-auto mt-1 h-7 w-13 bg-gray-300" />
          ) : (
            <span>{card?.difficulty}/10</span>
          )}
        </div>
      </section>

      <section className="mx-auto mt-16 flex max-w-7xl flex-col gap-2">
        <h2 className="text-center text-3xl font-semibold">Как вам данетка?</h2>
        <div>
          <YnFeedBackForm cardId={Number(id)} enteredAt={enteredAt} />
        </div>
      </section>
    </div>
  );
}
