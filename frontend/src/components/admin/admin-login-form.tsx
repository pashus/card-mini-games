import { useLogin } from "@/hooks/admin/use-login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().min(2, { message: "Минимум 2 символа" }),
  password: z.string().min(2, { message: "Минимум 2 символа" }),
});

export function AdminLogin() {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setServerError(null);

    mutate(data, {
      onSuccess: () => {
        form.reset();
        navigate("/admin/yes-no-game");
      },
      onError: (error: any) => {
        const message = error?.response?.data?.message;
        setServerError(message);
        console.log(error);
      },
    });
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm"
      >
        <FieldGroup className="gap-5">
          <div className="min-h-[39px] text-center text-sm">
            {serverError ? (
              <span className="text-destructive">{serverError}</span>
            ) : (
              <span></span>
            )}
          </div>

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  type="email"
                  placeholder="Введите email"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setServerError(null);
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Пароль</FieldLabel>
                <Input
                  id={field.name}
                  type="password"
                  placeholder="Введите пароль"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setServerError(null);
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Вход..." : "Войти"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
