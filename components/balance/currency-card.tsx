import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export type CurrencyCardProps = {
  title: string
  value: string
  icon: ReactNode
  iconClassName?: string
  iconBgClassName?: string
  borderClassName?: string
}

export default function CurrencyCard({
  title,
  value,
  icon,
  iconClassName,
  iconBgClassName,
  borderClassName,
}: CurrencyCardProps) {
  return (
    <Card className="overflow-hidden rounded-3xl border border-brand-primary-dark/10 bg-surface-1 p-0 ring-0 shadow">
      <div
        className={cn(
          "flex flex-col justify-between gap-3 border-t-[5px] p-4 sm:p-6",
          borderClassName,
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full shrink-0",
              iconBgClassName || "bg-gray-100",
              iconClassName,
            )}
          >
            {icon}
          </div>
          <p className="font-satoshi text-xs sm:text-sm font-semibold leading-relaxed sm:leading-6 text-text-secondary">
            {title}
          </p>
        </div>

        <div>
          <p className="font-clash-display text-xl sm:text-2xl leading-none font-black text-text-primary">
            {value}
          </p>
        </div>
      </div>
    </Card>
  )
}
