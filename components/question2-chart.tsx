"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { WeeklyMultipleQuestionSchema } from "@/schemas"
import { toast } from "@/hooks/use-toast"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { answerQuestionB } from "@/actions/weekly-survey"
const chartData = [
  { school: "option1", votes: 275, fill: "var(--color-option1)" },
  { school: "option2", votes: 200, fill: "var(--color-option2)" },
  { school: "option3", votes: 187, fill: "var(--color-option3)" },
  { school: "option4", votes: 173, fill: "var(--color-option4)" },
]

const chartConfig = {
  votes: {
    label: "Votos",
  },
  option1: {
    label: "Atención al cliente",
    color: "hsl(var(--chart-1))",
  },
  option2: {
    label: "Precios",
    color: "hsl(var(--chart-2))",
  },
  option3: {
    label: "Calidad de productos",
    color: "hsl(var(--chart-3))",
  },
  option4: {
    label: "Ninguna, no he sido afectado",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function Question2Chart({userId}:{userId:string|undefined}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof WeeklyMultipleQuestionSchema>>({
    resolver: zodResolver(WeeklyMultipleQuestionSchema),
    defaultValues: {
      answer: [],
    }
  });

  function onSubmit(data: z.infer<typeof WeeklyMultipleQuestionSchema>) {
    startTransition(async () => {
      if (!userId) {
        toast({
          title: "¡Acción denegada!",
          description: "No tienes una sesión valida",
          variant: "destructive",
        });
      } else {
        const result = await answerQuestionB(userId, data);

        if (result.error) {
          toast({
            title: "¡Error!",
            description: result.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "¡Gracias por tu respuesta!",
            description: result.success,
          });
        }
      }
    });
  }

  return (
    <Card className="max-w-2xl mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-lg">Falencia más grande de Krispan</CardTitle>
        <CardDescription>La tienda universitaria ha hecho varios aportes positivos a la comunidad estudiantil durante años, pero tampoco ha sido exento de críticas en ciertos temas. Conozcamos la opinión de la comunidad.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="school"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
              width={110}
            />
            <XAxis dataKey="votes" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="votes" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecciona las opciones que consideres que te hayan afectado o muestra apoyo con la última opción</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      variant="outline"
                      value={field.value.map((answer) => answer.toString())}
                      onValueChange={(values) =>
                        field.onChange(values.map((value) => Number(value)))
                      }
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                      size="xl"
                    >
                      <ToggleGroupItem value="1">
                        Atención al cliente
                      </ToggleGroupItem>
                      <ToggleGroupItem value="2">
                        Precios
                      </ToggleGroupItem>
                      <ToggleGroupItem value="3">
                        Calidad de productos
                      </ToggleGroupItem>
                      <ToggleGroupItem value="4">
                        Ninguna, no he sido afectado
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormDescription>
                    Una vez enviado no podrás cambiar tu voto
                  </FormDescription>
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
                Vota
              </Button>
            </div>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
