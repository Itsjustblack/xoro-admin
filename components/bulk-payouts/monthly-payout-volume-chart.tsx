"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { MonthlyPayoutPoint } from "@/lib/types"
import { formatChartDate } from "@/lib/utils"
import { MoreVertical } from "lucide-react"
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

type MonthlyPayoutVolumeChartProps = {
  data: MonthlyPayoutPoint[]
}

const formatAxisCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

const formatTooltipCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value)
}

const PayoutTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (!active || !payload?.length) {
    return null
  }

  const volume = payload.find((item) => item.dataKey === "value")?.value ?? 0
  const count =
    payload.find((item) => item.dataKey === "payoutCount")?.value ?? 0

  return (
    <div className="relative min-w-36 rounded-2xl border border-surface-3 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
          MONTH: {formatChartDate(label)}
        </span>
        <div className="flex flex-col gap-0.5 ring-offset-0">
          <span className="text-xs font-bold text-text-primary">Volume:</span>
          <span className="text-sm font-bold leading-none tracking-tight text-text-primary">
            {formatTooltipCurrency(Number(volume))}
          </span>
        </div>
        <span className="text-xs font-medium text-text-secondary mt-0.5">
          {Number(count).toLocaleString()} payouts
        </span>
      </div>
      <div className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-surface-3 bg-white" />
    </div>
  )
}

export default function MonthlyPayoutVolumeChart({
  data,
}: MonthlyPayoutVolumeChartProps) {
  return (
    <Card className="rounded-2xl border border-surface-6 bg-surface-1 p-0 shadow-sm ring-0">
      <div className="flex flex-col gap-5 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-bold leading-none text-text-primary">
              Monthly Payout Volume
            </h2>
            <p className="text-sm text-text-secondary">
              Track your total bulk payouts volume per month
            </p>
          </div>

          <div className="flex items-center gap-1">
            <Select defaultValue="this-year">
              <SelectTrigger className="h-9 gap-2 rounded-full border border-surface-3 bg-surface-2 px-2 shadow-none hover:bg-surface-3 focus:ring-0">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-year">This Year</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-text-muted hover:bg-surface-2 hover:text-text-primary"
            >
              <MoreVertical className="size-5" />
            </Button>
          </div>
        </div>

        <div className="h-79 w-full overflow-x-auto overflow-y-hidden">
          {data.length > 0 ? (
            <div className="h-full min-w-max sm:min-w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  barCategoryGap="20%"
                  barGap={8}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    stroke="var(--color-surface-2)"
                  />
                  <XAxis
                    axisLine={false}
                    dataKey="month"
                    tick={{
                      fill: "var(--color-text-muted)",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                    tickFormatter={(value) => formatChartDate(value)}
                    tickLine={false}
                    tickMargin={12}
                  />
                  <YAxis
                    axisLine={false}
                    tick={{
                      fill: "var(--color-text-muted)",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                    tickFormatter={(value) => formatAxisCurrency(value)}
                    tickLine={false}
                    width={50}
                  />
                  <Tooltip
                    content={<PayoutTooltip />}
                    cursor={{ fill: "transparent" }}
                  />
                  <Bar
                    dataKey="value"
                    fill="var(--color-brand-primary)"
                    radius={[4, 4, 4, 4]}
                    maxBarSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-medium text-text-muted">
              No data available for the selected period
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
