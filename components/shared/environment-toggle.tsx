"use client"

import { cn } from "@/lib/utils"
import { useCurrentMode, useMerchantActions } from "@/store/merchant"

const OPTIONS = ["live", "test"] as const

const EnvironmentToggle = () => {
  const environment = useCurrentMode()
  const { toogleMode } = useMerchantActions()

  const handleSelectEnvironment = (option: (typeof OPTIONS)[number]) => {
    if (option === environment) {
      return
    }

    toogleMode()
  }

  return (
    <div
      className="relative grid h-9 w-[116.77px] grid-cols-2 items-center rounded-full border border-surface-6 bg-surface-3 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
      role="tablist"
      aria-label="Environment switch"
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full border border-surface-6 bg-surface-1 shadow-sm transition-transform duration-300 ease-out",
          environment === "test" && "translate-x-full",
        )}
      />
      {OPTIONS.map((option) => {
        const isActive = environment === option

        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => handleSelectEnvironment(option)}
            className={cn(
              "relative z-10 flex h-full items-center justify-center rounded-full px-0 text-xs font-bold capitalize transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30",
              isActive
                ? "text-text-primary"
                : "text-text-secondary hover:text-[#4f5f7b]",
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export default EnvironmentToggle
