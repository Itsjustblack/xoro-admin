"use client"

import * as React from "react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

const mrrData = [
  { month: "JAN", amount: 15000 },
  { month: "FEB", amount: 18000 },
  { month: "MAR", amount: 14000 },
  { month: "APR", amount: 22000 },
  { month: "MAY", amount: 19000 },
  { month: "JUN", amount: 35000 },
]

const chartConfig = {
  amount: {
    label: "MRR",
    color: "var(--color-brand-primary)",
  },
} satisfies ChartConfig

export function MRRChart() {
  return (
    <div className="rounded-4xl border border-surface-3 bg-surface-1 p-8 shadow-sm flex flex-col h-full">
      <div className="flex items-start justify-between mb-2">
        <div className="space-y-1">
          <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Monthly Recurring Revenue (MRR)
          </p>
          <h2 className="text-4xl font-black text-text-primary">
            $42,500.00
          </h2>
        </div>
        <Badge className="bg-success-5 text-success-1 border-0 rounded-full px-3 py-1 font-bold text-xs flex items-center gap-1">
          <TrendingUp className="size-3" />
          +12.5%
        </Badge>
      </div>

      <div className="flex-1 w-full mt-4 max-h-45">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart
            data={mrrData}
            margin={{
              left: -20,
              right: 0,
              top: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="fillMRR" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-brand-primary)"
                  stopOpacity={0.1}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-brand-primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              className="text-[10px] font-bold text-text-muted uppercase tracking-widest"
            />
            <YAxis hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="amount"
              type="monotone"
              stroke="var(--color-brand-primary)"
              strokeWidth={4}
              fill="url(#fillMRR)"
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  )
}
