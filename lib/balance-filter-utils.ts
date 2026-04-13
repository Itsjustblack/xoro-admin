"use client"

import { isValid, subDays } from "date-fns"

export type FilterState = {
  status: string[]
  paymentMethod: string[]
  dateRange: { type: string; from: Date | null; to: Date | null }
  amount: { min: string; max: string }
  currency: string[]
}

export const createInitialFilterState = (): FilterState => ({
  status: [],
  paymentMethod: [],
  dateRange: { type: "", from: null, to: null },
  amount: { min: "", max: "" },
  currency: [],
})

export const initialFilterState = createInitialFilterState()

export const STATUS_OPTIONS = ["Success", "Pending", "Failed"]

const DATA_STATUS_MAP: Record<string, string> = {
  Success: "Completed",
  Pending: "Pending",
  Failed: "Failed",
}

export const PAYMENT_METHOD_OPTIONS = [
  "Card",
  "Transfer",
  "Mobile Money",
  "Crypto",
]

export const DATE_PRESETS = [
  {
    label: "Today",
    value: "today",
    getRange: () => ({ from: new Date(), to: new Date() }),
  },
  {
    label: "7D",
    value: "7d",
    getRange: () => ({ from: subDays(new Date(), 7), to: new Date() }),
  },
  {
    label: "30D",
    value: "30d",
    getRange: () => ({ from: subDays(new Date(), 30), to: new Date() }),
  },
]

export const CURRENCY_OPTIONS = ["NGN", "USD", "EUR", "USDT"]

const parseTransactionDate = (value: string): Date | null => {
  const parsed = new Date(value)
  return isValid(parsed) ? parsed : null
}

export function applyBalanceFilters(
  transaction: {
    status: string
    paymentMethod?: string
    currency?: string
    amount: string | number
    date?: string
    created_at?: string
  },
  filters: FilterState,
): boolean {
  if (filters.status.length > 0) {
    const dataStatusFilter = filters.status.map((status) => {
      return DATA_STATUS_MAP[status] || status
    })

    if (!dataStatusFilter.includes(transaction.status)) return false
  }

  if (
    filters.paymentMethod.length > 0 &&
    !filters.paymentMethod.includes(transaction.paymentMethod ?? "")
  ) {
    return false
  }

  if (
    filters.currency.length > 0 &&
    !filters.currency.includes(transaction.currency ?? "")
  ) {
    return false
  }

  if (filters.amount.min || filters.amount.max) {
    const amountVal =
      typeof transaction.amount === "number"
        ? transaction.amount
        : parseFloat(transaction.amount.replace(/[^0-9.-]+/g, ""))
    const min = filters.amount.min ? parseFloat(filters.amount.min) : -Infinity
    const max = filters.amount.max ? parseFloat(filters.amount.max) : Infinity

    if (Number.isNaN(amountVal) || amountVal < min || amountVal > max) {
      return false
    }
  }

  if (filters.dateRange.type && filters.dateRange.from && filters.dateRange.to) {
    const txDate = parseTransactionDate(
      transaction.date ?? transaction.created_at ?? "",
    )
    if (!txDate) return false

    txDate.setHours(0, 0, 0, 0)

    const from = new Date(filters.dateRange.from)
    from.setHours(0, 0, 0, 0)

    const to = new Date(filters.dateRange.to)
    to.setHours(0, 0, 0, 0)

    if (txDate < from || txDate > to) return false
  }

  return true
}
