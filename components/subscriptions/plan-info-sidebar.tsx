"use client"

import { Card } from "@/components/ui/card"
import type { ActivityEvent, DetailedPlanSubscription } from "@/lib/types"
import { Check, RefreshCcw, Plus, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlanInfoSidebarProps {
  plan: DetailedPlanSubscription
}

export function PlanInfoSidebar({ plan }: PlanInfoSidebarProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Plan Information Card */}
      <Card className="rounded-4xl border-0 bg-brand-primary-2 p-8 text-white shadow-lg ring-0">
        <div className="flex flex-col gap-10">
          <h3 className="font-primary text-[10px] font-bold uppercase tracking-widest text-white/70">
            Plan Information
          </h3>

          <div className="space-y-1">
            <p className="font-primary text-xs font-bold uppercase tracking-wider text-white/50">
              Plan Name
            </p>
            <h4 className="font-primary text-2xl font-bold text-white">
              {plan.planName}
            </h4>
          </div>

          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p className="font-primary text-xs font-bold uppercase tracking-wider text-white/50">
                Price
              </p>
              <div className="flex items-baseline gap-1">
                <span className="font-secondary text-3xl font-black text-white">
                  {plan.price}
                </span>
                <span className="text-xs font-medium text-white/70">/month</span>
              </div>
            </div>
            <div className="space-y-1 text-right">
              <p className="font-primary text-xs font-bold uppercase tracking-wider text-white/50 text-right">
                Billing Cycle
              </p>
              <p className="text-base font-bold text-white">
                {plan.billingCycle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-white/10">
            <div className="space-y-1">
              <p className="font-primary text-xs font-bold uppercase tracking-wider text-white/50">
                Trial Period
              </p>
              <p className="text-base font-bold text-white">
                {plan.trialPeriod}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-primary text-xs font-bold uppercase tracking-wider text-white/50">
                Created Date
              </p>
              <p className="text-base font-bold text-white">
                {plan.createdDate}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Activity Card */}
      <Card className="rounded-4xl border border-surface-3 bg-white p-8 shadow-sm ring-0">
        <div className="flex flex-col gap-8">
          <h3 className="font-primary text-xs font-bold uppercase tracking-widest text-brand-primary-dark">
            Recent Activity
          </h3>

          <div className="space-y-8 relative">
            {plan.recentActivity.map((event, index) => (
              <div key={event.id} className="relative flex items-start gap-4">
                {/* Timeline Connector */}
                {index !== plan.recentActivity.length - 1 && (
                  <div className="absolute left-5 top-10 h-8 w-px bg-surface-3" />
                )}

                <div className={cn(
                  "flex size-10 items-center justify-center rounded-full text-white",
                  event.type === "renewed" && "bg-status-success",
                  event.type === "successful" && "bg-status-success",
                  event.type === "created" && "bg-brand-primary-2"
                )}>
                  {event.type === "renewed" && <RefreshCcw size={16} />}
                  {event.type === "successful" && <Check size={16} />}
                  {event.type === "created" && <Plus size={16} />}
                </div>

                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-bold text-text-primary leading-tight">
                    {event.title}
                  </p>
                  <p className="text-[10px] font-medium text-text-muted">
                    {event.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="flex items-center justify-center gap-2 pt-4 text-[10px] font-bold uppercase tracking-widest text-brand-primary-2 hover:underline">
            View Full History
          </button>
        </div>
      </Card>
    </div>
  )
}
