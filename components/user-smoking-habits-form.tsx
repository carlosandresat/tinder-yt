"use client";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { UserSmokingHabitsSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Save } from "lucide-react";

export function UserSmokingHabitsForm() {
  const form = useForm<z.infer<typeof UserSmokingHabitsSchema>>({
    resolver: zodResolver(UserSmokingHabitsSchema),
  });

  function onSubmit(data: z.infer<typeof UserSmokingHabitsSchema>) {
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
          name="smokingHabits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hábitos de fumar</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="w-full flex-wrap"
                  variant="outline"
                >
                  <ToggleGroupItem value="never">Nunca</ToggleGroupItem>
                  <ToggleGroupItem value="occasionally">
                    Ocasionalmente
                  </ToggleGroupItem>
                  <ToggleGroupItem value="socially">
                    Socialmente
                  </ToggleGroupItem>
                  <ToggleGroupItem value="frequently">
                    Frecuentemente
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="smokingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿Fumar qué?</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="w-full flex-wrap"
                  variant="outline"
                >
                  <ToggleGroupItem value="cigarette">
                    Cigarrillo
                  </ToggleGroupItem>
                  <ToggleGroupItem value="weed">Weed</ToggleGroupItem>
                  <ToggleGroupItem value="vape">Vape</ToggleGroupItem>
                  <ToggleGroupItem value="hookah">Hookah</ToggleGroupItem>
                  <ToggleGroupItem value="other">Otro</ToggleGroupItem>
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
