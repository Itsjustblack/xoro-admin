import BalanceTransactionsTable from "@/components/balance/balance-transactions-table";
import MetricCard from "@/components/dashboard/metric-card";
import { mockBalanceTransactions } from "@/lib/mock-data";
import {
  Banknote,
  Bitcoin,
  Coins,
  DollarSign,
  Euro,
  Landmark,
  type LucideIcon,
} from "lucide-react";

type CurrencyCard = {
  title: string;
  value: string;
  icon: LucideIcon;
  borderClassName: string;
  iconClassName: string;
};

const currencyCards: CurrencyCard[] = [
  {
    title: "NGN",
    value: "2.14M",
    icon: Banknote,
    borderClassName: "border-emerald-500",
    iconClassName: "text-emerald-600",
  },
  {
    title: "USD",
    value: "245.00",
    icon: DollarSign,
    borderClassName: "border-blue-500",
    iconClassName: "text-blue-600",
  },
  {
    title: "USDT",
    value: "1,420.00",
    icon: Coins,
    borderClassName: "border-teal-500",
    iconClassName: "text-teal-600",
  },
  {
    title: "BTC",
    value: "0.024",
    icon: Bitcoin,
    borderClassName: "border-orange-500",
    iconClassName: "text-orange-500",
  },
  {
    title: "EUR",
    value: "150.00",
    icon: Euro,
    borderClassName: "border-indigo-500",
    iconClassName: "text-indigo-600",
  },
];

const BalanceContent = () => {
  return (
    <section className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-300 flex-col gap-8">
        <div>
          <h1 className="text-2xl font-black text-text-primary sm:text-3xl">
            Balance
          </h1>
          <p className="mt-2 max-w-2xl text-base text-text-secondary">
            Manage your funds, monitor settlements, and initiate payouts.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="AVAILABLE BALANCE"
            value="$12,450.00"
            change="+12%"
            changeLabel="from last month"
            icon={<Landmark className="size-5" />}
            iconClassName="text-brand-primary-dark"
            changeClassName="text-success-4"
            borderClassName="border-brand-primary-dark"
            sparklineValues={[]}
          />

          {currencyCards.map((card) => {
            const Icon = card.icon;

            return (
              <MetricCard
                key={card.title}
                title={card.title}
                value={card.value}
                change=""
                changeLabel=""
                icon={<Icon className="size-5" />}
                iconClassName={card.iconClassName}
                changeClassName=""
                borderClassName={card.borderClassName}
                sparklineValues={[]}
              />
            );
          })}
        </div>

        <div className="mt-4">
          <BalanceTransactionsTable data={mockBalanceTransactions} />
        </div>
      </div>
    </section>
  );
};

export default BalanceContent;
