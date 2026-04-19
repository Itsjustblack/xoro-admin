"use client"

import { Card } from "@/components/ui/card"
import type { RefundKPIs } from "@/lib/types"
import {
  RefreshCcw,
  CheckCircle2,
  CircleX,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { TaskClockIcon } from "../icons"

interface RefundsKPIsProps {
  kpis: RefundKPIs
}

export function RefundsKPIs({ kpis }: RefundsKPIsProps) {
  const cards = [
    {
      label: "Pending",
      value: kpis.pending,
      icon: TaskClockIcon,
      iconColor: "text-brand-primary-dark",
      iconBg: "bg-brand-primary-dark/10",
    },
    {
      label: "Processing",
      value: kpis.processing,
      icon: RefreshCcw,
      iconColor: "text-status-warning",
      iconBg: "bg-status-warning-soft",
    },
    {
      label: "Completed",
      value: kpis.completed,
      icon: CheckCircle2,
      iconColor: "text-status-success",
      iconBg: "bg-status-success-soft",
    },
    {
      label: "Failed",
      value: kpis.failed,
      icon: CircleX,
      iconColor: "text-status-danger",
      iconBg: "bg-status-danger-soft",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card
          key={card.label}
          className="rounded-3xl border border-surface-3 bg-white p-6 ring-0"
        >
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex size-12 items-center justify-center rounded-2xl",
                card.iconBg,
              )}
            >
              <card.icon className={cn("size-6", card.iconColor)} />
            </div>
            <div className="flex flex-col">
              <p className="font-primary text-xs font-medium text-text-muted">
                {card.label}
              </p>
              <h3 className="font-secondary text-2xl font-black text-text-primary">
                {card.value}
              </h3>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
