"use client"

import { Area, AreaChart, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"
import type { SubscriptionTrendPoint } from "./subscription-view-model"

const chartConfig = {
  subscriptions: {
    label: "Subscriptions",
    color: "var(--color-brand-primary)",
  },
} satisfies ChartConfig

interface MRRChartProps {
  data: SubscriptionTrendPoint[]
  total: number
  changeLabel: string
}

export function MRRChart({ data, total, changeLabel }: MRRChartProps) {
  return (
    <div className="flex h-full flex-col rounded-4xl border border-surface-3 bg-surface-1 p-8 shadow-sm">
      <div className="mb-2 flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            Subscription Signups
          </p>
          <h2 className="text-4xl font-black text-text-primary">
            {total.toLocaleString()}
          </h2>
        </div>
        <Badge className="flex items-center gap-1 rounded-full border-0 bg-success-5 px-3 py-1 text-xs font-bold text-success-1">
          <TrendingUp className="size-3" />
          {changeLabel}
        </Badge>
      </div>

      <div className="mt-4 max-h-45 w-full flex-1">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart
            data={data}
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
              className="text-[10px] font-bold uppercase tracking-widest text-text-muted"
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
