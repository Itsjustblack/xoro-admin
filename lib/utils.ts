import { clsx, type ClassValue } from "clsx"
import { format, isToday, isYesterday } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function maskEmail(email: string) {
  const [name, domain] = email.split("@")
  if (!name || !domain) return ""
  if (name.length <= 2) return `${name[0] ?? ""}*@${domain}`
  return `${name[0]}${"*".repeat(Math.max(1, name.length - 2))}${name[name.length - 1]}@${domain}`
}

export function formatCurrency(value: number, currency?: string) {
  try {
    return new Intl.NumberFormat("en-NG", {
      style: currency ? "currency" : "decimal",
      currency,
      maximumFractionDigits: 2,
    }).format(value)
  } catch {
    return new Intl.NumberFormat("en-NG", {
      maximumFractionDigits: 2,
    }).format(value)
  }
}

export function formatCount(value: number) {
  return new Intl.NumberFormat("en-NG").format(value)
}

export function formatPercent(value: number) {
  return `${value.toFixed(1)}%`
}

function formatDateValue(
  value: string | null | undefined,
  options: Intl.DateTimeFormatOptions,
) {
  if (!value) {
    return ""
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat("en-NG", options).format(date)
}

function getValidDate(value?: string | null) {
  if (!value) {
    return null
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime()) || date.getTime() === 0) {
    return null
  }

  return date
}

export function formatChartDate(value?: string | null) {
  return formatDateValue(value, {
    month: "short",
    day: "numeric",
  })
}

export function formatChartDateTime(value?: string | null) {
  return formatDateValue(value, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function formatTransactionDate(value?: string | null, fallback = "-") {
  const date = getValidDate(value)

  if (!date) {
    return fallback
  }

  if (isToday(date)) {
    return `Today, ${format(date, "p")}`
  }

  if (isYesterday(date)) {
    return `Yesterday, ${format(date, "p")}`
  }

  return format(date, "MMMM d, yyyy p")
}

export function getInitials(name?: string, fallback = "--") {
  const initials =
    name
      ?.trim()
      .split(/\s+/)
      .map((part) => part[0] ?? "")
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? ""

  return initials || fallback
}
