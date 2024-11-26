"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MatchFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function ProfileForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof MatchFormSchema>>({
    resolver: zodResolver(MatchFormSchema),
    defaultValues: {
      description: "",
      question2: [],
      question3: 3,
    },
  });

  const question3options = [
    "Mensaje de opción 1",
    "Mensaje de opción 2",
    "Mensaje de opción 3",
    "Mensaje de opción 4",
    "Mensaje de opción 5",
  ];

  function onSubmit(data: z.infer<typeof MatchFormSchema>) {
    startTransition(async () => {
      try {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
      } catch (e) {
        if (e instanceof Error) {
          const message = e.message;
          toast({
            title: "¡Error!",
            description: message,
          });
        }
      }
    });
  }

  const [picturePreview, setPicturePreview] = useState<string | undefined>(
    undefined
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Crea tu perfil</CardTitle>
        <CardDescription>
          Responde las siguientes preguntas cuidadosamente y con sinceridad para
          encontrar a tu match más compatible 💯
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="picture"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Foto de Perfil</FormLabel>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-24 h-24">
                      {picturePreview !== undefined ? (
                        <AvatarImage
                          src={picturePreview}
                          alt="Profile picture preview"
                          className="object-cover"
                        />
                      ) : (
                        <AvatarFallback>Foto</AvatarFallback>
                      )}
                    </Avatar>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        placeholder="Picture"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          onChange(event.target.files && event.target.files[0]);
                          setPicturePreview(
                            event.target.files && event.target.files[0]
                              ? URL.createObjectURL(event.target.files[0])
                              : undefined
                          );
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Háblanos de ti" />
                  </FormControl>
                  <FormDescription>
                    No incluyas datos personales como nombre o contacto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pregunta una opción</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}
                      className="flex-wrap"
                    >
                      <ToggleGroupItem value="1">Respuesta1</ToggleGroupItem>
                      <ToggleGroupItem value="2">Respuesta2</ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Pregunta multiples opciones (Max. 3 opciones)
                  </FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      variant="outline"
                      value={field.value.map((answer) => answer.toString())}
                      onValueChange={(values) =>
                        field.onChange(values.map((value) => Number(value)))
                      }
                      className="flex-wrap"
                    >
                      <ToggleGroupItem value="1">Respuesta 1</ToggleGroupItem>
                      <ToggleGroupItem value="2">Respuesta 2</ToggleGroupItem>
                      <ToggleGroupItem value="3">Respuesta 3</ToggleGroupItem>
                      <ToggleGroupItem value="4">Respuesta 4</ToggleGroupItem>
                      <ToggleGroupItem value="5">Respuesta 5</ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pregunta de escala</FormLabel>
                  <div className="flex gap-6 w-full items-center justify-between">
                    <p>1</p>
                    <FormControl>
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <p>5</p>
                  </div>
                  <div className="text-center text-sm" aria-live="polite">
                    {question3options[form.watch("question3") - 1]}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-center">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto "
              >
                Ingresar respuestas
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
