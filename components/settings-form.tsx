"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SettingsSchema } from "@/schemas";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";

export function SettingsForm() {
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      sexPreference: "both",
      ageRange: [18, 40],
      visibleInTinderYT: true,
    },
  });

  function onSubmit(data: z.infer<typeof SettingsSchema>) {
    console.log(data);
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
        className="flex flex-col space-y-8 pt-8 px-8 w-full sm:max-w-2xl"
      >
        <FormField
          control={form.control}
          name="sexPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matchear con</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  variant="outline"
                  className="flex-wrap"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <ToggleGroupItem value="m">Hombres</ToggleGroupItem>
                  <ToggleGroupItem value="f">Mujeres</ToggleGroupItem>
                  <ToggleGroupItem value="both">Ambos</ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ageRange"
          render={({ field }) => (
            <FormItem className="pb-6">
              <FormLabel>Rango de Edad</FormLabel>
              <FormControl>
                <DualRangeSlider
                  label={(value) => value ? value < 40 ? value : `${value}+` : ""}
                  labelPosition="bottom"
                  max={40}
                  min={18}
                  step={1}
                  className="w-full"
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="visibleInTinderYT"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Visible en TinderYT</FormLabel>
                <FormDescription>
                  Si desactivas esta opción, no podrás ver ni ser visto por
                  otros usuarios.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-readonly
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <Button type="submit"><Save /> Guardar</Button>
        </div>
      </form>
    </Form>
  );
}
