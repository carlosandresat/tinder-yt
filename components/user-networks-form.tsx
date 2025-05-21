"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { UserNetworksSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Save } from "lucide-react";
import Image from "next/image";

export function UserNetworksForm() {
  const form = useForm<z.infer<typeof UserNetworksSchema>>({
    resolver: zodResolver(UserNetworksSchema),
    defaultValues: {
      whatsapp: "",
      instagram: "",
      facebook: "",
    },
  });

  function onSubmit(data: z.infer<typeof UserNetworksSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div>
          <h2 className="text-base">Redes sociales</h2>
          <p className="text-sm text-muted-foreground">
            Agrega tus redes sociales para que otros usuarios puedan contactarte
          </p>
        </div>
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Whatsapp</FormLabel>
              <div className="flex items-center space-x-2">
                <Image
                  src="/media-icons/whatsapp.png"
                  alt="Whatsapp Icon"
                  height={26}
                  width={26}
                  className="dark:invert"
                />
                <FormControl>
                  <Input
                    placeholder="Escribe tu número de Whatsapp"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram</FormLabel>
              <div className="flex items-center space-x-2">
                <Image
                  src="/media-icons/instagram.png"
                  alt="Instagram Icon"
                  height={26}
                  width={26}
                  className="dark:invert"
                />

                <FormControl>
                  <Input
                    placeholder="Escribe tu usuario de Instagram"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook</FormLabel>
              <div className="flex items-center space-x-2">
                <Image
                  src="/media-icons/facebook.png"
                  alt="Facebook Icon"
                  height={26}
                  width={26}
                  className="dark:invert"
                />
                <FormControl>
                  <Input
                    placeholder="Escribe tu usuario de Facebook"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-end">
          <Save />
          Guardar
        </Button>
      </form>
    </Form>
  );
}
