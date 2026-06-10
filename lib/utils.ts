import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CRYPTO_CURRENCIES } from "@/lib/constants"

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
  const isCrypto =
    currency &&
    (CRYPTO_CURRENCIES as readonly string[]).includes(currency.toUpperCase())

  if (isCrypto) {
    const formatted = new Intl.NumberFormat("en-NG", {
      maximumFractionDigits: 2,
    }).format(value)
    return `${currency.toUpperCase()} ${formatted}`
  }

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
  return new Intl.NumberFormat().format(value)
}

export function formatPercent(value: number) {
  return `${value.toFixed(1)}%`
}
