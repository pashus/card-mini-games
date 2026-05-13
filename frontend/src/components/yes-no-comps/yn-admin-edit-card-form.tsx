import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEditCard } from "@/hooks/use-edit-card";
import type { IYnCard } from "@/types";
import { HexColorPicker } from "react-colorful";
import { useEffect, useRef, useState } from "react";
import { ImageUpload, type ImageItem } from "../image-form";

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
  categories: z.array(
    z.object({
      name: z.string().min(1, { message: "Минимум 1 символ" }).max(20, {
        message: "Максимум 20 символов",
      }),
      color: z.string().min(7, { message: "Минимум 7 символов" }).max(7, {
        message: "Максимум 7 символов",
      }),
    }),
  ),
  cardColor: z.string().min(7, { message: "Минимум 7 символов" }).max(7, {
    message: "Максимум 7 символов",
  }),
  image: z
    .array(
      z.object({
        id: z.string(),
        url: z.string(),
        file: z.instanceof(File).optional(),
      }),
    )
    .min(1, { message: "Загрузите изображение" }),
});

interface YnAdminEditCardFormProps {
  card: IYnCard;
  onClose: () => void;
  onPendingChange: (isPending: boolean) => void;
}

export function YnAdminEditCardForm({
  card,
  onClose,
  onPendingChange,
}: YnAdminEditCardFormProps) {
  const { mutate, isPending } = useEditCard(card.id);

  const [cardColorOpen, setCardColorOpen] = useState(false);
  const [openCategoryColorIndex, setOpenCategoryColorIndex] = useState<
    number | null
  >(null);

  const categoryPickerRef = useRef<HTMLDivElement | null>(null);
  const cardPickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onPendingChange(isPending);
  }, [isPending]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      if (
        categoryPickerRef.current &&
        !categoryPickerRef.current.contains(target)
      ) {
        setOpenCategoryColorIndex(null);
      }

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
    values: {
      title: card?.title,
      question: card?.question,
      answer: card?.answer,
      categories: card?.categories,
      cardColor: card?.cardColor,
      image: [
        {
          id: `existing-${card.id}`,
          url: card.image,
        },
      ],
    },
    mode: "onSubmit",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();
    const selectedImage = data.image[0];

    formData.append("title", data.title);
    formData.append("question", data.question);
    formData.append("answer", data.answer);
    formData.append("cardColor", data.cardColor);
    formData.append("categories", JSON.stringify(data.categories));
    if (selectedImage?.file) {
      formData.append("image", selectedImage.file);
    } else if (selectedImage?.url) {
      formData.append("image", selectedImage.url);
    }

    mutate(formData, {
      onSuccess: () => {
        form.reset();
        onClose();
      },
      onError: (error: any) => {
        console.log(error);
      },
    });
  }

  return (
    <div>
      <form noValidate id="yn-edit-form" onSubmit={form.handleSubmit(onSubmit)}>
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

          <Field>
            <FieldLabel htmlFor="categories">Категории</FieldLabel>
            {fields.map((item, index) => (
              <div key={item.id} className="flex items-end gap-2">
                <Controller
                  name={`categories.${index}.name`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <Input
                        id="categories"
                        {...field}
                        placeholder="Название категории"
                      />
                      {/* {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )} */}
                    </Field>
                  )}
                />
                <Controller
                  name={`categories.${index}.color`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <div className="relative flex items-center gap-2">
                        <button
                          type="button"
                          className="h-8 w-8 rounded border"
                          style={{ backgroundColor: field.value }}
                          onClick={() =>
                            setOpenCategoryColorIndex(
                              openCategoryColorIndex === index ? null : index,
                            )
                          }
                        />
                        <Input
                          {...field}
                          readOnly
                          className="flex-1"
                          placeholder="#ffffff"
                        />
                        {openCategoryColorIndex === index && (
                          <div
                            ref={categoryPickerRef}
                            className="bg-background absolute bottom-12 rounded-lg border p-3 shadow-xl"
                          >
                            <HexColorPicker
                              color={field.value}
                              onChange={field.onChange}
                            />
                          </div>
                        )}
                      </div>
                      {/* {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )} */}
                    </Field>
                  )}
                />
                <Button type="button" onClick={() => remove(index)}>
                  Удалить
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => append({ name: "", color: "#ffffff" })}
            >
              Добавить категорию
            </Button>
          </Field>

          <Controller
            name="cardColor"
            control={form.control}
            defaultValue="#ffffff"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Цвет карточки</FieldLabel>
                <div className="relative z-10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCardColorOpen((open) => !open)}
                    className="h-8 w-8 rounded border"
                    style={{ backgroundColor: field.value }}
                  />
                  <Input {...field} readOnly className="w-full lg:w-28" />

                  {cardColorOpen && (
                    <div
                      ref={cardPickerRef}
                      className="bg-background absolute top-12 rounded-lg border p-3 shadow-xl"
                    >
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
