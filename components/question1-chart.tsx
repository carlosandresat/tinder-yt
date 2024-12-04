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
import { WeeklyQuestionSchema } from "@/schemas"
import { toast } from "@/hooks/use-toast"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { answerQuestionA } from "@/actions/weekly-survey"

const chartConfig = {
  votes: {
    label: "Votos",
  },
  ecbi: {
    label: "Ciencias Biológicas e Ingeniería",
    color: "rgb(106, 182, 74)",
  },
  ecqi: {
    label: "Ciencias Químicas e Ingeniería",
    color: "rgb(41, 171, 227)",
  },
  ecfn: {
    label: "Ciencias Físicas y Nanotecnología",
    color: "rgb(254, 207, 14)",
  },
  ecmc: {
    label: "Ciencias Matemáticas y Computacionales",
    color: "rgb(232, 68, 56)",
  },
  ectea: {
    label: "Ciencias de la Tierra, Energía y Ambiente",
    color: "rgb(241, 135, 64)",
  },
  ecaa: {
    label: "Ciencias Agropecuarias y AgroIndustriales",
    color: "rgb(0, 173, 170)",
  },
  unae: {
    label: "Educación en Ciencias Experimentales",
    color: "rgb(153, 51, 102)",
  },
} satisfies ChartConfig

export function Question1Chart({userId, answersData, isAnswered}:{userId:string|undefined, answersData:{
  [key: string]: number;
}, isAnswered:boolean}) {
  const [isPending, startTransition] = useTransition();

  const chartData = [
    { school: "ecbi", votes: answersData.option1, fill: "var(--color-ecbi)" },
    { school: "ecqi", votes: answersData.option2, fill: "var(--color-ecqi)" },
    { school: "ecfn", votes: answersData.option3, fill: "var(--color-ecfn)" },
    { school: "ecmc", votes: answersData.option4, fill: "var(--color-ecmc)" },
    { school: "ectea", votes: answersData.option5, fill: "var(--color-ectea)" },
    { school: "ecaa", votes: answersData.option6, fill: "var(--color-ecaa)" },
    { school: "unae", votes: answersData.option7, fill: "var(--color-unae)" },
  ]

  const form = useForm<z.infer<typeof WeeklyQuestionSchema>>({
    resolver: zodResolver(WeeklyQuestionSchema),
  });

  function onSubmit(data: z.infer<typeof WeeklyQuestionSchema>) {
    startTransition(async () => {
      if (!userId) {
        toast({
          title: "¡Acción denegada!",
          description: "No tienes una sesión valida",
          variant: "destructive",
        });
      } else {
        const result = await answerQuestionA(userId, data);

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
        <CardTitle>Escuela más infiel</CardTitle>
        <CardDescription>Terminemos con el debate. ¿Te han sido infiel desde una escuela en particular? ¿Tus panas de una cierta escuela son unos bandidos? Puedes ingresar tu opinión aquí sin ser juzgado por tu elección 😎</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
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
              width={120}
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
        {!isAnswered && <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Elige tu respuesta</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                      size="xxxl"
                    >
                      <ToggleGroupItem value="1">
                        Ciencias Biológicas e Ingeniería
                      </ToggleGroupItem>
                      <ToggleGroupItem value="2">
                        Ciencias Químicas e Ingeniería
                      </ToggleGroupItem>
                      <ToggleGroupItem value="3">
                        Ciencias Físicas y Nanotecnología
                      </ToggleGroupItem>
                      <ToggleGroupItem value="4">
                        Ciencias Matemáticas y Computacionales
                      </ToggleGroupItem>
                      <ToggleGroupItem value="5">
                        Ciencias de la Tierra, Energía y Ambiente
                      </ToggleGroupItem>
                      <ToggleGroupItem value="6">
                        Ciencias Agropecuarias y AgroIndustriales
                      </ToggleGroupItem>
                      <ToggleGroupItem value="7">
                        Educación en Ciencias Experimentales
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
        </Form>}
      </CardFooter>
    </Card>
  );
}
