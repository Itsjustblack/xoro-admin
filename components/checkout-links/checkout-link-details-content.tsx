"use client"

import {
  Calendar,
  Copy,
  CreditCard,
  Eye,
  Users,
} from "lucide-react"
import { useMemo, useState } from "react"

import MetricCard from "@/components/dashboard/metric-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCheckoutLinkById } from "@/lib/api/v1/link/queries"
import { checkoutLinkQueryKeys } from "@/lib/api/v1/query-key-factory"
import type { CheckoutLink, CheckoutLinkDetails } from "@/lib/types"
import { cn, formatCurrency } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { ProInsights } from "../shared/pro-insights"
import { SiteFooter } from "../shared/site-footer"
import { CheckoutLinkDetailsGrid } from "./checkout-link-details-grid"
import { CheckoutLinkDetailsTable } from "./checkout-link-details-table"
import { PaymentActivityChart } from "./payment-activity-chart"

interface CheckoutLinkDetailsContentProps {
  id: string
}

function getAmountLabel(link?: CheckoutLink) {
  if (!link) return "-"
  if (link.amount === null) return "Flexible amount"
  return formatCurrency(link.amount, link.currency)
}

export function CheckoutLinkDetailsContent({
  id,
}: CheckoutLinkDetailsContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { data: link, isPending } = useQuery<CheckoutLinkDetails>({
    queryKey: checkoutLinkQueryKeys.detail(id),
    queryFn: () => getCheckoutLinkById(id),
    enabled: !!id,
  })

  const filteredTransactions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    const transactions = link?.transactions ?? []

    if (!query) return transactions

    return transactions.filter((transaction) =>
      [
        transaction.customer.name,
        transaction.customer.email,
        transaction.reference,
        transaction.status,
        transaction.type,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    )
  }, [link, searchQuery])

  return (
    <div className="flex min-h-full w-full flex-col">
      <div className="flex flex-1 flex-col gap-8 p-4 sm:p-6 md:gap-10 lg:p-8">
        <section className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-text-primary">
                {link?.title ?? "Checkout Link Details"}
              </h1>
              <Badge
                className={cn(
                  "border-0 px-2.5 py-0.5 text-[10px] font-bold tracking-widest",
                  link?.is_active
                    ? "bg-success-2/10 text-success-2"
                    : "bg-status-danger-soft text-status-danger",
                )}
              >
                {link?.is_active ? "ACTIVE" : "INACTIVE"}
              </Badge>
            </div>
            <p className="font-medium text-text-secondary">
              {link?.description ?? "View and monitor this checkout link."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-11 rounded-xl border-surface-6 bg-white px-6 font-semibold text-text-primary"
            >
              Share
            </Button>
            <Button className="h-11 rounded-xl bg-brand-primary px-6 font-semibold text-white hover:bg-brand-primary-dark">
              <Copy className="size-4" />
              <span>Copy Link</span>
            </Button>
            <Button
              variant="outline"
              className="h-11 rounded-xl border-status-danger bg-white px-6 font-semibold text-status-danger hover:bg-status-danger/5"
            >
              Disable Link
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Link Amount"
            value={getAmountLabel(link)}
            changeLabel={link?.currency ?? ""}
            icon={<CreditCard className="size-5" />}
            iconClassName="rounded-full bg-brand-primary/10 p-2 text-brand-primary"
          />
          <MetricCard
            title="Current Uses"
            value={String(link?.current_uses ?? 0)}
            changeLabel="Successful checkouts"
            icon={<Users className="size-5" />}
            iconClassName="rounded-full bg-brand-primary/10 p-2 text-brand-primary"
            changeClassName="text-text-muted"
          />
          <MetricCard
            title="Checkout Type"
            value={link?.amount_type === "dynamic" ? "Flexible" : "Fixed"}
            changeLabel={link?.type ? link.type.replace("_", " ") : ""}
            icon={<Eye className="size-5" />}
            iconClassName="rounded-full bg-brand-primary/10 p-2 text-brand-primary"
            changeClassName="text-text-muted"
          />
          <MetricCard
            title="Mode"
            value={link?.mode?.toUpperCase() ?? "-"}
            change={
              link?.is_active ? "Ready to accept payments" : "Link disabled"
            }
            changeLabel=""
            icon={<Calendar className="size-5" />}
            iconClassName="rounded-full bg-brand-primary/10 p-2 text-brand-primary"
            changeClassName={
              link?.is_active ? "text-success-2" : "text-status-danger"
            }
          />
        </section>

        <PaymentActivityChart />

        <CheckoutLinkDetailsTable
          data={filteredTransactions}
          totalCount={link?.transactions?.length ?? 0}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          isPending={isPending}
        />

        <CheckoutLinkDetailsGrid link={link} />

        <ProInsights 
          content="Traffic peaked on Jan 13th following your social share. Consider adding a 'Suggested Amount' to increase average donation value by up to 15%."
          className="mt-4"
        />
      </div>
      <SiteFooter />
    </div>
  )
}
