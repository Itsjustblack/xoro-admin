"use client"

import InteractiveChart from "@/components/dashboard/interactive-chart"
import MetricCard from "@/components/dashboard/metric-card"
import TransactionsTable from "@/components/dashboard/transactions-table"
import { BadgeCheck } from "@/components/icons"
import {
  getDashboardAnalytics,
  getRevenueAnalytics,
} from "@/lib/api/v1/analytics/queries"
import { analyticsQueryKeys } from "@/lib/api/v1/query-key-factory"
import { formatCount, formatCurrency, formatPercent } from "@/lib/utils"
import { useCurrentMerchant, useCurrentMode } from "@/store/merchant"
import { useQuery } from "@tanstack/react-query"
import { ArrowRightLeft, CornerUpLeft, TrendingUp } from "lucide-react"

const DashboardContent = () => {
  const merchant = useCurrentMerchant()
  const mode = useCurrentMode()

  const { data: dashboardAnalytics, isPending: isDashboardAnalyticsPending } = useQuery({
    queryKey: analyticsQueryKeys.dashboard(merchant?.id ?? "", mode),
    queryFn: () => getDashboardAnalytics(merchant!.id, mode),
    enabled: !!merchant?.id,
  })

  const { data: revenueAnalytics, isPending: isRevenueAnalyticsPending } = useQuery({
    queryKey: analyticsQueryKeys.revenue(merchant?.id ?? "", mode),
    queryFn: () => getRevenueAnalytics(merchant!.id, mode),
    enabled: !!merchant?.id,
  })

  const isLoading = isDashboardAnalyticsPending || isRevenueAnalyticsPending

  const revenueMetrics = dashboardAnalytics?.revenue_metrics
  const transactionBreakdown = dashboardAnalytics?.transaction_breakdown
  const revenueSeries =
    revenueAnalytics?.time_series.map((point) => point.value) ?? []
  const transactionSeries =
    revenueAnalytics?.time_series.map((point) => point.count) ?? []
  const currency =
    revenueAnalytics?.currency ?? dashboardAnalytics?.top_currency?.currency

  const metricCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(revenueMetrics?.total_revenue ?? 0, currency),
      change: formatCurrency(revenueMetrics?.net_revenue ?? 0, currency),
      changeLabel: "vs last month",
      icon: <TrendingUp className="size-4" />,
      iconClassName: "text-brand-primary-dark",
      changeClassName: "text-success-4",
      borderClassName: "border-brand-primary-dark",
      sparklineClassName: "text-brand-primary-dark",
      sparklineValues: revenueSeries,
    },
    {
      title: "Monthly Transactions",
      value: formatCount(revenueMetrics?.total_transactions ?? 0),
      change: formatCurrency(
        revenueMetrics?.average_transaction_value ?? 0,
        currency,
      ),
      changeLabel: "vs last month",
      icon: <ArrowRightLeft className="size-4" />,
      iconClassName: "text-brand-primary",
      changeClassName: "text-success-4",
      borderClassName: "border-brand-primary",
      sparklineClassName: "text-brand-primary",
      sparklineValues: transactionSeries,
    },
    {
      title: "Successful Payments",
      value: formatPercent(revenueMetrics?.success_rate ?? 0),
      change: formatCount(transactionBreakdown?.successful ?? 0),
      changeLabel: "vs last month",
      icon: <BadgeCheck className="size-4" />,
      iconClassName: "text-success-4",
      changeClassName: "text-success-4",
      borderClassName: "border-legal",
    },
    {
      title: "Refund Volume",
      value: formatCount(dashboardAnalytics?.pending_payouts ?? 0),
      change: formatCurrency(
        dashboardAnalytics?.pending_payout_amount ?? 0,
        currency,
      ),
      changeLabel: "vs last month",
      icon: <CornerUpLeft className="size-4" />,
      iconClassName: "text-warning-5",
      changeClassName: "text-warning-5",
      borderClassName: "border-warning-5",
    },
  ]

  return (
    <section className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-300 flex-col gap-8">
        <div>
          <h1 className="text-2xl font-black text-text-primary sm:text-3xl">
            Dashboard
          </h1>
          <p className="max-w-2xl text-base text-text-secondary">
            Welcome back! Here&apos;s what&apos;s happening with your business
            today.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {metricCards.map((card) => (
            <MetricCard
              key={card.title}
              isLoading={isLoading}
              change={card.change}
              changeClassName={card.changeClassName}
              changeLabel={card.changeLabel}
              icon={card.icon}
              iconClassName={card.iconClassName}
              borderClassName={card.borderClassName}
              title={card.title}
              value={card.value}
            />
          ))}
        </div>

        <InteractiveChart isLoading={isLoading} revenueAnalytics={revenueAnalytics} />
        <TransactionsTable />
      </div>
    </section>
  )
}

export default DashboardContent
