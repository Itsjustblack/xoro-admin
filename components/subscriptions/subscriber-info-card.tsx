"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { DetailedSubscription } from "@/lib/types"

interface SubscriberInfoCardProps {
  subscription: DetailedSubscription
}

export function SubscriberInfoCard({ subscription }: SubscriberInfoCardProps) {
  return (
    <Card className="rounded-3xl border border-surface-3 bg-surface-1 p-8 shadow-sm ring-0">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-primary text-xs font-bold uppercase tracking-wider text-text-muted">
              Subscription ID
            </p>
            <h2 className="font-secondary text-2xl font-black text-text-primary">
              {subscription.id}
            </h2>
          </div>
          <Badge
            className={cn(
              "rounded-full px-4 py-1.5 font-bold text-xs border-0",
              subscription.status === "Active" && "bg-status-success-soft text-status-success",
              subscription.status === "Trialing" && "bg-accent-blue-soft text-accent-blue",
              subscription.status === "Past Due" && "bg-status-warning-soft text-status-warning",
              subscription.status === "Canceled" && "bg-status-danger-soft text-status-danger",
            )}
          >
            {subscription.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <p className="font-primary text-xs font-bold uppercase tracking-wider text-text-muted">
              Customer Name
            </p>
            <p className="font-primary text-base font-bold text-text-primary">
              {subscription.customerName}
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="font-primary text-xs font-bold uppercase tracking-wider text-text-muted">
              Email Address
            </p>
            <p className="font-primary text-base font-medium text-text-secondary">
              {subscription.email}
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="font-primary text-xs font-bold uppercase tracking-wider text-text-muted">
              Current Plan
            </p>
            <p className="font-primary text-base font-bold text-brand-primary">
              {subscription.planName}
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="font-primary text-xs font-bold uppercase tracking-wider text-text-muted">
              Billing Cycle
            </p>
            <p className="font-primary text-base font-medium text-text-secondary">
              {subscription.billingCycle}
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="font-primary text-xs font-bold uppercase tracking-wider text-text-muted">
              Start Date
            </p>
            <p className="font-primary text-base font-medium text-text-secondary">
              {subscription.startDate}
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="font-primary text-xs font-bold uppercase tracking-wider text-text-muted">
              Next Billing Date
            </p>
            <p className="font-primary text-base font-medium text-text-secondary">
              {subscription.nextBilling}
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="font-primary text-xs font-bold uppercase tracking-wider text-text-muted">
              Amount
            </p>
            <p className="font-primary text-base font-bold text-text-primary">
              {subscription.amount}
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="font-primary text-xs font-bold uppercase tracking-wider text-text-muted">
              Total Lifetime Value
            </p>
            <p className="font-primary text-base font-bold text-status-success">
              {subscription.totalPaid}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
