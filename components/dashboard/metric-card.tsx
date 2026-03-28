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
  changeClassName?: string
  borderClassName?: string
  progressValue?: number
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
  progressValue,
}: MetricCardProps) => {
  return (
    <Card className="rounded-3xl min-h-36 border border-brand-primary-dark/10 bg-surface-1 p-0 ring-0 shadow">
      <div
        className={cn(
          "flex flex-col justify-between border-t-[5px] gap-2 p-4 sm:p-6",
          borderClassName,
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-3 sm:space-y-4 flex-1">
            <p className="font-satoshi text-xs sm:text-sm font-semibold leading-relaxed sm:leading-6 text-text-secondary">
              {title}
            </p>
            <div className="w-full">
              <p className="font-clash-display text-xl sm:text-3xl leading-none font-black text-text-primary">
                {value}
              </p>
            </div>
          </div>
          <div className={cn("shrink-0", iconClassName)}>{icon}</div>
        </div>
        {typeof progressValue === "number" ? (
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-brand-primary-dark/10">
            <div
              className={cn("h-full rounded-full bg-success-2")}
              style={{
                width: `${Math.min(100, Math.max(0, progressValue))}%`,
              }}
            />
          </div>
        ) : (
          <p className="font-satoshi text-xs sm:text-sm leading-tight sm:leading-5">
            <span className={cn("font-semibold", changeClassName)}>
              {change}
            </span>{" "}
            <span className={cn("font-medium", changeClassName)}>
              {changeLabel}
            </span>
          </p>
        )}
      </div>
    </Card>
  )
}

export default MetricCard
