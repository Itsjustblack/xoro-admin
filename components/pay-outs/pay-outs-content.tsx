"use client"

import MetricCard from "@/components/dashboard/metric-card"
import { PayOutsTable } from "@/components/pay-outs/pay-outs-table"
import { getMerchantTransactions } from "@/lib/api/v1/transaction/queries"
import { transactionQueryKeys } from "@/lib/api/v1/query-key-factory"
import { PAGE_SIZE } from "@/lib/constants"
import type {
  ITransaction,
  PayOutTransaction,
  PaymentChannel,
} from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { useCurrentMerchant, useCurrentMode } from "@/store/merchant"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useMemo, useState } from "react"
import { SiteFooter } from "../shared/site-footer"
import { CreatePayoutSheet } from "./create-payout-sheet"

export function PayOutsContent() {
  const merchant = useCurrentMerchant()
  const mode = useCurrentMode()
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  })

  const { data: transactionResponse, isPending } = useQuery({
    queryKey: transactionQueryKeys.merchantPayOuts(
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
        transaction_type: "debit",
      }),
    enabled: !!merchant?.id,
  })

  const transactions = useMemo(
    () => transactionResponse?.transactions ?? [],
    [transactionResponse],
  )

  const tableData = useMemo<PayOutTransaction[]>(() => {
    return transactions.map((transaction: ITransaction) => {
      const amount = Number(transaction.amount)
      const channel = (
        transaction.payment_method ||
        transaction.paymentMethod ||
        ""
      ).toLowerCase() as PaymentChannel
      const status = transaction.status.toLowerCase()

      return {
        id: String(transaction.id),
        recipientName: transaction.customer?.name || "Unknown Recipient",
        recipientType:
          channel === "crypto"
            ? "Crypto Wallet"
            : channel === "bank" || channel === "transfer"
              ? "Bank Transfer"
              : "Merchant Transfer",
        reference: transaction.reference,
        amount: Number.isFinite(amount)
          ? formatCurrency(amount, transaction.currency)
          : String(transaction.amount),
        method:
          channel === "crypto"
            ? "Card Payout"
            : channel === "bank" || channel === "transfer"
              ? "Bank Transfer"
              : "Xoro Wallet",
        status:
          status === "success" || status === "completed"
            ? "Completed"
            : status === "pending"
              ? "Pending"
              : status === "processing"
                ? "Processing"
                : "Failed",
        date: transaction.date || transaction.created_at || "N/A",
      }
    })
  }, [transactions])

  const totalPaid = tableData.reduce((sum, transaction) => {
    const normalizedAmount = Number(
      String(transaction.amount).replace(/[^\d.-]/g, ""),
    )
    return sum + (Number.isFinite(normalizedAmount) ? normalizedAmount : 0)
  }, 0)
  const pendingProcessing = tableData.filter((transaction) =>
    ["Pending", "Processing"].includes(transaction.status),
  ).length
  const failedPayouts = tableData.filter(
    (transaction) => transaction.status === "Failed",
  ).length
  const pageCount =
    transactionResponse?.total_pages ??
    Math.max(
      Math.ceil((transactionResponse?.total_items ?? 0) / pagination.pageSize),
      1,
    )

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-1 flex-col gap-10 p-4 sm:p-6 lg:p-8">
        <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-text-primary tracking-tight">
              Pay-Outs
            </h1>
            <p className="text-base font-medium text-text-secondary">
              Manage and track your outgoing merchant transfers and vendor
              payments.
            </p>
          </div>
          <CreatePayoutSheet>
            <Button className="flex items-center gap-2 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white h-11 px-6 shadow-sm shadow-brand-primary/20 font-bold">
              <Plus size={18} />
              <span>New Pay-Out</span>
            </Button>
          </CreatePayoutSheet>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <MetricCard
            title="Total Paid (MTD)"
            value={formatCurrency(totalPaid)}
            changeLabel="Calculated from current page"
            iconClassName="text-brand-primary"
            changeClassName="text-success-2"
            borderClassName="border-brand-primary"
          />
          <MetricCard
            title="Pending Processing"
            value={String(pendingProcessing)}
            changeLabel="Pending and processing payouts"
            iconClassName="text-brand-primary"
            changeClassName="text-status-warning"
            borderClassName="border-brand-primary"
          />
          <MetricCard
            title="Failed Payouts"
            value={String(failedPayouts)}
            changeLabel="Failed payouts on current page"
            iconClassName="text-status-danger"
            changeClassName="text-status-danger"
            borderClassName="border-status-danger text-status-warning!"
          />
        </section>

        <PayOutsTable
          data={tableData}
          isPending={isPending}
          pagination={pagination}
          setPagination={setPagination}
          pageCount={pageCount}
          totalCount={transactionResponse?.total_items ?? tableData.length}
        />
      </div>
      <SiteFooter />
    </div>
  )
}
