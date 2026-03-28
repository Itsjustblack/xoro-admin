"use client"

import { Button } from "@/components/ui/button"
import { mockBulkPayoutRows, mockMonthlyPayoutVolume } from "@/lib/mock-data"
import { CheckCircle2, Share, Plus, Banknote, Hourglass } from "lucide-react"
import { BulkPayoutsTable } from "./bulk-payouts-table"
import MonthlyPayoutVolumeChart from "./monthly-payout-volume-chart"
import MetricCard from "../dashboard/metric-card"
import { CreateBatchPayoutSheet } from "./create-batch-payout-sheet"
import { useState } from "react"

export function BulkPayoutsContent() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <>
      <div className="flex h-full p-4 sm:p-6 lg:p-8 w-full flex-col gap-6 md:gap-8">
        {/* Page Header */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
              Bulk Payouts
            </h1>
            <p className="mt-1 text-sm text-text-secondary md:text-base">
              Manage your bulk payout transactions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Share className="size-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button
              className="flex items-center gap-2 bg-indigo-900 text-white hover:bg-indigo-900/90"
              onClick={() => setIsSheetOpen(true)}
            >
              <Plus className="size-4" />
              <span>Make batch payout</span>
            </Button>
          </div>
        </section>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Total Volume"
            value="NGN 20,405"
            change="+15.3%"
            changeLabel="vs last month"
            icon={<Banknote className="size-5" />}
            iconClassName="p-2 rounded-full bg-brand-primary-dark/10 text-brand-primary"
            changeClassName="text-green-600"
          />
          <MetricCard
            title="Success Rate"
            value="98.5%"
            change="+2.4%"
            changeLabel="vs last month"
            icon={<CheckCircle2 className="size-5" />}
            iconClassName="bg-green-100 rounded-full p-2 text-green-500"
            changeClassName="text-green-600"
            borderClassName="border-green-500"
          />
          <MetricCard
            title="Pending Batches"
            value="89"
            changeLabel="Requiring immediate attention"
            icon={<Hourglass className="size-5" />}
            iconClassName="bg-warning-2 rounded-full p-2 text-warning-6"
            changeClassName="text-green-600"
            borderClassName="border-warning-6"
          />
        </section>

        <BulkPayoutsTable data={mockBulkPayoutRows} />
        <MonthlyPayoutVolumeChart data={mockMonthlyPayoutVolume} />
      </div>
      <CreateBatchPayoutSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </>
  )
}
