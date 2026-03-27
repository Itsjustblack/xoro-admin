"use client"

import { useMemo, useState } from "react"

import BalanceTransactionsTable from "@/components/balance/balance-transactions-table"
import { useBalanceFilterStore } from "@/components/balance/balance-filter-store"
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
  MerchantTransactionRecord,
  MerchantTransactionsPayload,
  MerchantTransactionsResponse,
  MerchantTransactionType,
  Wallet,
} from "@/lib/types"
import { formatCount, formatCurrency } from "@/lib/utils"
import { useCurrentMerchant, useCurrentMode } from "@/store/merchant"
import { useQuery } from "@tanstack/react-query"
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

const apiTransactionTypeToBalanceType: Record<
  MerchantTransactionType,
  BalanceTransaction["type"]
> = {
  credit: "Sales Income",
  debit: "Payout",
}

const fallbackStatusMap: Record<string, BalanceTransaction["status"]> = {
  success: "Completed",
  completed: "Completed",
  pending: "Pending",
  failed: "Failed",
  partial: "Partial",
}

function buildCurrencyCard(wallet: Wallet): CurrencyCardItem {
  const theme = currencyCardThemeMap[wallet.currency] ?? defaultCurrencyCardTheme

  return {
    title: wallet.currency,
    value: formatCurrency(wallet.balance, wallet.currency),
    ...theme,
  }
}

function getTransactionContainer(
  response: MerchantTransactionsResponse | undefined,
): MerchantTransactionsResponse | MerchantTransactionsPayload | undefined {
  if (!response) return undefined

  if (Array.isArray(response.data)) {
    return response
  }

  if (response.data && typeof response.data === "object") {
    return response.data
  }

  return response
}

function getTransactionRows(
  response: MerchantTransactionsResponse | undefined,
): MerchantTransactionRecord[] {
  const container = getTransactionContainer(response)

  if (!container) return []

  if (Array.isArray(response?.data)) {
    return response.data
  }

  return (
    container.transactions ??
    container.items ??
    container.results ??
    (Array.isArray(container.data) ? container.data : undefined) ??
    []
  )
}

function getStringValue(
  record: MerchantTransactionRecord,
  keys: (keyof MerchantTransactionRecord)[],
) {
  for (const key of keys) {
    const value = record[key]
    if (typeof value === "string" && value.trim()) {
      return value
    }
  }

  return undefined
}

function formatTransactionDate(value?: string | null) {
  if (!value) return "-"

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed)
}

function normalizeTransactionType(
  record: MerchantTransactionRecord,
): BalanceTransaction["type"] {
  const rawLabel = getStringValue(record, ["type", "description", "narration"])
  const label = rawLabel?.toLowerCase() ?? ""

  if (label.includes("refund")) return "Refund"
  if (label.includes("top-up") || label.includes("top up")) return "Top-up"
  if (label.includes("sales") || label.includes("income")) return "Sales Income"
  if (label.includes("payout") || label.includes("withdraw")) return "Payout"

  const transactionType = record.transaction_type
  return transactionType
    ? apiTransactionTypeToBalanceType[transactionType]
    : "Sales Income"
}

function normalizeTransactionStatus(
  status?: string | null,
): BalanceTransaction["status"] {
  const normalized = status?.trim().toLowerCase()
  if (!normalized) return "Pending"

  return fallbackStatusMap[normalized] ?? status ?? "Pending"
}

function normalizePaymentMethod(
  record: MerchantTransactionRecord,
): BalanceTransaction["paymentMethod"] {
  const method = getStringValue(record, ["payment_method", "paymentMethod"])
  return method ?? "Transfer"
}

function normalizeAmount(record: MerchantTransactionRecord) {
  const currency = getStringValue(record, ["currency"]) ?? "NGN"
  const rawAmount = record.amount
  const parsedAmount =
    typeof rawAmount === "number"
      ? rawAmount
      : typeof rawAmount === "string"
        ? Number.parseFloat(rawAmount)
        : 0

  const signedAmount =
    record.transaction_type === "debit"
      ? -Math.abs(parsedAmount)
      : Math.abs(parsedAmount)

  return {
    amount: formatCurrency(Number.isNaN(signedAmount) ? 0 : signedAmount, currency),
    currency,
  }
}

function normalizeBalanceTransaction(
  record: MerchantTransactionRecord,
): BalanceTransaction {
  const { amount, currency } = normalizeAmount(record)

  return {
    id: String(record.id),
    type: normalizeTransactionType(record),
    reference:
      getStringValue(record, [
        "reference",
        "tx_ref",
        "transaction_reference",
      ]) ?? `TX-${record.id}`,
    amount,
    currency,
    paymentMethod: normalizePaymentMethod(record),
    status: normalizeTransactionStatus(record.status),
    date: formatTransactionDate(
      getStringValue(record, ["created_at", "createdAt", "date"]),
    ),
  }
}

function getTransactionPageMeta(
  response: MerchantTransactionsResponse | undefined,
  pageSize: number,
  rowCount: number,
) {
  const container = getTransactionContainer(response)
  const currentPage = container?.current_page ?? container?.page ?? 1
  const resolvedPageSize = container?.page_size ?? container?.per_page ?? pageSize
  const totalCount =
    container?.total_count ??
    container?.total ??
    container?.count ??
    (currentPage - 1) * resolvedPageSize + rowCount
  const explicitPageCount =
    container?.total_pages ??
    container?.last_page ??
    (typeof totalCount === "number" && resolvedPageSize > 0
      ? Math.ceil(totalCount / resolvedPageSize)
      : undefined)

  return {
    totalCount,
    pageCount:
      explicitPageCount ??
      Math.max(currentPage + (rowCount >= resolvedPageSize ? 1 : 0), 1),
    hasKnownPageCount: explicitPageCount !== undefined,
  }
}

const BalanceContent = () => {
  const merchant = useCurrentMerchant()
  const mode = useCurrentMode()
  const appliedFilters = useBalanceFilterStore((state) => state.appliedFilters)
  const [transactionPagination, setTransactionPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  })

  const serverCurrencyFilter =
    appliedFilters.currency.length === 1 ? appliedFilters.currency[0] : undefined

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

  const { data: merchantTransactions, isPending: isTransactionsPending } =
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
  const balanceTransactions = useMemo(
    () => getTransactionRows(merchantTransactions).map(normalizeBalanceTransaction),
    [merchantTransactions],
  )
  const transactionMeta = useMemo(
    () =>
      getTransactionPageMeta(
        merchantTransactions,
        transactionPagination.pageSize,
        balanceTransactions.length,
      ),
    [balanceTransactions.length, merchantTransactions, transactionPagination.pageSize],
  )

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
            value={formatCurrency(walletSummary?.total_balance ?? 0)}
            change={formatCount(currencyCards.length)}
            changeLabel="wallets"
            icon={<Landmark className="size-5" />}
            iconClassName="text-brand-primary-dark"
            changeClassName="text-text-primary"
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
            pageCount={transactionMeta.pageCount}
            totalCount={transactionMeta.totalCount}
            hasKnownPageCount={transactionMeta.hasKnownPageCount}
            pagination={transactionPagination}
            setPagination={setTransactionPagination}
          />
        </div>
      </div>
    </section>
  )
}

export default BalanceContent
