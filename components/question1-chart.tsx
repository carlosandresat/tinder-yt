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
const chartData = [
  { school: "ecbi", votes: 275, fill: "var(--color-ecbi)" },
  { school: "ecqi", votes: 200, fill: "var(--color-ecqi)" },
  { school: "ecfn", votes: 187, fill: "var(--color-ecfn)" },
  { school: "ecmc", votes: 173, fill: "var(--color-ecmc)" },
  { school: "ectea", votes: 90, fill: "var(--color-ectea)" },
  { school: "ecaa", votes: 187, fill: "var(--color-ecaa)" },
  { school: "unae", votes: 173, fill: "var(--color-unae)" },
]

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
    label: "Educación en Ciencias Experimentales (UNAE)",
    color: "rgb(153, 51, 102)",
  },
} satisfies ChartConfig

export function Question1Chart() {
  return (
    <Card className="max-w-2xl mx-auto w-full">
      <CardHeader>
        <CardTitle>Escuela más infiel</CardTitle>
        <CardDescription>Número de votos</CardDescription>
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
            <Bar dataKey="votes" layout="vertical" radius={5}/>
          </BarChart>
        </ChartContainer>
      </CardContent>      
    </Card>
  )
}
