"use client"

import { Calendar, Clock, CreditCard, Eye } from "lucide-react"

import type { CheckoutLink } from "@/lib/types"

interface CheckoutLinkDetailsGridProps {
  link?: CheckoutLink
}

function formatDate(value?: string) {
  if (!value) return "-"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
  }).format(date)
}

function getExpiryLabel(expiresAt?: string) {
  if (!expiresAt) return "No expiry set"
  return formatDate(expiresAt)
}

export function CheckoutLinkDetailsGrid({
  link,
}: CheckoutLinkDetailsGridProps) {
  return (
    <section className="space-y-6">
      <h2 className="px-2 text-2xl font-bold text-text-primary">
        Link Details
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Date Created",
            value: formatDate(link?.created_at),
            icon: Calendar,
          },
          {
            label: "Link Expiry",
            value: getExpiryLabel(link?.expires_at),
            icon: Clock,
          },
          {
            label: "Total Uses",
            value: String(link?.current_uses ?? 0),
            icon: Eye,
          },
          {
            label: "Payment Type",
            value:
              link?.amount_type === "dynamic"
                ? "Flexible Amount"
                : "Fixed Amount",
            icon: CreditCard,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-3xl border border-surface-3 bg-surface-1 p-6 shadow-sm"
          >
            <div className="">
              <p className="text-[10px] font-bold uppercase text-text-muted">
                {item.label}
              </p>
              <p className="font-bold text-sm text-text-primary">{item.value}</p>
            </div>
            <item.icon className="size-5 text-text-muted/50" />
          </div>
        ))}
      </div>
    </section>
  )
}
