import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useCreateCard } from "@/hooks";
import { HexColorPicker } from "react-colorful";
import { useEffect, useRef, useState } from "react";
import { ImageUpload } from "../image-form";
import { useCategories } from "@/hooks";
import type { IYnCategory } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const formSchema = z.object({
  title: z.string().min(2, { message: "Минимум 2 символа" }).max(100, {
    message: "Максимум 100 символов",
  }),
  question: z.string().min(2, { message: "Минимум 2 символа" }).max(200, {
    message: "Максимум 200 символов",
  }),
  answer: z.string().min(2, { message: "Минимум 2 символа" }).max(250, {
    message: "Максимум 250 символов",
  }),
  categories: z.array(z.number()).min(1, { message: "Минимум 1 категория" }),
  cardColor: z.string().min(7, { message: "Минимум 7 символов" }).max(7, {
    message: "Максимум 7 символов",
  }),
  image: z
    .array(
      z.object({
        id: z.string(),
        url: z.string(),
        file: z.instanceof(File),
      }),
    )
    .min(1, { message: "Загрузите изображение" }),
});

interface YnAdminCreateCardFormProps {
  onClose: () => void;
  onPendingChange: (pending: boolean) => void;
}

export function YnAdminCreateCardForm({
  onClose,
  onPendingChange,
}: YnAdminCreateCardFormProps) {
  const { mutate, isPending } = useCreateCard();
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();

  const [cardColorOpen, setCardColorOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const cardPickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onPendingChange(isPending);
  }, [isPending, onPendingChange]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      if (cardPickerRef.current && !cardPickerRef.current.contains(target)) {
        setCardColorOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      question: "",
      answer: "",
      categories: [],
      cardColor: "#ffffff",
      image: [],
    },
    mode: "onSubmit",
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("question", data.question);
    formData.append("answer", data.answer);
    formData.append("cardColor", data.cardColor);
    formData.append("categories", JSON.stringify(data.categories));
    formData.append("duration", "0");
    formData.append("liked", "0");
    formData.append("difficulty", "0");
    formData.append("image", data.image[0]?.file);

    mutate(formData, {
      onSuccess: () => {
        form.reset();
        onClose();
      },
    });
  }

  return (
    <div>
      <form
        noValidate
        id="yn-create-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup className="gap-5">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Название</FieldLabel>
                  <Input
                    id={field.name}
                    {...field}
                    placeholder="Введите название"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />

          <Controller
            name="question"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Ситуация или вопрос
                  </FieldLabel>
                  <Input
                    id={field.name}
                    {...field}
                    placeholder="Введите описание ситуации"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />

          <Controller
            name="answer"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Ответ</FieldLabel>
                  <Input
                    id={field.name}
                    {...field}
                    placeholder="Введите ответ"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />

          <Controller
            name="categories"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field>
                  <FieldLabel>Категории</FieldLabel>
                  <Popover
                    open={categoriesOpen}
                    onOpenChange={setCategoriesOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        className="flex-1 whitespace-normal"
                      >
                        {field.value.length > 0
                          ? categories
                              ?.filter((category: IYnCategory) =>
                                field.value.includes(category.id),
                              )
                              .map((category: IYnCategory) => category.name)
                              .join(", ")
                          : "Выберите категории"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent align="center">
                      {isCategoriesLoading && (
                        <div className="text-sm opacity-70">Загрузка...</div>
                      )}

                      {!isCategoriesLoading && categories?.length === 0 && (
                        <div className="text-sm opacity-70">Категорий нет</div>
                      )}

                      {isCategoriesError && (
                        <div className="text-sm opacity-70">
                          Произошла ошибка при загрузке категорий
                        </div>
                      )}

                      {!isCategoriesLoading &&
                        (categories?.length ?? 0) > 0 && (
                          <div
                            className="max-h-60 space-y-2 overflow-y-auto"
                            onWheel={(e) => e.stopPropagation()}
                          >
                            {categories?.map((category) => (
                              <Field key={category.id} orientation="horizontal">
                                <Checkbox
                                  id={`category-${category.id}`}
                                  checked={field.value.includes(category.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([
                                        ...field.value,
                                        category.id,
                                      ]);
                                    } else {
                                      field.onChange(
                                        field.value.filter(
                                          (id) => id !== category.id,
                                        ),
                                      );
                                    }
                                  }}
                                />

                                <FieldLabel
                                  htmlFor={`category-${category.id}`}
                                  style={{
                                    backgroundColor: `${category.color}BF`,
                                  }}
                                  className="cursor-pointer rounded px-1.5 py-0.5"
                                >
                                  {category.name}
                                </FieldLabel>
                              </Field>
                            ))}
                          </div>
                        )}
                    </PopoverContent>
                  </Popover>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />

          <Controller
            name="cardColor"
            control={form.control}
            defaultValue="#ffffff"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Цвет карточки</FieldLabel>
                <div
                  ref={cardColorOpen ? cardPickerRef : undefined}
                  className="relative z-10 flex items-center gap-2 lg:max-w-38"
                >
                  <button
                    type="button"
                    onClick={() => setCardColorOpen((open) => !open)}
                    className="h-8 w-8 rounded border"
                    style={{ backgroundColor: field.value }}
                  />
                  <Input {...field} readOnly className="w-full lg:w-28" />

                  {cardColorOpen && (
                    <div className="bg-background absolute top-12 rounded-lg border p-3 shadow-xl">
                      <HexColorPicker
                        color={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  )}
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="image"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field>
                  <FieldLabel>Загрузите фотографию</FieldLabel>
                  <ImageUpload
                    {...field}
                    images={field.value}
                    onChange={field.onChange}
                    maxImages={1}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </form>
    </div>
  );
}
