"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { IRevenueAnalytics } from "@/lib/types"
import { Download } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts"

type InteractiveChartProps = {
  revenueAnalytics?: IRevenueAnalytics | null
}

const formatAxisCurrency = (value: number, currency?: string) => {
  try {
    return new Intl.NumberFormat("en-NG", {
      notation: "compact",
      maximumFractionDigits: 1,
      style: currency ? "currency" : "decimal",
      currency,
    }).format(value)
  } catch {
    return new Intl.NumberFormat("en-NG", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value)
  }
}

const formatTooltipCurrency = (value: number, currency?: string) => {
  try {
    return new Intl.NumberFormat("en-NG", {
      style: currency ? "currency" : "decimal",
      currency,
      maximumFractionDigits: 2,
    }).format(value)
  } catch {
    return new Intl.NumberFormat("en-NG", {
      maximumFractionDigits: 2,
    }).format(value)
  }
}

const RevenueTooltip = ({
  active,
  payload,
  label,
  currency,
}: TooltipProps<number, string> & { currency?: string }) => {
  if (!active || !payload?.length) {
    return null
  }

  const revenue = payload.find((item) => item.dataKey === "value")?.value ?? 0
  const count = payload.find((item) => item.dataKey === "count")?.value ?? 0

  return (
    <div className="min-w-41 rounded-2xl bg-surface-dark px-4 py-3 text-xs text-surface-1 shadow-lg">
      <p className="mb-2 font-semibold tracking-[0.02em] text-surface-1/90">
        {label}
      </p>
      <div className="space-y-1.5 text-surface-1/90">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-brand-primary" />
            Revenue:
          </span>
          <span className="font-semibold">
            {formatTooltipCurrency(Number(revenue), currency)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-legal" />
            Transactions:
          </span>
          <span className="font-semibold">
            {Number(count).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

const InteractiveChart = ({ revenueAnalytics }: InteractiveChartProps) => {
  const chartData = revenueAnalytics?.time_series ?? []
  const currency = revenueAnalytics?.currency

  return (
    <Card className="rounded-3xl border border-brand-primary-dark/5 bg-surface-1 p-0 ring-0 shadow-sm">
      <div className="flex flex-col gap-5 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-lg leading-none font-bold text-text-primary">
              Revenue Analytics
            </h2>
            <p className="text-sm text-text-secondary">
              Revenue performance over time
            </p>
          </div>

          <Button
            variant="ghost"
            type="button"
            aria-label="Download revenue report"
            className="flex size-10 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-5 hover:text-text-primary focus-visible:outline-none"
          >
            <Download className="size-4" strokeWidth={3} />
          </Button>
        </div>

        <div className="h-72 w-full overflow-x-auto overflow-y-hidden">
          {chartData.length > 0 ? (
            <div className="h-full min-w-max sm:min-w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  barCategoryGap="70%"
                  barGap={8}
                  margin={{
                    top: 28,
                    right: 10,
                    left: 0,
                    bottom: 8,
                  }}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="var(--color-surface-2)"
                  />
                  <XAxis
                    axisLine={false}
                    dataKey="date"
                    tick={{
                      fill: "var(--color-text-muted)",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                    tickLine={false}
                    tickMargin={16}
                  />
                  <YAxis
                    axisLine={{ stroke: "var(--color-surface-2)" }}
                    tick={{
                      fill: "var(--color-text-muted)",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                    tickFormatter={(value) =>
                      formatAxisCurrency(Number(value), currency)
                    }
                    tickLine={false}
                    tickMargin={14}
                    width={58}
                  />
                  <Tooltip
                    content={<RevenueTooltip currency={currency} />}
                    cursor={{ fill: "transparent" }}
                  />
                  <Bar
                    dataKey="value"
                    fill="var(--color-brand-primary)"
                    maxBarSize={16}
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-surface-3 text-sm text-text-muted">
              No revenue data available yet.
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-6 border-t border-surface-2 pt-4 text-xs font-semibold text-text-secondary">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-xs bg-brand-primary" />
            Revenue
          </div>
        </div>
      </div>
    </Card>
  )
}

export default InteractiveChart
