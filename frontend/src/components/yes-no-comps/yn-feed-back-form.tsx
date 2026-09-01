import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { FieldGroup, Field, FieldLabel, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useCreateReview } from "@/hooks";
import { difficultyLabels, likeLabels } from "@/constants";

const formSchema = z.object({
  liked: z.enum(["yes", "no", "meh"], {
    message: "Выберите: понравилось вам или нет",
  }),
  difficulty: z.enum(["low", "medium", "hard"], {
    message: "Выберите сложность",
  }),
  duration: z.number().min(1).max(60, {
    message: "Максимум 60 минут",
  }),
});

interface IYnFeedBackFormProps {
  cardId: number;
  enteredAt: string;
}

export function YnFeedBackForm({ cardId, enteredAt }: IYnFeedBackFormProps) {
  const { mutate, isPending } = useCreateReview();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      liked: "yes",
      difficulty: "low",
      duration: 1,
    },
    mode: "onSubmit",
  });

  // что интересно лучше, обрабатывать так, или через mutateAsync и try/catch
  // и надо подумать над UX, про выбранные варианты отзыва пользователя
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    const fullData = {
      ...data,
      cardId,
      liked: likeLabels.find((i) => i.value === data.liked)!.score,
      difficulty: difficultyLabels.find((i) => i.value === data.difficulty)!
        .score,
    };

    mutate(fullData, {
      onSuccess: () => {
        form.reset();
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  return (
    <div>
      <form id="yn-feed-back-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-1">
          <Controller
            name="liked"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-1">
                <FieldLabel className="text-md font-normal">
                  Понравилась?
                </FieldLabel>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex justify-between gap-0"
                >
                  {likeLabels.map((item) => (
                    <Label
                      key={item.value}
                      htmlFor={`liked-${item.value}`}
                      className="hover:bg-muted has-checked:bg-primary has-checked:text-primary-foreground has-checked:border-primary bg-card-review-buttons xs:text-xl h-12 flex-1 cursor-pointer items-center justify-center rounded-sm border px-4 py-2 text-center text-lg transition"
                    >
                      <RadioGroupItem
                        id={`liked-${item.value}`}
                        value={item.value}
                        className="hidden"
                      />
                      {item.label}
                    </Label>
                  ))}
                </RadioGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="difficulty"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-1">
                <FieldLabel className="text-md font-normal">
                  Насколько сложно?
                </FieldLabel>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex justify-between gap-0"
                >
                  {difficultyLabels.map((item) => (
                    <Label
                      key={item.value}
                      htmlFor={`difficulty-${item.value}`}
                      className="hover:bg-muted has-checked:bg-primary has-checked:text-primary-foreground has-checked:border-primary bg-card-review-buttons xs:text-xl h-12 flex-1 cursor-pointer items-center justify-center rounded-sm border px-4 py-2 text-center text-lg transition"
                    >
                      <RadioGroupItem
                        id={`difficulty-${item.value}`}
                        value={item.value}
                        className="hidden"
                      />
                      {item.label}
                    </Label>
                  ))}
                </RadioGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="duration"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-1">
                <FieldGroup className="flex-row justify-between gap-1">
                  <FieldLabel
                    htmlFor="minutesInput"
                    className="text-md text-start font-normal"
                  >
                    Сколько минут решали?
                  </FieldLabel>
                  <FieldLabel className="text-md text-end font-normal">
                    Вы&nbsp;зашли на&nbsp;страницу&nbsp;в {enteredAt}
                  </FieldLabel>
                </FieldGroup>
                <Input
                  id="minutesInput"
                  type="number"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                  className="bg-card-review-buttons mb-1 h-12 rounded-sm border-0 px-4 py-2 text-xl! transition"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <Field orientation="horizontal" className="mt-4">
        <Button
          type="submit"
          form="yn-feed-back-form"
          className="h-12 w-full cursor-pointer text-xl lg:w-auto"
          size="lg"
          disabled={isPending}
        >
          Отправить
        </Button>
      </Field>
    </div>
  );
}
