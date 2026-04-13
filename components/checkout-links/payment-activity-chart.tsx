"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ITransaction } from "@/lib/types"
import { cn } from "@/lib/utils"

const chartConfig = {
  amount: {
    label: "Contributions",
    color: "var(--color-brand-primary)",
  },
} satisfies ChartConfig

type PaymentActivityChartProps = {
  transactions: ITransaction[]
}

function aggregateTransactionsByDay(transactions: ITransaction[]) {
  const totals = new Map<string, number>()

  transactions.forEach((transaction) => {
    const date = new Date(transaction.created_at)
    if (Number.isNaN(date.getTime())) return

    const label = new Intl.DateTimeFormat("en-NG", {
      month: "short",
      day: "2-digit",
    }).format(date)

    totals.set(label, (totals.get(label) ?? 0) + transaction.amount)
  })

  return Array.from(totals.entries()).map(([date, amount]) => ({ date, amount }))
}

function aggregateTransactionsByWeek(transactions: ITransaction[]) {
  const totals = new Map<string, number>()

  transactions.forEach((transaction) => {
    const date = new Date(transaction.created_at)
    if (Number.isNaN(date.getTime())) return

    const label = `Week ${Math.ceil(date.getDate() / 7)}`
    totals.set(label, (totals.get(label) ?? 0) + transaction.amount)
  })

  return Array.from(totals.entries()).map(([date, amount]) => ({ date, amount }))
}

export function PaymentActivityChart({
  transactions,
}: PaymentActivityChartProps) {
  const [view, setView] = React.useState<"daily" | "weekly">("daily")
  const data =
    view === "daily"
      ? aggregateTransactionsByDay(transactions)
      : aggregateTransactionsByWeek(transactions)

  return (
    <section className="rounded-4xl border border-surface-3 bg-surface-1 p-8 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-text-primary">
            Payment Activity Over Time
          </h2>
          <p className="text-sm font-medium text-text-secondary">
            Visualization of recorded checkout transactions
          </p>
        </div>
        <div className="flex rounded-xl border border-surface-6 bg-surface-2 p-1">
          <Button
            variant="ghost"
            onClick={() => setView("daily")}
            className={cn(
              "h-9 rounded-lg px-4 text-xs font-bold transition-all",
              view === "daily"
                ? "bg-white text-brand-primary shadow-sm"
                : "text-text-muted hover:text-text-primary",
            )}
          >
            Daily
          </Button>
          <Button
            variant="ghost"
            onClick={() => setView("weekly")}
            className={cn(
              "h-9 rounded-lg px-4 text-xs font-bold transition-all",
              view === "weekly"
                ? "bg-white text-brand-primary shadow-sm"
                : "text-text-muted hover:text-text-primary",
            )}
          >
            Weekly
          </Button>
        </div>
      </div>

      <div className="h-80 w-full">
        {data.length > 0 ? (
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
                className="text-[10px] font-bold uppercase tracking-wider text-text-muted"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={12}
                tickFormatter={(value) => `N${(value / 1000).toLocaleString()}k`}
                className="text-[10px] font-bold uppercase tracking-wider text-text-muted"
              />
              <ChartTooltip
                cursor={{
                  stroke: "var(--color-brand-primary)",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
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
        ) : (
          <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-surface-3 text-sm font-medium text-text-secondary">
            No recorded checkout activity yet.
          </div>
        )}
      </div>
    </section>
  )
}
