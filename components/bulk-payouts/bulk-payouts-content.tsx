"use client"

import MetricCard from "@/components/dashboard/metric-card"
import { getPayoutsAnalytics } from "@/lib/api/v1/analytics/queries"
import { getBulkPayout } from "@/lib/api/v1/payout/queries"
import {
  analyticsQueryKeys,
  bulkPayoutQueryKeys,
} from "@/lib/api/v1/query-key-factory"
import { PAGE_SIZE } from "@/lib/constants"
import { formatCount, formatCurrency, formatPercent } from "@/lib/utils"
import { useCurrentMerchant, useCurrentMode } from "@/store/merchant"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { CheckCircle2, Hourglass } from "lucide-react"
import { useState } from "react"
import { PaymentIcon } from "../icons"
import { BulkPayoutsTable } from "./bulk-payouts-table"
import { CreateBatchPayoutSheet } from "./create-batch-payout-sheet"
import MonthlyPayoutVolumeChart from "./monthly-payout-volume-chart"

export function BulkPayoutsContent() {
  const merchant = useCurrentMerchant()
  const mode = useCurrentMode()
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  })

  const { data: payoutAnalytics } = useQuery({
    queryKey: analyticsQueryKeys.payouts(merchant?.id ?? "", mode),
    queryFn: () => getPayoutsAnalytics(merchant!.id, mode),
    enabled: !!merchant?.id,
  })

  const { data: bulkPayouts, isPending } = useQuery({
    queryKey: bulkPayoutQueryKeys.list(
      merchant?.id ?? "",
      mode,
      pagination.pageIndex + 1,
      pagination.pageSize,
    ),
    queryFn: () =>
      getBulkPayout({
        merchant_id: merchant!.id,
        mode,
        page: pagination.pageIndex + 1,
        page_size: pagination.pageSize,
      }),
    enabled: !!merchant?.id,
    placeholderData: keepPreviousData,
  })

  // BulkPayoutsResponse shape: { payouts: BulkPayout[], total_items, total_pages, ... }
  const bulkPayoutRows = bulkPayouts?.payouts ?? []
  const totalCount = bulkPayouts?.total_items ?? 0
  const pageCount = bulkPayouts?.total_pages ?? 1

  const monthlyPayoutVolume = payoutAnalytics?.time_series ?? []

  const successRate = payoutAnalytics?.payout_count
    ? (payoutAnalytics.successful_payouts / payoutAnalytics.payout_count) * 100
    : 0

  return (
    <div className="flex h-full w-full flex-col gap-6 p-4 sm:p-6 lg:p-8 md:gap-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-text-primary md:text-3xl">
            Bulk Payouts
          </h1>
          <p className="text-sm text-text-secondary md:text-base">
            Manage and monitor your mass disbursement batches
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CreateBatchPayoutSheet />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Total Payout Volume"
          value={formatCurrency(
            payoutAnalytics?.total_payouts ?? 0,
            payoutAnalytics?.currency,
          )}
          change={formatCount(payoutAnalytics?.payout_count ?? 0)}
          changeLabel="total payouts"
          icon={<PaymentIcon className="size-5" />}
          iconClassName="rounded-full bg-brand-primary-dark/10 p-2 text-brand-primary"
          changeClassName="text-green-600"
        />
        <MetricCard
          title="Success Rate"
          value={formatPercent(successRate)}
          change={formatCount(payoutAnalytics?.successful_payouts ?? 0)}
          changeLabel="successful payouts"
          icon={<CheckCircle2 className="size-5" />}
          iconClassName="rounded-full bg-green-100 p-2 text-green-500"
          borderClassName="border-green-500"
          progressValue={successRate}
        />
        <MetricCard
          title="Pending Batches"
          value={formatCount(payoutAnalytics?.pending_payouts ?? 0)}
          changeLabel="Requiring immediate attention"
          icon={<Hourglass className="size-5" />}
          iconClassName="rounded-full bg-warning-2 p-2 text-warning-6"
          changeClassName="text-text-muted"
          borderClassName="border-warning-6"
        />
      </section>

      <BulkPayoutsTable
        data={bulkPayoutRows}
        isPending={isPending}
        pagination={pagination}
        setPagination={setPagination}
        totalCount={totalCount}
        pageCount={pageCount}
      />
      <MonthlyPayoutVolumeChart data={monthlyPayoutVolume} />
    </div>
  )
}
