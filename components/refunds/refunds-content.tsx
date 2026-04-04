"use client"

import { Button } from "@/components/ui/button"
import { mockRefundKPIs, mockRefundRequests } from "@/lib/mock-data"
import { Download, Plus } from "lucide-react"
import { RefundsKPIs } from "./refunds-kpis"
import { RefundsTable } from "./refunds-table"

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

      {/* KPI Metrics */}
      <RefundsKPIs kpis={mockRefundKPIs} />

      {/* Refunds Table */}
      <RefundsTable data={mockRefundRequests} />
    </div>
  )
}
