"use client"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Label, Pie, PieChart } from "recharts"

let chartConfig = {
  amount: {
    label: "Minutes saved",
    color: "#ffffff",
  },
} satisfies ChartConfig

interface Props {
  data: { total_jobs: number; dashboards: { name: string; amount: number }[] }
  time: true | false
}

const Chart = ({ data, time }: Props) => {
  // add fill color and change amount dynamcially
  data.dashboards = data.dashboards.map(({ name, amount }, index) => {
    return {
      name,
      amount: time
        ? Math.ceil(
            (amount * Number(process.env.NEXT_PUBLIC_TIME_SAVED_PER_JOB)) / 60
          )
        : amount,
      fill: time
        ? `hsl(var(--chart-time-${index}))`
        : `hsl(var(--chart-${index}))`,
    }
  })

  //   make total_jobs the minutes saved
  if (time) {
    data.total_jobs = Math.ceil(
      (data.total_jobs * Number(process.env.NEXT_PUBLIC_TIME_SAVED_PER_JOB)) /
        60
    )
  }

  // dynamically add dashboards to chart config
  data.dashboards.forEach((dashboard) => {
    chartConfig = {
      ...chartConfig,
      [dashboard.name]: {
        label: dashboard.name,
      },
    }
  })

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square min-h-[200px] max-h-[200px] w-full rounded-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={data.dashboards}
          dataKey="amount"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {data.total_jobs}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className=" text-black"
                    >
                      {time ? "Minutes Saved" : "Jobs applied"}
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
export default Chart