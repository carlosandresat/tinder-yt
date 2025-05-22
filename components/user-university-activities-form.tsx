"use client";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { UserUniversityActivitiesSchema } from "@/schemas";
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

export function UserUniversityActivitiesForm() {
  const form = useForm<z.infer<typeof UserUniversityActivitiesSchema>>({
    resolver: zodResolver(UserUniversityActivitiesSchema),
    defaultValues: {
      activities: [],
    },
  });

  function onSubmit(data: z.infer<typeof UserUniversityActivitiesSchema>) {
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
          name="activities"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Actividades Universitarias</FormLabel>
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
                  <ToggleGroupItem value="clubs">Ir a clubes</ToggleGroupItem>
                  <ToggleGroupItem value="estudiar">
                    Estudiar en la Biblioteca
                  </ToggleGroupItem>
                  <ToggleGroupItem value="luxury">Ir al Luxury</ToggleGroupItem>
                  <ToggleGroupItem value="letras">
                    Ir a las letras
                  </ToggleGroupItem>
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
