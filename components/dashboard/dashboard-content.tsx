import InteractiveChart from "@/components/dashboard/interactive-chart";
import MetricCard from "@/components/dashboard/metric-card";
import { BadgeCheck } from "@/components/icons";
import { ArrowRightLeft, CornerUpLeft, TrendingUp } from "lucide-react";

const metricCards = [
  {
    title: "Total Revenue",
    value: "$128,430.00",
    change: "+12.5%",
    changeLabel: "vs last month",
    icon: <TrendingUp className="size-4" />,
    iconClassName: "text-success-4",
    changeClassName: "text-success-4",
    sparklineClassName: "text-success-4",
    sparklineValues: [16, 18, 17, 23, 21, 28, 34],
  },
  {
    title: "Monthly\nTransactions",
    value: "1,240",
    change: "+5.2%",
    changeLabel: "vs last month",
    icon: <ArrowRightLeft className="size-4" />,
    iconClassName: "text-brand-primary",
    changeClassName: "text-success-4",
    sparklineClassName: "text-brand-primary",
    sparklineValues: [18, 18, 20, 16, 21, 28, 12, 30, 8],
  },
  {
    title: "Successful\nPayments",
    value: "98.2%",
    change: "+0.8%",
    changeLabel: "vs last month",
    icon: <BadgeCheck className="size-4" />,
    iconClassName: "text-success-4",
    changeClassName: "text-success-4",
    sparklineClassName: "text-success-4",
    sparklineValues: [10, 11, 12, 12, 12, 12, 12, 12],
  },
  {
    title: "Refund Volume",
    value: "0.4%",
    change: "-2.1%",
    changeLabel: "vs last month",
    icon: <CornerUpLeft className="size-4" />,
    iconClassName: "text-warning-5",
    changeClassName: "text-warning-5",
    sparklineClassName: "text-warning-5",
    sparklineValues: [24, 22, 20, 18, 17, 15, 14, 24, 16],
  },
];

const DashboardContent = () => {
  return (
    <section className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-300 flex-col gap-8">
        <div>
          <h1 className="text-3xl font-black text-text-primary sm:text-2xl">
            Dashboard
          </h1>
          <p className="max-w-2xl text-sm text-text-secondary sm:text-base">
            Welcome back! Here&apos;s what&apos;s happening with your business
            today.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {metricCards.map((card) => (
            <MetricCard
              key={card.title}
              change={card.change}
              changeClassName={card.changeClassName}
              changeLabel={card.changeLabel}
              icon={card.icon}
              iconClassName={card.iconClassName}
              sparklineClassName={card.sparklineClassName}
              sparklineValues={card.sparklineValues}
              title={card.title}
              value={card.value}
            />
          ))}
        </div>

        <InteractiveChart />
      </div>
    </section>
  );
};

export default DashboardContent;
