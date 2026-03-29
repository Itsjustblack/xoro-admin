"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const dailyData = [
  { date: "Jan 01", amount: 450000 },
  { date: "Jan 05", amount: 600000 },
  { date: "Jan 10", amount: 550000 },
  { date: "Jan 15", amount: 950000 },
  { date: "Jan 20", amount: 800000 },
  { date: "Jan 25", amount: 1100000 },
  { date: "Jan 30", amount: 2450000 },
]

const weeklyData = [
  { date: "Week 1", amount: 1200000 },
  { date: "Week 2", amount: 1800000 },
  { date: "Week 3", amount: 1500000 },
  { date: "Week 4", amount: 2450000 },
]

const chartConfig = {
  amount: {
    label: "Contributions",
    color: "var(--color-brand-primary)",
  },
} satisfies ChartConfig

export function PaymentActivityChart() {
  const [view, setView] = React.useState<"daily" | "weekly">("daily")
  const data = view === "daily" ? dailyData : weeklyData

  return (
    <section className="rounded-4xl border border-surface-3 bg-surface-1 p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-text-primary">Payment Activity Over Time</h2>
          <p className="text-sm text-text-secondary font-medium">Visualization of contributions across the last 30 days</p>
        </div>
        <div className="flex bg-surface-2 p-1 rounded-xl border border-surface-6">
          <Button 
            variant="ghost" 
            onClick={() => setView("daily")}
            className={cn(
              "h-9 px-4 rounded-lg font-bold text-xs transition-all",
              view === "daily" ? "bg-white shadow-sm text-brand-primary" : "text-text-muted hover:text-text-primary"
            )}
          >
            Daily
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setView("weekly")}
            className={cn(
              "h-9 px-4 rounded-lg font-bold text-xs transition-all",
              view === "weekly" ? "bg-white shadow-sm text-brand-primary" : "text-text-muted hover:text-text-primary"
            )}
          >
            Weekly
          </Button>
        </div>
      </div>

      <div className="h-80 w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart
            data={data}
            margin={{
              left: 0,
              right: 0,
              top: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-brand-primary)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-brand-primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid 
              vertical={false} 
              strokeDasharray="3 3" 
              stroke="var(--color-surface-6)"
              className="stroke-surface-6"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              className="text-[10px] font-bold text-text-muted uppercase tracking-wider"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              tickFormatter={(value) => `₦${(value / 1000).toLocaleString()}k`}
              className="text-[10px] font-bold text-text-muted uppercase tracking-wider"
            />
            <ChartTooltip
              cursor={{ stroke: 'var(--color-brand-primary)', strokeWidth: 1, strokeDasharray: '4 4' }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="amount"
              type="monotone"
              stroke="var(--color-brand-primary)"
              strokeWidth={3}
              fill="url(#fillAmount)"
              dot={{
                r: 4,
                fill: "#fff",
                stroke: "var(--color-brand-primary)",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "var(--color-brand-primary)",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </section>
  )
}
