"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  //ChartTooltip,
  //ChartTooltipContent,
} from "@/components/ui/chart";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { WeeklyQuestionSchema } from "@/schemas";
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
import { Button } from "@/components/ui/button";
import { answerQuestionC } from "@/actions/weekly-survey";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  votes: {
    label: "Votos",
  },
  ecbi: {
    label: "ECSB",
    color: "hsl(var(--chart-1))",
  },
  ecqi: {
    label: "EERS",
    color: "hsl(var(--chart-2))",
  },
  ecfn: {
    label: "ECSHD",
    color: "hsl(var(--chart-3))",
  },
  ecmc: {
    label: "EIET",
    color: "hsl(var(--chart-4))",
  },
  ectea: {
    label: "EIRA",
    color: "hsl(var(--chart-5))",
  },
  unae: {
    label: "ECEA",
    color: "hsl(var(--foreground))",
  },
} satisfies ChartConfig;

export function Question3Chart({
  userId,
  answersData,
  isAnswered,
}: {
  userId: string | undefined;
  answersData: {
    [key: string]: number;
  };
  isAnswered: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const chartData = [
    { school: "ecbi", votes: answersData.option1, fill: "var(--color-ecbi)" },
    { school: "ecqi", votes: answersData.option2, fill: "var(--color-ecqi)" },
    { school: "ecfn", votes: answersData.option3, fill: "var(--color-ecfn)" },
    { school: "ecmc", votes: answersData.option4, fill: "var(--color-ecmc)" },
    { school: "ectea", votes: answersData.option5, fill: "var(--color-ectea)" },
    { school: "unae", votes: answersData.option6, fill: "var(--color-unae)" },
  ];

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
        const result = await answerQuestionC(userId, data);

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
    <Card className="max-w-2xl 2xl:max-w-screen-lg mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-lg">Nueva Escuela</CardTitle>
        <CardDescription>
          Imagina que eres el/la rector/a y tienes que tomar la decisión para
          una nueva Escuela digna de Yachay Tech 💯
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <ChartContainer
          config={chartConfig}
          className="min-h-[400px] w-full 2xl:max-w-2xl"
        >
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
            />
            <XAxis dataKey="votes" type="number" hide />
            {/*<ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />*/}
            <Bar dataKey="votes" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Propuestas de Escuelas con sus carreras
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                <Card>
                  <div className="flex items-center border-b rounded-t-xl ">
                    <CardHeader className="w-full">
                      <CardTitle>
                        <div>
                          Escuela de Ciencias de la Salud y Bioingeniería
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <div className="border-l p-6 bg-chart-1 text-white rounded-tr-xl">
                      <p className="font-semibold leading-none tracking-tight my-6 ">
                        ECSB
                      </p>
                    </div>
                  </div>

                  <CardContent>
                    <ul className="mt-6 ml-6 list-disc [&>li]:mt-2">
                      <li>Medicina Experimental</li>
                      <li>Bioinformática</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <div className="flex items-center border-b rounded-t-xl">
                    <CardHeader className="w-full">
                      <CardTitle>
                        <div>
                          Escuela de Energías Renovables y Sostenibilidad
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <div className="border-l p-6 bg-chart-2 text-white rounded-tr-xl">
                      <p className="font-semibold leading-none tracking-tight my-6 ">
                        EERS
                      </p>
                    </div>
                  </div>

                  <CardContent>
                    <ul className="mt-6 ml-6 list-disc [&>li]:mt-2">
                      <li>Ingeniería en Energías Renovables</li>
                      <li>Gestión de Recursos Sostenibles</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <div className="flex items-center border-b rounded-t-xl">
                    <CardHeader className="w-full">
                      <CardTitle>
                        <div>
                          Escuela de Ciencias Sociales y Humanidades Digitales
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <div className="border-l p-6 bg-chart-3 text-white rounded-tr-xl">
                      <p className="font-semibold leading-none tracking-tight my-6 ">
                        ECSHD
                      </p>
                    </div>
                  </div>

                  <CardContent>
                    <ul className="mt-6 ml-6 list-disc [&>li]:mt-2">
                      <li>Humanidades Digitales</li>
                      <li>
                        Estudios Interdisciplinarios en Tecnología y Sociedad
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <div className="flex items-center border-b rounded-t-xl">
                    <CardHeader className="w-full">
                      <CardTitle>
                        <div>
                          Escuela de Innovación Empresarial y Tecnológica
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <div className="border-l p-6 bg-chart-4 text-white rounded-tr-xl">
                      <p className="font-semibold leading-none tracking-tight my-6 ">
                        EIET
                      </p>
                    </div>
                  </div>

                  <CardContent>
                    <ul className="mt-6 ml-6 list-disc [&>li]:mt-2">
                      <li>Innovación y Emprendimiento Tecnológico</li>
                      <li>Ingeniería en Gestión de Tecnología e Innovación</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <div className="flex items-center border-b rounded-t-xl">
                    <CardHeader className="w-full">
                      <CardTitle>
                        <div>
                          Escuela de Ingeniería Robótica y Automatización
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <div className="border-l p-6 bg-chart-5 text-white rounded-tr-xl">
                      <p className="font-semibold leading-none tracking-tight my-6 ">
                        EIRA
                      </p>
                    </div>
                  </div>

                  <CardContent>
                    <ul className="mt-6 ml-6 list-disc [&>li]:mt-2">
                      <li>Ingeniería en Robótica</li>
                      <li>Sistemas Autónomos y Automatización Industrial</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <div className="flex items-center border-b rounded-t-xl">
                    <CardHeader className="w-full">
                      <CardTitle>
                        <div>Escuela de Ciencias Espaciales y Astronomía</div>
                      </CardTitle>
                    </CardHeader>
                    <div className="border-l p-6 bg-foreground text-white dark:text-black rounded-tr-xl">
                      <p className="font-semibold leading-none tracking-tight my-6 ">
                        ECEA
                      </p>
                    </div>
                  </div>

                  <CardContent>
                    <ul className="mt-6 ml-6 list-disc [&>li]:mt-2">
                      <li>Astronomía y Astrofísica</li>
                      <li>Ingeniería Aeroespacial</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
      </CardContent>
      <CardFooter>
        {!isAnswered && (
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
                    <FormLabel>Elige tu respuesta</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una Escuela" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">
                          Ciencias de la Salud y Bioingeniería
                        </SelectItem>
                        <SelectItem value="2">
                          Energías Renovables y Sostenibilidad
                        </SelectItem>
                        <SelectItem value="3">
                          Ciencias Sociales y Humanidades Digitales
                        </SelectItem>
                        <SelectItem value="4">
                          Innovación Empresarial y Tecnológica
                        </SelectItem>
                        <SelectItem value="5">
                          Ingeniería Robótica y Automatización
                        </SelectItem>
                        <SelectItem value="6">
                          Ciencias Espaciales y Astronomía
                        </SelectItem>
                      </SelectContent>
                    </Select>

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
        )}
      </CardFooter>
    </Card>
  );
}
