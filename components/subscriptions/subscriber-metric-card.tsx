"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react"

interface SubscriberMetricCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
  icon: LucideIcon
  iconClassName: string
}

export function SubscriberMetricCard({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  iconClassName,
}: SubscriberMetricCardProps) {
  return (
    <Card className="border rounded-none border-surface-3 bg-surface-1 p-6 shadow-sm ring-0">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className={cn("flex size-12 items-center justify-center rounded-2xl", iconClassName)}>
            <Icon size={24} />
          </div>
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold",
              isPositive ? "bg-status-success-soft text-status-success" : "bg-status-danger-soft text-status-danger"
            )}
          >
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{change}</span>
          </div>
        </div>

        <div className="space-y-1">
          <p className="font-primary text-sm font-medium text-text-secondary">
            {title}
          </p>
          <h3 className="font-secondary text-3xl font-black text-text-primary">
            {value}
          </h3>
        </div>
      </div>
    </Card>
  )
}
