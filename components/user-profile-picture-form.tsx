"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { UserProfilePictureSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Save } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function UserProfilePictureForm({ className }: { className?: string }) {
  const form = useForm<z.infer<typeof UserProfilePictureSchema>>({
    resolver: zodResolver(UserProfilePictureSchema),
  });

  function onSubmit(data: z.infer<typeof UserProfilePictureSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const [picturePreview, setPicturePreview] = useState<string | undefined>(
    undefined
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col space-y-4", className)}
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
        <Button type="submit" className="self-end">
          <Save />
          Guardar
        </Button>
      </form>
    </Form>
  );
}
