"use client"

import { Calendar as CalendarIcon, X } from "lucide-react"
import { useMemo } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  useBalanceFilterActions,
  useDraftBalanceFilters,
} from "@/store/balance-filter-store"
import {
  CURRENCY_OPTIONS,
  DATE_PRESETS,
  PAYMENT_METHOD_OPTIONS,
  STATUS_OPTIONS,
} from "./balance-filter-utils"

interface BalanceFilterPanelProps {
  trigger: React.ReactNode
  onApply?: () => void
}

export function BalanceFilterPanel({
  trigger,
  onApply,
}: BalanceFilterPanelProps) {
  const draftFilters = useDraftBalanceFilters()
  const { applyDraft, resetDraft, resetAll, updateDraftFilters } =
    useBalanceFilterActions()

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item]
  }

  const activeChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = []

    draftFilters.status.forEach((status) => {
      chips.push({
        label: `Status: ${status}`,
        onRemove: () =>
          updateDraftFilters((prev) => ({
            ...prev,
            status: prev.status.filter((s) => s !== status),
          })),
      })
    })

    draftFilters.paymentMethod.forEach((method) => {
      chips.push({
        label: method,
        onRemove: () =>
          updateDraftFilters((prev) => ({
            ...prev,
            paymentMethod: prev.paymentMethod.filter((m) => m !== method),
          })),
      })
    })

    if (draftFilters.dateRange.type) {
      const preset = DATE_PRESETS.find(
        (p) => p.value === draftFilters.dateRange.type,
      )
      chips.push({
        label: preset ? preset.label : "Custom Date",
        onRemove: () =>
          updateDraftFilters((prev) => ({
            ...prev,
            dateRange: { type: "", from: null, to: null },
          })),
      })
    }

    draftFilters.currency.forEach((currency) => {
      chips.push({
        label: currency,
        onRemove: () =>
          updateDraftFilters((prev) => ({
            ...prev,
            currency: prev.currency.filter((c) => c !== currency),
          })),
      })
    })

    if (draftFilters.amount.min || draftFilters.amount.max) {
      chips.push({
        label: `Amt: ${draftFilters.amount.min || "0"} - ${draftFilters.amount.max || "max"}`,
        onRemove: () =>
          updateDraftFilters((prev) => ({
            ...prev,
            amount: { min: "", max: "" },
          })),
      })
    }

    return chips
  }, [draftFilters, updateDraftFilters])

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        collisionPadding={16}
        align="end"
        className="z-50 flex w-87 flex-col font-manrope gap-0 overflow-hidden rounded-3xl border-none bg-white p-0 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] max-h-[min(85vh,calc(var(--radix-popover-content-available-height)-1rem))]"
        sideOffset={12}
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden p-6 sm:p-7">
          <div className="flex items-center justify-between pb-6">
            <h2 className="text-xl font-bold text-brand-primary-dark">
              Filters
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 font-semibold text-brand-primary-dark hover:bg-transparent hover:text-brand-primary/80"
              onClick={resetAll}
            >
              Reset All
            </Button>
          </div>

          {activeChips.length > 0 && (
            <div className="flex flex-wrap gap-2 pb-6">
              {activeChips.map((chip, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 h-8 rounded-full border-none bg-gray-100 py-1 pl-3 pr-2"
                >
                  <span className="text-[11px] font-medium text-text-primary">
                    {chip.label}
                  </span>
                  <button
                    className="ml-1 flex size-4 items-center justify-center rounded-full text-text-secondary hover:bg-gray-200 hover:text-text-primary"
                    onClick={chip.onRemove}
                  >
                    <X className="size-2.5" strokeWidth={3} />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-6">
            <div className="space-y-3">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-text-tertiary">
                Status
              </Label>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((status) => {
                  const isActive = draftFilters.status.includes(status)
                  const isSuccessActive = status === "Success" && isActive

                  return (
                    <Button
                      key={status}
                      variant="outline"
                      className={`h-auto py-1.5 rounded-full border-none px-5 text-[13px] font-medium shadow-none ${
                        isSuccessActive
                          ? "bg-green-200/60 text-green-800 hover:bg-green-200 hover:text-green-900"
                          : isActive
                            ? "bg-brand-primary-dark text-white hover:bg-brand-primary-dark/90 hover:text-white"
                            : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                      }`}
                      onClick={() =>
                        updateDraftFilters((prev) => ({
                          ...prev,
                          status: toggleArrayItem(prev.status, status),
                        }))
                      }
                    >
                      {status}
                    </Button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-3 mt-1">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-text-tertiary">
                Payment Method
              </Label>
              <div className="flex flex-wrap gap-2">
                {PAYMENT_METHOD_OPTIONS.map((method) => {
                  const isActive = draftFilters.paymentMethod.includes(method)
                  return (
                    <Button
                      key={method}
                      variant="outline"
                      className={`h-auto py-1.5 rounded-full border-none px-5 text-[13px] font-medium shadow-none ${
                        isActive
                          ? "bg-brand-primary-dark text-white hover:bg-brand-primary-dark/90 hover:text-white"
                          : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                      }`}
                      onClick={() =>
                        updateDraftFilters((prev) => ({
                          ...prev,
                          paymentMethod: toggleArrayItem(
                            prev.paymentMethod,
                            method,
                          ),
                        }))
                      }
                    >
                      {method}
                    </Button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-3 mt-1">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-text-tertiary">
                Date Range
              </Label>
              <div className="mb-3 flex flex-wrap gap-2">
                {DATE_PRESETS.map((preset) => {
                  const isActive = draftFilters.dateRange.type === preset.value
                  return (
                    <Button
                      key={preset.value}
                      variant="outline"
                      className={`h-auto py-1.5 rounded-full border-none px-5 text-[13px] font-medium shadow-none ${
                        isActive
                          ? "bg-brand-primary-dark text-white hover:bg-brand-primary-dark/90 hover:text-white"
                          : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        if (isActive) {
                          updateDraftFilters((prev) => ({
                            ...prev,
                            dateRange: { type: "", from: null, to: null },
                          }))
                          return
                        }

                        updateDraftFilters((prev) => ({
                          ...prev,
                          dateRange: {
                            type: preset.value,
                            ...preset.getRange(),
                          },
                        }))
                      }}
                    >
                      {preset.label}
                    </Button>
                  )
                })}
              </div>
              <Button
                variant="outline"
                className="w-full justify-center h-10 rounded-full border-gray-300 border-dashed text-[13px] font-medium text-text-secondary hover:bg-gray-50"
                onClick={() => {
                  const isActive = draftFilters.dateRange.type === "custom"

                  updateDraftFilters((prev) => ({
                    ...prev,
                    dateRange: isActive
                      ? { type: "", from: null, to: null }
                      : { type: "custom", from: new Date(), to: new Date() },
                  }))
                }}
              >
                <CalendarIcon className="mr-2 size-4 opacity-50" />
                Custom Date Range
              </Button>
            </div>

            <div className="space-y-3 mt-1">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-text-tertiary">
                Amount Range
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <span className="absolute top-1/2 left-4 -translate-y-1/2 text-sm text-text-tertiary">
                    $
                  </span>
                  <Input
                    className="h-10 rounded-full border-none bg-gray-100 pl-8 text-[13px] font-medium shadow-none placeholder:text-text-secondary"
                    placeholder="Min"
                    type="number"
                    value={draftFilters.amount.min}
                    onChange={(e) =>
                      updateDraftFilters((prev) => ({
                        ...prev,
                        amount: { ...prev.amount, min: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="relative">
                  <span className="absolute top-1/2 left-4 -translate-y-1/2 text-sm text-text-tertiary">
                    $
                  </span>
                  <Input
                    className="h-10 rounded-full border-none bg-gray-100 pl-8 text-[13px] font-medium shadow-none placeholder:text-text-secondary"
                    placeholder="Max"
                    type="number"
                    value={draftFilters.amount.max}
                    onChange={(e) =>
                      updateDraftFilters((prev) => ({
                        ...prev,
                        amount: { ...prev.amount, max: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-1 pb-4">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-text-tertiary">
                Currency
              </Label>
              <div className="flex flex-wrap gap-2">
                {CURRENCY_OPTIONS.map((currency) => {
                  const isActive = draftFilters.currency.includes(currency)
                  return (
                    <Button
                      key={currency}
                      variant="outline"
                      className={`h-9 rounded-full border-none px-5 text-[13px] font-medium shadow-none ${
                        isActive
                          ? "bg-brand-primary-dark text-white hover:bg-brand-primary-dark/90 hover:text-white"
                          : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                      }`}
                      onClick={() =>
                        updateDraftFilters((prev) => ({
                          ...prev,
                          currency: toggleArrayItem(prev.currency, currency),
                        }))
                      }
                    >
                      {currency}
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 bg-gray-50 p-4 px-5 sm:px-7 border-t border-gray-100">
          <div className="flex items-center justify-between gap-6">
            <Button
              variant="ghost"
              className="h-auto flex-1 justify-start font-bold text-text-secondary hover:bg-transparent hover:text-text-primary"
              onClick={resetDraft}
            >
              Clear All
            </Button>
            <Button
              className="flex-1 rounded-full bg-brand-primary-dark px-6 py-4.5 text-xs font-bold text-white shadow-none hover:bg-brand-primary-dark/90"
              onClick={() => {
                applyDraft()
                onApply?.()
              }}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
