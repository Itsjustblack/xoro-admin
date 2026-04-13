"use client"

import BalanceTransactionsTable from "@/components/balance/balance-transactions-table"
import MetricCard from "@/components/dashboard/metric-card"
import {
  transactionQueryKeys,
  walletQueryKeys,
} from "@/lib/api/v1/query-key-factory"
import { getMerchantTransactions } from "@/lib/api/v1/transaction/queries"
import {
  getAllWallets,
  getWalletBalanceSummary,
} from "@/lib/api/v1/wallet/queries"
import { PAGE_SIZE } from "@/lib/constants"
import {
  BalanceTransaction,
  MerchantTransactionsResponse,
  Wallet,
} from "@/lib/types"
import { formatCount, formatCurrency } from "@/lib/utils"
import { useAppliedBalanceFilters } from "@/store/balance-filter-store"
import { useCurrentMerchant, useCurrentMode } from "@/store/merchant"
import { useQuery } from "@tanstack/react-query"
import { Landmark } from "lucide-react"
import { useState } from "react"

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

const defaultCurrencyCardTheme: Omit<CurrencyCardItem, "title" | "value"> = {
  icon: CurrencyRefreshIcon,
  borderClassName: "border-slate-400",
  iconClassName: "text-slate-600",
  iconBgClassName: "bg-slate-100",
}

const currencyCardThemeMap: Record<
  string,
  Omit<CurrencyCardItem, "title" | "value">
> = {
  NGN: {
    icon: NairaIcon,
    borderClassName: "border-emerald-500",
    iconClassName: "text-status-success",
    iconBgClassName: "bg-status-success-soft",
  },
  USD: {
    icon: DollarIcon2,
    borderClassName: "border-blue-500",
    iconClassName: "text-blue-600",
    iconBgClassName: "bg-blue-50",
  },
  USDT: {
    icon: CurrencyRefreshIcon,
    borderClassName: "border-teal-500",
    iconClassName: "text-teal-600",
    iconBgClassName: "bg-teal-50",
  },
  BTC: {
    icon: BitcoinIcon2,
    borderClassName: "border-orange-500",
    iconClassName: "text-orange-500",
    iconBgClassName: "bg-orange-50",
  },
  EUR: {
    icon: EuroIcon2,
    borderClassName: "border-indigo-500",
    iconClassName: "text-indigo-600",
    iconBgClassName: "bg-indigo-50",
  },
}

function buildCurrencyCard(wallet: Wallet): CurrencyCardItem {
  const theme =
    currencyCardThemeMap[wallet.currency] ?? defaultCurrencyCardTheme

  return {
    title: wallet.currency,
    value: formatCurrency(wallet.balance, wallet.currency),
    ...theme,
  }
}

const BalanceContent = () => {
  const merchant = useCurrentMerchant()
  const mode = useCurrentMode()
  const appliedFilters = useAppliedBalanceFilters()
  const [transactionPagination, setTransactionPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  })

  const serverCurrencyFilter =
    appliedFilters.currency.length === 1
      ? appliedFilters.currency[0]
      : undefined

  const { data: walletSummary } = useQuery({
    queryKey: walletQueryKeys.summary(merchant?.id ?? "", mode),
    queryFn: () => getWalletBalanceSummary(merchant!.id, mode),
    enabled: !!merchant?.id,
  })

  const { data: wallets } = useQuery({
    queryKey: walletQueryKeys.list(merchant?.id ?? "", mode),
    queryFn: () => getAllWallets(merchant!.id, mode),
    enabled: !!merchant?.id,
  })

  const {
    data: merchantTransactions,
    isPending: isTransactionsPending,
  } =
    useQuery({
      queryKey: transactionQueryKeys.merchantTransactions(
        merchant?.id ?? "",
        mode,
        transactionPagination.pageIndex + 1,
        transactionPagination.pageSize,
        null,
        serverCurrencyFilter,
        null,
      ),
      queryFn: () =>
        getMerchantTransactions({
          merchant_id: merchant!.id,
          mode,
          page: transactionPagination.pageIndex + 1,
          page_size: transactionPagination.pageSize,
          currency: serverCurrencyFilter,
        }),
      enabled: !!merchant?.id,
    })

  const currencyCards = wallets?.map(buildCurrencyCard) ?? []
  const transactionsResponse = merchantTransactions as
    | MerchantTransactionsResponse
    | undefined
  const balanceTransactions: BalanceTransaction[] = Array.isArray(
    transactionsResponse?.data,
  )
    ? (transactionsResponse.data as BalanceTransaction[])
    : ((transactionsResponse?.transactions ??
        transactionsResponse?.items ??
        transactionsResponse?.results ??
        []) as BalanceTransaction[])

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-300 flex-col gap-8">
        <div>
          <h1 className="text-2xl font-black text-text-primary sm:text-3xl">
            Balance
          </h1>
          <p className="mt-1 max-w-2xl text-base font-medium text-text-secondary">
            Manage your funds, monitor settlements, and initiate payouts.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="AVAILABLE BALANCE"
            value={formatCurrency(walletSummary?.total_balance ?? 0)}
            change={formatCount(currencyCards.length)}
            changeLabel="from last month"
            icon={<Landmark className="size-5" />}
            iconClassName="text-brand-primary-dark"
            changeClassName="text-green-500"
            borderClassName="border-brand-primary-dark"
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
          <BalanceTransactionsTable
            data={balanceTransactions}
            isPending={isTransactionsPending}
            pageCount={1}
            totalCount={balanceTransactions.length}
            hasKnownPageCount={true}
            pagination={transactionPagination}
            setPagination={setTransactionPagination}
          />
        </div>
      </div>
    </section>
  )
}

export default BalanceContent
