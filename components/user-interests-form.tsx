"use client";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { UserInterestsSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Save } from "lucide-react";

export function UserInterestsForm() {
  const form = useForm<z.infer<typeof UserInterestsSchema>>({
    resolver: zodResolver(UserInterestsSchema),
    defaultValues: {
      interests: [],
    },
  });

  function onSubmit(data: z.infer<typeof UserInterestsSchema>) {
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
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Intereses</FormLabel>
                <FormDescription>Máximo 3</FormDescription>
              </div>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="w-full flex-wrap"
                  variant="outline"
                >
                  <ToggleGroupItem value="deportes">Deportes</ToggleGroupItem>
                  <ToggleGroupItem value="musica">Música</ToggleGroupItem>
                  <ToggleGroupItem value="arte">Arte</ToggleGroupItem>
                  <ToggleGroupItem value="ciencia">Ciencia</ToggleGroupItem>
                  <ToggleGroupItem value="tecnologia">
                    Tecnología
                  </ToggleGroupItem>
                  <ToggleGroupItem value="cultura">Cultura</ToggleGroupItem>
                  <ToggleGroupItem value="viajes">Viajes</ToggleGroupItem>
                  <ToggleGroupItem value="gastronomia">
                    Gastronomía
                  </ToggleGroupItem>
                  <ToggleGroupItem value="naturaleza">
                    Naturaleza
                  </ToggleGroupItem>
                  <ToggleGroupItem value="fotografia">
                    Fotografía
                  </ToggleGroupItem>
                  <ToggleGroupItem value="moda">Moda</ToggleGroupItem>
                  <ToggleGroupItem value="cine">Cine</ToggleGroupItem>
                  <ToggleGroupItem value="videojuegos">
                    Videojuegos
                  </ToggleGroupItem>
                  <ToggleGroupItem value="literatura">
                    Literatura
                  </ToggleGroupItem>
                  <ToggleGroupItem value="historia">Historia</ToggleGroupItem>
                  <ToggleGroupItem value="filosofia">Filosofía</ToggleGroupItem>
                  <ToggleGroupItem value="animales">Animales</ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
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
