"use client"

import { Card } from "@/components/ui/card"
import type { PayInKPIs } from "@/lib/types"
import { TrendingUp } from "lucide-react"

interface PayInsKPIsProps {
  kpis: PayInKPIs
}

export function PayInsKPIs({ kpis }: PayInsKPIsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Total Volume */}
      <Card className="rounded-4xl border border-surface-3 bg-white p-8 shadow-sm ring-0 border-t-4 border-t-brand-primary-2">
        <div className="flex flex-col gap-3">
          <p className="font-primary text-xs font-bold uppercase tracking-widest text-text-muted">
            Total Volume
          </p>
          <div className="space-y-1">
            <h3 className="font-secondary text-4xl font-black text-text-primary">
              {kpis.totalVolume}
            </h3>
            <div className="flex items-center gap-1 text-xs font-bold text-status-success">
              <TrendingUp size={14} />
              <span>{kpis.volumeChange} vs last month</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Transaction Count */}
      <Card className="rounded-4xl border border-surface-3 bg-white p-8 shadow-sm ring-0 border-t-4 border-t-brand-primary-2">
        <div className="flex flex-col gap-3">
          <p className="font-primary text-xs font-bold uppercase tracking-widest text-text-muted">
            Transaction Count
          </p>
          <div className="space-y-1">
            <h3 className="font-secondary text-4xl font-black text-text-primary">
              {kpis.transactionCount}
            </h3>
            <div className="flex items-center gap-1 text-xs font-bold text-status-success">
              <TrendingUp size={14} />
              <span>{kpis.countChange} vs last month</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Average Pay-In */}
      <Card className="rounded-4xl border border-surface-3 bg-white p-8 shadow-sm ring-0">
        <div className="flex flex-col gap-3">
          <p className="font-primary text-xs font-bold uppercase tracking-widest text-text-muted">
            Average Pay-In
          </p>
          <div className="space-y-1">
            <h3 className="font-secondary text-4xl font-black text-text-primary">
              {kpis.averagePayIn}
            </h3>
            <div className="flex items-center gap-1 text-xs font-bold text-text-muted">
              <span>— Steady</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
