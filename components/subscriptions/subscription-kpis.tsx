"use client"

import { Card } from "@/components/ui/card"
import type { DetailedPlanSubscription } from "@/lib/types"

interface SubscriptionKPIsProps {
  plan: DetailedPlanSubscription
}

export function SubscriptionKPIs({ plan }: SubscriptionKPIsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Subscribers */}
      <Card className="border rounded-none border-surface-3 bg-white p-6 shadow-sm ring-0">
        <div className="flex flex-col gap-2">
          <p className="font-primary text-[11px] font-bold uppercase tracking-widest text-text-subtitle">
            Total Subscribers
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="font-secondary text-3xl font-black text-text-primary">
              {plan.totalSubscribers.toLocaleString()}
            </h3>
            <span className="text-xs font-bold text-status-success">+12%</span>
          </div>
        </div>
      </Card>

      {/* Active Subscribers */}
      <Card className="border rounded-none border-surface-3 bg-white p-6 shadow-sm ring-0">
        <div className="flex flex-col gap-2">
          <p className="font-primary text-[11px] font-bold uppercase tracking-widest text-text-subtitle">
            Active Subscribers
          </p>
          <div className="flex items-center gap-2">
            <h3 className="font-secondary text-3xl font-black text-text-primary">
              {plan.activeSubscribers.toLocaleString()}
            </h3>
            <div className="size-2 rounded-full bg-status-success" />
          </div>
        </div>
      </Card>

      {/* Monthly Revenue */}
      <Card className="border rounded-none border-surface-3 bg-white p-6 shadow-sm ring-0">
        <div className="flex flex-col gap-2">
          <p className="font-primary text-[11px] font-bold uppercase tracking-widest text-text-subtitle">
            Monthly Revenue
          </p>
          <h3 className="font-secondary text-3xl font-black text-text-primary">
            {plan.monthlyRevenue}
          </h3>
        </div>
      </Card>

      {/* Churn Rate */}
      <Card className="border rounded-none border-surface-3 bg-white p-6 shadow-sm ring-0">
        <div className="flex flex-col gap-2">
          <p className="font-primary text-[11px] font-bold uppercase tracking-widest text-text-subtitle">
            Churn Rate
          </p>
          <h3 className="font-secondary text-3xl font-black text-status-danger">
            {plan.churnRate}
          </h3>
        </div>
      </Card>
    </div>
  )
}
