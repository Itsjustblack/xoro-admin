"use client"

import {
  Banknote,
  CheckCircle2,
  Download,
  Hourglass,
  LayoutGrid,
  RotateCcw,
} from "lucide-react"
import { useMemo, useState } from "react"

import MetricCard from "@/components/dashboard/metric-card"
import { Button } from "@/components/ui/button"
import { getBulkPayoutByReference } from "@/lib/api/v1/payout/queries"
import { bulkPayoutQueryKeys } from "@/lib/api/v1/query-key-factory"
import type { IBulkTransactionData } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { BulkPayoutDetailsTable } from "./bulk-payout-details-table"

interface BulkPayoutDetailsContentProps {
  reference: string
}

function formatDate(value?: string) {
  if (!value) return "-"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

function normalizeStatus(status?: string) {
  const normalized = status?.toLowerCase() ?? ""

  if (normalized.includes("success")) return "Success"
  if (normalized.includes("fail")) return "Failed"
  if (normalized.includes("pending")) return "Pending"

  return status || "Unknown"
}

export function BulkPayoutDetailsContent({
  reference,
}: BulkPayoutDetailsContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { data, isPending } = useQuery({
    queryKey: bulkPayoutQueryKeys.detail(reference),
    queryFn: () => getBulkPayoutByReference(reference),
    enabled: !!reference,
  })

  const detail = data as IBulkTransactionData | undefined
  const transactions = useMemo(
    () => detail?.transactions ?? [],
    [detail?.transactions],
  )
  const filteredTransactions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) return transactions

    return transactions.filter((transaction) => {
      const name =
        transaction.customer.name ?? transaction.details.customer_name ?? ""
      const email = transaction.customer.email ?? ""
      const bank = transaction.details.bank ?? ""

      return [name, email, bank, transaction.reference]
        .join(" ")
        .toLowerCase()
        .includes(query)
    })
  }, [searchQuery, transactions])

  const totalAmount = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  )
  const successfulCount = transactions.filter(
    (transaction) => normalizeStatus(transaction.status) === "Success",
  ).length
  const pendingCount = transactions.filter(
    (transaction) => normalizeStatus(transaction.status) === "Pending",
  ).length
  const failedCount = transactions.filter(
    (transaction) => normalizeStatus(transaction.status) === "Failed",
  ).length
  const successRate = transactions.length
    ? (successfulCount / transactions.length) * 100
    : 0
  const completionRate = transactions.length
    ? ((successfulCount + failedCount) / transactions.length) * 100
    : 0

  return (
    <div className="flex h-full w-full flex-col gap-8 p-4 font-manrope sm:p-6 lg:p-8">
      <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-clash-display text-3xl font-black text-text-primary">
            Bulk Payout Details
          </h1>
          <p className="font-medium text-text-secondary">
            View and manage this payout batch execution history.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="flex h-11 items-center gap-2 rounded-full px-5 text-brand-primary-dark hover:bg-surface-2"
          >
            <Download className="size-4" />
            <span className="font-semibold">Export</span>
          </Button>
          <Button className="flex h-11 items-center gap-2 rounded-none bg-success-5 px-5 text-green-950 hover:bg-green-200">
            <RotateCcw className="size-4" />
            <span className="font-semibold">Retry Failed</span>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Total Payout Volume"
          value={`NGN ${totalAmount.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          change={`${transactions.length}`}
          changeLabel="total recipients"
          icon={<Banknote className="size-5" />}
          iconClassName="rounded-full bg-brand-primary/10 p-2 text-brand-primary"
          changeClassName="text-success-2"
        />
        <MetricCard
          title="Success Rate"
          value={`${successRate.toFixed(1)}%`}
          changeLabel=""
          icon={<CheckCircle2 className="size-5" />}
          iconClassName="rounded-full bg-success-2/10 p-2 text-success-2"
          progressValue={successRate}
          borderClassName="border-success-2"
        />
        <MetricCard
          title="Pending Batches"
          value={String(pendingCount)}
          changeLabel="Requiring immediate attention"
          icon={<Hourglass className="size-5" />}
          iconClassName="rounded-full bg-status-warning-soft p-2 text-status-warning"
          changeClassName="text-text-muted"
          borderClassName="border-status-warning"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex min-h-64 flex-col justify-center rounded-4xl bg-surface-4 p-8 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-brand-primary">
              Batch Completion
            </h2>
            <span className="text-3xl font-black text-brand-primary">
              {completionRate.toFixed(0)}%
            </span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-surface-8">
            <div
              className="h-full rounded-full bg-brand-primary-dark"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="mt-6 text-lg font-medium text-text-secondary">
            {successfulCount} successful, {failedCount} failed, {pendingCount} pending.
          </p>
        </div>

        <div className="flex flex-col gap-8 rounded-4xl bg-brand-primary-2 p-8 text-white shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            Batch Information
          </h3>

          <div className="grid grid-cols-2 gap-y-8">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Batch Name
              </p>
              <p className="text-lg font-bold">{detail?.name ?? "-"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Reference ID
              </p>
              <p className="text-lg font-bold">{detail?.reference ?? reference}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Created Date
              </p>
              <p className="text-lg font-bold">{formatDate(detail?.created_at)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Status
              </p>
              <p className="text-lg font-bold">{normalizeStatus(detail?.status)}</p>
            </div>
          </div>

          <div className="mt-auto border-t border-white/10 pt-8">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Remarks
              </p>
              <div className="mt-2 flex items-center gap-2">
                <LayoutGrid className="size-5 text-white/60" />
                <span className="font-bold">{detail?.remarks || "No remarks"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BulkPayoutDetailsTable
        data={filteredTransactions}
        totalCount={transactions.length}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        isPending={isPending}
      />
    </div>
  )
}
