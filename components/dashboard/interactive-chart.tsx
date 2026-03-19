"use client";

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";
import { Button } from "../ui/button";

const revenueData = {
  "this-year": [
    { month: "JAN", grossSales: 0, netProfit: 0 },
    { month: "FEB", grossSales: 0, netProfit: 0 },
    { month: "MAR", grossSales: 520000, netProfit: 150000 },
    { month: "APR", grossSales: 0, netProfit: 0 },
    { month: "MAY", grossSales: 0, netProfit: 0 },
    { month: "JUN", grossSales: 0, netProfit: 0 },
    { month: "JUL", grossSales: 0, netProfit: 0 },
    { month: "AUG", grossSales: 0, netProfit: 0 },
    { month: "SEP", grossSales: 0, netProfit: 0 },
    { month: "OCT", grossSales: 0, netProfit: 0 },
    { month: "NOV", grossSales: 0, netProfit: 0 },
    { month: "DEC", grossSales: 380000, netProfit: 160000 },
  ],
  "last-year": [
    { month: "JAN", grossSales: 0, netProfit: 0 },
    { month: "FEB", grossSales: 0, netProfit: 0 },
    { month: "MAR", grossSales: 180000, netProfit: 120000 },
    { month: "APR", grossSales: 0, netProfit: 0 },
    { month: "MAY", grossSales: 0, netProfit: 0 },
    { month: "JUN", grossSales: 0, netProfit: 0 },
    { month: "JUL", grossSales: 0, netProfit: 0 },
    { month: "AUG", grossSales: 0, netProfit: 0 },
    { month: "SEP", grossSales: 0, netProfit: 0 },
    { month: "OCT", grossSales: 0, netProfit: 0 },
    { month: "NOV", grossSales: 0, netProfit: 0 },
    { month: "DEC", grossSales: 310000, netProfit: 140000 },
  ],
};

const formatAxisCurrency = (value: number) => {
  if (value >= 1000000) {
    return `₦${value / 1000000}M`;
  }

  if (value === 0) {
    return "₦0";
  }

  return `₦${value / 1000}k`;
};

const formatTooltipCurrency = (value: number) => {
  return `₦${value.toLocaleString()}`;
};

const monthFullNames: Record<string, string> = {
  JAN: "January",
  FEB: "February",
  MAR: "March",
  APR: "April",
  MAY: "May",
  JUN: "June",
  JUL: "July",
  AUG: "August",
  SEP: "September",
  OCT: "October",
  NOV: "November",
  DEC: "December",
};

const RevenueTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (!active || !payload?.length) {
    return null;
  }

  const grossSales =
    payload.find((item) => item.dataKey === "grossSales")?.value ?? 0;
  const netProfit =
    payload.find((item) => item.dataKey === "netProfit")?.value ?? 0;

  const fullMonthName = monthFullNames[label as string] || label;

  return (
    <div className="min-w-41 rounded-2xl bg-surface-dark px-4 py-3 text-xs text-surface-1 shadow-lg">
      <p className="mb-2 font-semibold tracking-[0.02em] text-surface-1/90">
        {fullMonthName}
      </p>
      <div className="space-y-1.5 text-surface-1/90">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-brand-primary" />
            Gross:
          </span>
          <span className="font-semibold">
            {formatTooltipCurrency(Number(grossSales))}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-legal" />
            Net:
          </span>
          <span className="font-semibold">
            {formatTooltipCurrency(Number(netProfit))}
          </span>
        </div>
      </div>
    </div>
  );
};

const InteractiveChart = () => {
  const [timeRange, setTimeRange] =
    useState<keyof typeof revenueData>("this-year");

  return (
    <Card className="rounded-3xl border border-brand-primary-dark/5 bg-surface-1 p-0 ring-0 shadow-sm">
      <div className="flex flex-col gap-5 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-lg leading-none font-bold text-text-primary">
              Revenue Analytics
            </h2>
            <p className="text-sm text-text-secondary">
              Gross sales vs net profit performance
            </p>
          </div>

          <div className="flex items-center gap-3 self-start">
            <Select
              value={timeRange}
              onValueChange={(value) =>
                setTimeRange(value as keyof typeof revenueData)
              }
            >
              <SelectTrigger className="h-8 rounded-full border-0 bg-surface-5 px-3 text-xs font-semibold text-text-muted-3 shadow-none focus-visible:ring-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-year">This Year</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              type="button"
              aria-label="Download revenue report"
              className="flex size-10 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-5 hover:text-text-primary focus-visible:outline-none"
            >
              <Download className="size-4" strokeWidth={3} />
            </Button>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenueData[timeRange]}
              barCategoryGap="70%"
              barGap={8}
              margin={{
                top: 28,
                right: 10,
                left: 0,
                bottom: 8,
              }}
            >
              <CartesianGrid vertical={false} stroke="var(--color-surface-2)" />
              <XAxis
                axisLine={false}
                dataKey="month"
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
                domain={[0, 1000000]}
                tick={{
                  fill: "var(--color-text-muted)",
                  fontSize: 12,
                  fontWeight: 600,
                }}
                tickFormatter={formatAxisCurrency}
                tickLine={false}
                tickMargin={14}
                ticks={[0, 250000, 500000, 750000, 1000000]}
                width={58}
              />
              <Tooltip
                content={<RevenueTooltip />}
                cursor={{ fill: "transparent" }}
              />
              <Bar
                dataKey="grossSales"
                fill="var(--color-brand-primary)"
                maxBarSize={12}
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="netProfit"
                fill="var(--color-legal)"
                maxBarSize={12}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap items-center gap-6 border-t border-surface-2 pt-4 text-xs font-semibold text-text-secondary">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-xs bg-brand-primary" />
            Gross Sales
          </div>
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-xs bg-legal" />
            Net Profit
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InteractiveChart;
