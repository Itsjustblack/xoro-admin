"use client"

import MetricCard from "@/components/dashboard/metric-card"
import { PayInsTable } from "@/components/pay-ins/pay-ins-table"
import { getMerchantTransactions } from "@/lib/api/v1/transaction/queries"
import { transactionQueryKeys } from "@/lib/api/v1/query-key-factory"
import { PAGE_SIZE } from "@/lib/constants"
import type {
  ITransaction,
  PayInTransaction,
  PaymentChannel,
} from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { useCurrentMerchant, useCurrentMode } from "@/store/merchant"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Download } from "lucide-react"
import { useMemo, useState } from "react"

const TABS = ["All", "Card", "Transfer", "Crypto"] as const

const statusLabelMap: Record<string, PayInTransaction["status"]> = {
  success: "Success",
  completed: "Success",
  pending: "Pending",
  processing: "Pending",
  failed: "Failed",
}

const methodLabelMap: Partial<
  Record<PaymentChannel, PayInTransaction["method"]>
> = {
  card: "Card",
  transfer: "Transfer",
  bank: "Transfer",
  crypto: "Crypto",
}

export function PayInsContent() {
  const [activeTab, setActiveTab] = useState<string>("All")
  const merchant = useCurrentMerchant()
  const mode = useCurrentMode()
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  })

  const { data: transactionResponse, isPending } = useQuery({
    queryKey: transactionQueryKeys.merchantPayIns(
      merchant?.id ?? "",
      mode,
      pagination.pageIndex + 1,
      pagination.pageSize,
      null,
    ),
    queryFn: () =>
      getMerchantTransactions({
        merchant_id: merchant!.id,
        mode,
        page: pagination.pageIndex + 1,
        page_size: pagination.pageSize,
        transaction_type: "credit",
      }),
    enabled: !!merchant?.id,
  })

  const transactions = useMemo(
    () => transactionResponse?.transactions ?? [],
    [transactionResponse?.transactions],
  )

  const tableData = useMemo<PayInTransaction[]>(() => {
    return transactions.map((transaction: ITransaction) => {
      const amount = Number(transaction.amount)
      const channel = (
        transaction.paymentMethod || ""
      ).toLowerCase() as PaymentChannel
      const status = transaction.status.toLowerCase()

      return {
        id: String(transaction.id),
        customerName: transaction.customer?.name || "",
        email: transaction.customer?.email || "",
        reference: transaction.reference,
        amount: Number.isFinite(amount)
          ? formatCurrency(amount, transaction.currency)
          : String(transaction.amount),
        method: methodLabelMap[channel] || "Transfer",
        status: statusLabelMap[status] || "Pending",
        date: transaction.date || transaction.created_at || "N/A",
      }
    })
  }, [transactions])

  const filteredTableData = useMemo(() => {
    if (activeTab === "All") {
      return tableData
    }

    return tableData.filter((transaction) => transaction.method === activeTab)
  }, [activeTab, tableData])

  const totalVolume = filteredTableData.reduce((sum, transaction) => {
    const normalizedAmount = Number(
      String(transaction.amount).replace(/[^\d.-]/g, ""),
    )
    return sum + (Number.isFinite(normalizedAmount) ? normalizedAmount : 0)
  }, 0)
  const transactionCount = filteredTableData.length
  const averagePayIn = transactionCount > 0 ? totalVolume / transactionCount : 0
  const pageCount =
    transactionResponse?.total_pages ??
    Math.max(
      Math.ceil((transactionResponse?.total_items ?? 0) / pagination.pageSize),
      1,
    )

  return (
    <div className="flex h-full w-full flex-col gap-10 p-4 sm:p-6 lg:p-8">
      <section className="space-y-1">
        <h1 className="text-3xl font-black text-text-primary tracking-tight">
          Pay-Ins
        </h1>
        <p className="font-primary text-base font-medium text-text-secondary">
          Real-time overview of all incoming merchant transactions.
        </p>
      </section>

      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-fit">
          <TabsList
            variant="line"
            className="h-auto gap-0 border-b border-surface-6 p-0"
          >
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={cn(
                  "rounded-none bg-transparent px-6 pb-4 text-sm font-bold text-text-secondary transition-all",
                  "data-[state=active]:text-brand-primary-dark after:bg-brand-primary-dark",
                )}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="pb-4">
          <Button className="flex items-center gap-2 rounded-xl bg-brand-primary-dark hover:bg-brand-primary-2/90 text-white h-11 px-6 shadow-sm font-bold">
            <Download size={18} />
            <span>Export</span>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <MetricCard
          isLoading={isPending}
          title="Total Volume"
          value={formatCurrency(totalVolume)}
          changeLabel={`${transactionCount} transactions on this page`}
          iconClassName="text-brand-primary-dark"
          changeClassName="text-success-4"
          borderClassName="border-brand-primary-dark"
        />
        <MetricCard
          isLoading={isPending}
          title="Transaction Count"
          value={String(transactionCount)}
          changeLabel={`${transactionResponse?.total_items ?? transactionCount} total filtered records`}
          iconClassName="text-brand-primary"
          changeClassName="text-success-4"
          borderClassName="border-brand-primary"
        />
        <MetricCard
          isLoading={isPending}
          title="Average Pay-In"
          value={formatCurrency(averagePayIn)}
          changeLabel="Calculated from current page"
          iconClassName="text-text-secondary"
          changeClassName="text-text-muted"
          borderClassName="border-0"
        />
      </section>

      <PayInsTable
        data={filteredTableData}
        isPending={isPending}
        pagination={pagination}
        setPagination={setPagination}
        pageCount={pageCount}
        totalCount={
          transactionResponse?.total_items ?? filteredTableData.length
        }
      />
    </div>
  )
}
