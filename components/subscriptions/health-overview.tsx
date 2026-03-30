"use client"

import { Card } from "@/components/ui/card"
import type { HealthStats } from "@/lib/types"

interface HealthOverviewProps {
  stats: HealthStats
}

export function HealthOverview({ stats }: HealthOverviewProps) {
  return (
    <Card className="rounded-4xl bg-surface-4 p-8 ring-0">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="font-secondary text-xs font-bold uppercase tracking-widest text-brand-primary-dark">
            Health Overview
          </h3>
          <p className="text-xs font-manrope font-medium text-text-subtitle">
            Data updated 5m ago
          </p>
        </div>

        <div className="relative h-12 w-full overflow-hidden rounded-full bg-surface-3 flex">
          <div
            className="h-full bg-green-700"
            style={{ width: `${stats.active}%` }}
          />
          <div
            className="h-full bg-text-muted"
            style={{ width: `${stats.cancelled}%` }}
          />
          <div
            className="h-full bg-amber-700"
            style={{ width: `${stats.pastDue}%` }}
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-green-700" />
            <span className="text-xs font-bold text-text-primary">
              {stats.active}% Active
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-text-muted" />
            <span className="text-xs font-bold text-text-primary">
              {stats.cancelled}% Cancelled
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-amber-700" />
            <span className="text-xs font-bold text-text-primary">
              {stats.pastDue}% Past Due
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
