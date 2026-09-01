import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { HexColorPicker } from "react-colorful";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useCreateCategories } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  categories: z
    .array(
      z.object({
        color: z.string(),
        name: z.string().min(2, { message: "Минимум 2 символа" }),
      }),
    )
    .min(1),
});

interface YnAdminCreateCategoriesFormProps {
  onClose: () => void;
  onPendingChange: (pending: boolean) => void;
}

export function YnAdminCreateCategoriesForm({
  onClose,
  onPendingChange,
}: YnAdminCreateCategoriesFormProps) {
  const { mutate, isPending } = useCreateCategories();

  const [openCategoryColorIndex, setOpenCategoryColorIndex] = useState<
    number | null
  >(null);

  const categoryPickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onPendingChange(isPending);
  }, [isPending, onPendingChange]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      if (
        categoryPickerRef.current &&
        !categoryPickerRef.current.contains(target)
      ) {
        setOpenCategoryColorIndex(null);
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
      categories: [{ color: "#ffffff", name: "" }],
    },
    mode: "onSubmit",
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate(data.categories, {
      onSuccess: () => {
        form.reset();
        onClose();
      },
      onError: (error: unknown) => {
        console.log(error);
      },
    });
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  return (
    <div>
      <form
        noValidate
        id="yn-create-categories-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup className="gap-5">
          <Field>
            <FieldLabel htmlFor="categories">Категории</FieldLabel>
            {fields.map((item, index) => (
              <div key={item.id} className="flex items-start gap-2">
                <Controller
                  name={`categories.${index}.name`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <Input
                        id={`categories`}
                        {...field}
                        placeholder="Название категории"
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />

                <Controller
                  name={`categories.${index}.color`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <div
                        ref={
                          openCategoryColorIndex === index
                            ? categoryPickerRef
                            : undefined
                        }
                        className="relative flex items-center gap-2"
                      >
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
                          <div className="bg-background absolute bottom-12 rounded-lg border p-3 shadow-xl">
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
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 1}
                >
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
        </FieldGroup>
      </form>
    </div>
  );
}
