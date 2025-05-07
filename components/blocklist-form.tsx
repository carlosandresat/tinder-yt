"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Input } from "@/components/ui/input";

import { BlocklistSchema } from "@/schemas";

export function BlocklistForm() {
  // Define form
  const form = useForm<z.infer<typeof BlocklistSchema>>({
    resolver: zodResolver(BlocklistSchema),
    defaultValues: {
      blocked_email: "",
    },
  });

  function onSubmit(data: z.infer<typeof BlocklistSchema>) {
    form.reset();
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
        className="px-8 mt-8 space-y-2"
      >
        <FormField
          control={form.control}
          name="blocked_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="blocked_email">Email</FormLabel>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Input placeholder="nombre.apellido" {...field} />
                </FormControl>
                <span className="text-muted-foreground">
                  @yachaytech.edu.ec
                </span>
              </div>
              <FormDescription>Usuario a bloquear</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="flex justify-self-end" type="submit">
          Añadir
        </Button>
      </form>
    </Form>
  );
}
