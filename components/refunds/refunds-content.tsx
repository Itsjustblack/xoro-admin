"use client"

import MetricCard from "@/components/dashboard/metric-card"
import { Button } from "@/components/ui/button"
import { Download, Plus } from "lucide-react"

export function RefundsContent() {
  return (
    <div className="flex h-full w-full flex-col gap-10 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-primary text-3xl font-black text-text-primary tracking-tight">
            Refunds
          </h1>
          <p className="font-primary text-base font-medium text-text-secondary">
            Manage and track customer refund requests and processing status.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex h-9.5 items-center gap-2 rounded-full border-brand-primary-dark/10 bg-surface-1 px-4 font-bold text-text-primary hover:bg-surface-2 shadow-sm"
          >
            <Download size={18} />
            <span>Export CSV</span>
          </Button>
          <Button className="flex h-9.5 items-center gap-2 rounded-full bg-brand-primary-dark px-4 font-bold text-white border-none hover:bg-brand-primary-2/90 shadow-sm shadow-brand-primary-dark/30">
            <Plus size={18} />
            <span>New Refund</span>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Pending"
          value="N/A"
          changeLabel="Unavailable until refund data is connected"
          iconClassName="text-brand-primary-dark"
          borderClassName="border-brand-primary-dark"
        />
        <MetricCard
          title="Processing"
          value="N/A"
          changeLabel="Unavailable until refund data is connected"
          iconClassName="text-status-warning"
          borderClassName="border-status-warning"
        />
        <MetricCard
          title="Completed"
          value="N/A"
          changeLabel="Unavailable until refund data is connected"
          iconClassName="text-status-success"
          borderClassName="border-status-success"
        />
        <MetricCard
          title="Failed"
          value="N/A"
          changeLabel="Unavailable until refund data is connected"
          iconClassName="text-status-danger"
          borderClassName="border-status-danger"
        />
      </section>
    </div>
  )
}
