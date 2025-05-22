"use client";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { UserOpenToSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Save } from "lucide-react";

export function UserOpenToForm() {
  const form = useForm<z.infer<typeof UserOpenToSchema>>({
    resolver: zodResolver(UserOpenToSchema),
    defaultValues: {
      openTo: "amistad",
    },
  });

  function onSubmit(data: z.infer<typeof UserOpenToSchema>) {
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
          name="openTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Abierto a</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="w-full flex-wrap"
                  variant="outline"
                >
                  <ToggleGroupItem value="amistad">Amistad</ToggleGroupItem>
                  <ToggleGroupItem value="amor">Amor</ToggleGroupItem>
                  <ToggleGroupItem value="vacile">Vacile</ToggleGroupItem>
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
