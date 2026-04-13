import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { Skeleton } from "../ui/skeleton"

type MetricCardProps = {
  isLoading?: boolean
  title: string
  value: string
  change?: string
  changeLabel: string
  icon?: ReactNode
  iconClassName: string
  changeClassName?: string
  borderClassName?: string
  containerClassName?: string
  progressValue?: number
}

const MetricCard = ({
  isLoading,
  title,
  value,
  change,
  changeLabel,
  icon,
  iconClassName,
  containerClassName,
  changeClassName,
  borderClassName = "border-brand-primary",
  progressValue,
}: MetricCardProps) => {
  return (
    <Card className={cn("rounded-3xl min-h-33 border border-brand-primary-dark/10 bg-surface-1 p-0 ring-0 shadow", containerClassName)}>
      <div
        className={cn(
          "flex flex-col text-text-primary justify-between border-t-[5px] gap-3 p-4 sm:p-5",
          borderClassName,
        )}
      >   
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-3 w-full" />
          </div>
        ) : (
          <>
        <div className="flex items-start justify-between gap-3  ">
          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="font-satoshi text-xs sm:text-sm font-semibold leading-relaxed sm:leading-6 text-text-secondary">
                {title}
              </p>
              <div className={cn("shrink-0", iconClassName)}>{icon}</div>
            </div>
            <div className="w-full">
              <p className="font-clash-display text-xl sm:text-2xl xl:text-3xl leading-none font-black ">
                {value}
              </p>
            </div>
          </div>
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
          </>
        )}
      </div>
    </Card>
  )
}

export default MetricCard
