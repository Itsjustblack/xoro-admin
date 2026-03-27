import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type MetricCardProps = {
  title: string
  value: string
  change?: string
  changeLabel: string
  icon: ReactNode
  iconClassName: string
  changeClassName: string
  borderClassName?: string
  sparklineClassName?: string
  sparklineValues?: number[]
}


const MetricCard = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  iconClassName,
  changeClassName,
  borderClassName = "border-brand-primary",
  sparklineClassName: _sparklineClassName,
  sparklineValues: _sparklineValues,
}: MetricCardProps) => {
  void _sparklineClassName
  void _sparklineValues

  return (
    <Card className="rounded-3xl border border-brand-primary-dark/10 bg-surface-1 p-0 ring-0 shadow">
      <div
        className={cn(
          "flex min-h-40 sm:h-41.5 flex-col justify-between border-t-[5px] gap-4 p-4 sm:p-6",
          borderClassName,
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-3 sm:space-y-4">
            <p className="font-satoshi text-xs sm:text-sm font-semibold leading-relaxed sm:leading-6 text-text-secondary">
              {title}
            </p>
            <div className="space-y-1 sm:space-y-1.5">
              <p className="font-clash-display text-xl sm:text-2xl leading-none font-black text-text-primary">
                {value}
              </p>
              <p className="font-satoshi text-xs sm:text-sm leading-tight sm:leading-5">
                <span className={cn("font-semibold", changeClassName)}>
                  {change}
                </span>{" "}
                <span className="font-medium text-text-muted">
                  {changeLabel}
                </span>
              </p>
            </div>
          </div>
          <div className={cn("shrink-0", iconClassName)}>{icon}</div>
        </div>
      </div>
    </Card>
  )
}

export default MetricCard
