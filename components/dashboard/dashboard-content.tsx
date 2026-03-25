import InteractiveChart from "@/components/dashboard/interactive-chart";
import MetricCard from "@/components/dashboard/metric-card";
import TransactionsTable from "@/components/dashboard/transactions-table";
import { BadgeCheck } from "@/components/icons";
import type { IDashboardAnalytics, IRevenueAnalytics } from "@/lib/types";
import { ArrowRightLeft, CornerUpLeft, TrendingUp } from "lucide-react";

const formatCurrency = (value: number, currency?: string) => {
  try {
    return new Intl.NumberFormat("en-NG", {
      style: currency ? "currency" : "decimal",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return new Intl.NumberFormat("en-NG", {
      maximumFractionDigits: 2,
    }).format(value);
  }
};

const formatCount = (value: number) => new Intl.NumberFormat().format(value);

const formatPercent = (value: number) => `${value.toFixed(1)}%`;

type DashboardContentProps = {
  dashboardAnalytics?: IDashboardAnalytics | null;
  revenueAnalytics?: IRevenueAnalytics | null;
};

const DashboardContent = ({
  dashboardAnalytics,
  revenueAnalytics,
}: DashboardContentProps) => {
  const revenueMetrics = dashboardAnalytics?.revenue_metrics;
  const transactionBreakdown = dashboardAnalytics?.transaction_breakdown;
  const revenueSeries = revenueAnalytics?.time_series.map((point) => point.value) ?? [];
  const transactionSeries =
    revenueAnalytics?.time_series.map((point) => point.count) ?? [];
  const currency =
    revenueAnalytics?.currency ?? dashboardAnalytics?.top_currency.currency;

  const metricCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(revenueMetrics?.total_revenue ?? 0, currency),
      change: formatCurrency(revenueMetrics?.net_revenue ?? 0, currency),
      changeLabel: "net revenue",
      icon: <TrendingUp className="size-4" />,
      iconClassName: "text-success-4",
      changeClassName: "text-success-4",
      borderClassName: "border-success-4",
      sparklineClassName: "text-success-4",
      sparklineValues: revenueSeries,
    },
    {
      title: "Transactions",
      value: formatCount(revenueMetrics?.total_transactions ?? 0),
      change: formatCurrency(
        revenueMetrics?.average_transaction_value ?? 0,
        currency,
      ),
      changeLabel: "avg transaction",
      icon: <ArrowRightLeft className="size-4" />,
      iconClassName: "text-brand-primary",
      changeClassName: "text-success-4",
      borderClassName: "border-brand-primary",
      sparklineClassName: "text-brand-primary",
      sparklineValues: transactionSeries,
    },
    {
      title: "Successful\nPayments",
      value: formatPercent(revenueMetrics?.success_rate ?? 0),
      change: formatCount(transactionBreakdown?.successful ?? 0),
      changeLabel: "successful transactions",
      icon: <BadgeCheck className="size-4" />,
      iconClassName: "text-success-4",
      changeClassName: "text-success-4",
      borderClassName: "border-success-4",
    },
    {
      title: "Pending\nPayouts",
      value: formatCount(dashboardAnalytics?.pending_payouts ?? 0),
      change: formatCurrency(
        dashboardAnalytics?.pending_payout_amount ?? 0,
        currency,
      ),
      changeLabel: "awaiting settlement",
      icon: <CornerUpLeft className="size-4" />,
      iconClassName: "text-warning-5",
      changeClassName: "text-warning-5",
      borderClassName: "border-warning-5",
    },
  ];

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
              change={card.change}
              changeClassName={card.changeClassName}
              changeLabel={card.changeLabel}
              icon={card.icon}
              iconClassName={card.iconClassName}
              borderClassName={card.borderClassName}
              sparklineClassName={card.sparklineClassName}
              sparklineValues={card.sparklineValues}
              title={card.title}
              value={card.value}
            />
          ))}
        </div>

        <InteractiveChart revenueAnalytics={revenueAnalytics} />
        <TransactionsTable />
      </div>
    </section>
  );
};

export default DashboardContent;
