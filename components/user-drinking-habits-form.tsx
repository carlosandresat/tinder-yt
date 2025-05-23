"use client";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { UserDrinkingHabitsSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Save } from "lucide-react";

export function UserDrinkingHabitsForm() {
  const form = useForm<z.infer<typeof UserDrinkingHabitsSchema>>({
    resolver: zodResolver(UserDrinkingHabitsSchema),
    defaultValues: {
      drinkingType: [],
    },
  });

  function onSubmit(data: z.infer<typeof UserDrinkingHabitsSchema>) {
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
          name="drinkingHabits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hábitos de bebida</FormLabel>
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
                    No sufro de alcoholismo, lo disfruto
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="drinkingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de bebida</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="w-full flex-wrap"
                  variant="outline"
                >
                  <ToggleGroupItem value="puntas">Puntas</ToggleGroupItem>
                  <ToggleGroupItem value="switch">Switch</ToggleGroupItem>
                  <ToggleGroupItem value="zhumir">Zhumir</ToggleGroupItem>
                  <ToggleGroupItem value="beer">Cerveza</ToggleGroupItem>
                  <ToggleGroupItem value="wine">Vino</ToggleGroupItem>
                  <ToggleGroupItem value="cocktails">Cócteles</ToggleGroupItem>
                  <ToggleGroupItem value="tequila">Tequila</ToggleGroupItem>
                  <ToggleGroupItem value="whiskey">Whiskey</ToggleGroupItem>
                  <ToggleGroupItem value="vodka">Vodka</ToggleGroupItem>
                  <ToggleGroupItem value="rum">Ron</ToggleGroupItem>
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
