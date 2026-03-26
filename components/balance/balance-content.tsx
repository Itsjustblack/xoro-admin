import BalanceTransactionsTable from "@/components/balance/balance-transactions-table"
import MetricCard from "@/components/dashboard/metric-card"
import { mockBalanceTransactions } from "@/lib/mock-data"
import { Landmark } from "lucide-react"
import {
  BitcoinIcon2,
  CurrencyRefreshIcon,
  DollarIcon2,
  EuroIcon2,
  IconComponent,
  NairaIcon,
} from "../icons"
import CurrencyCard from "./currency-card"

type CurrencyCardItem = {
  title: string
  value: string
  icon: IconComponent
  borderClassName: string
  iconClassName: string
  iconBgClassName: string
}

const currencyCards: CurrencyCardItem[] = [
  {
    title: "NGN",
    value: "2.14M",
    icon: NairaIcon,
    borderClassName: "border-emerald-500",
    iconClassName: "text-emerald-600",
    iconBgClassName: "bg-emerald-50",
  },
  {
    title: "USD",
    value: "245.00",
    icon: DollarIcon2,
    borderClassName: "border-blue-500",
    iconClassName: "text-blue-600",
    iconBgClassName: "bg-blue-50",
  },
  {
    title: "USDT",
    value: "1,420.00",
    icon: CurrencyRefreshIcon,
    borderClassName: "border-teal-500",
    iconClassName: "text-teal-600",
    iconBgClassName: "bg-teal-50",
  },
  {
    title: "BTC",
    value: "0.024",
    icon: BitcoinIcon2,
    borderClassName: "border-orange-500",
    iconClassName: "text-orange-500",
    iconBgClassName: "bg-orange-50",
  },
  {
    title: "EUR",
    value: "150.00",
    icon: EuroIcon2,
    borderClassName: "border-indigo-500",
    iconClassName: "text-indigo-600",
    iconBgClassName: "bg-indigo-50",
  },
]

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
            const Icon = card.icon

            return (
              <CurrencyCard
                key={card.title}
                title={card.title}
                value={card.value}
                icon={<Icon className="size-6" />}
                iconClassName={card.iconClassName}
                iconBgClassName={card.iconBgClassName}
                borderClassName={card.borderClassName}
              />
            )
          })}
        </div>

        <div className="mt-4">
          <BalanceTransactionsTable data={mockBalanceTransactions} />
        </div>
      </div>
    </section>
  )
}

export default BalanceContent
