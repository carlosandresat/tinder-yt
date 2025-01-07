"use client";

import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "@/hooks/use-toast";
import { register } from "@/actions/register";
import { ToastAction } from "@/components/ui/toast";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullname: "",
      sex: undefined,
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof RegisterSchema>) {
    startTransition(async () => {
      const res = await register(data);
      if (res.success) {
        toast({
          title: res.success,
          description: "Ya puedes ingresar a TinderYT",
          action: (
            <ToastAction altText="Ingresa" asChild>
              <Link href="/auth/login">Ingresa</Link>
            </ToastAction>
          ),
        });
      }
      if (res.error) {
        toast({
          variant: "destructive",
          title: "¡Error!",
          description: res.error,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombres</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Este será el nombre que verán tus matchs
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sexo</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  variant="outline"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <ToggleGroupItem value="m">Masculino</ToggleGroupItem>
                  <ToggleGroupItem value="f">Femenino</ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormDescription>Usa tu correo institucional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Contraseña</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-sm text-muted-foreground">
          Una vez creada tu cuenta tendrás que esperar el correo con tu código
          de verificación en las próximas horas. Enviaré los correos manualmente
          así que paciencia 😅
        </p>
        <div className="w-full flex justify-center">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto "
          >
            Crea tu cuenta
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="underline">
            Entra aquí
          </Link>
        </div>
      </form>
    </Form>
  );
}
