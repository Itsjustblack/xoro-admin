"use client"

import { Card } from "@/components/ui/card"
import type { HealthStats } from "@/lib/types"

interface HealthOverviewProps {
  stats: HealthStats
}

export function HealthOverview({ stats }: HealthOverviewProps) {
  return (
    <Card className="rounded-3xl border border-surface-3 bg-surface-1 p-6 shadow-sm ring-0">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="font-primary text-xs font-bold uppercase tracking-widest text-brand-primary-dark">
            Health Overview
          </h3>
          <p className="text-[10px] font-medium text-text-muted">
            Data updated 5m ago
          </p>
        </div>

        <div className="relative h-10 w-full overflow-hidden rounded-full bg-surface-3 flex">
          <div
            className="h-full bg-status-success"
            style={{ width: `${stats.active}%` }}
          />
          <div
            className="h-full bg-surface-6"
            style={{ width: `${stats.cancelled}%` }}
          />
          <div
            className="h-full bg-status-danger"
            style={{ width: `${stats.pastDue}%` }}
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-status-success" />
            <span className="text-xs font-bold text-text-primary">
              {stats.active}% Active
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-surface-6" />
            <span className="text-xs font-bold text-text-primary">
              {stats.cancelled}% Cancelled
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-status-danger" />
            <span className="text-xs font-bold text-text-primary">
              {stats.pastDue}% Past Due
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
