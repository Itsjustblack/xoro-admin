"use client"

import { getAllCheckoutLinks } from "@/lib/api/v1/link/queries"
import { checkoutLinkQueryKeys } from "@/lib/api/v1/query-key-factory"
import { CheckoutLink } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { useCurrentMerchant } from "@/store/merchant"
import { useQuery } from "@tanstack/react-query"
import { Link2, Plus } from "lucide-react"

import MetricCard from "@/components/dashboard/metric-card"
import { Button } from "@/components/ui/button"
import { CursorClickIcon, PaymentIcon } from "../icons"
import { SiteFooter } from "../shared/site-footer"
import {
  CheckoutLinksTable,
  CheckoutLinkTableRow,
} from "./checkout-links-table"
import { CreateCheckoutLinkSheet } from "./create-checkout-link-sheet"

function formatCheckoutLinkDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
  }).format(date)
}

function mapCheckoutLinksToRows(
  checkoutLinks: CheckoutLink[],
): CheckoutLinkTableRow[] {
  return checkoutLinks.map((link) => ({
    id: link.id,
    productName: link.title,
    amount:
      link.amount === null
        ? "Flexible amount"
        : formatCurrency(link.amount, link.currency),
    linkUrl: link.url,
    status: link.is_active ? "Active" : "Inactive",
    createdAt: formatCheckoutLinkDate(link.created_at),
  }))
}

export function CheckoutLinksContent() {
  const merchant = useCurrentMerchant()
  const { data: checkoutLinks = [], isPending } = useQuery({
    queryKey: checkoutLinkQueryKeys.list(merchant?.id ?? ""),
    queryFn: () => getAllCheckoutLinks(merchant!.id),
    enabled: !!merchant?.id,
  })

  const tableRows = mapCheckoutLinksToRows(checkoutLinks)
  const activeLinks = checkoutLinks.filter((link) => link.is_active)
  const linksWithUsageLimit = checkoutLinks.filter(
    (link) => typeof link.max_uses === "number" && link.max_uses > 0,
  )
  const clickToPayRate =
    linksWithUsageLimit.length > 0
      ? `${Math.round(
          (linksWithUsageLimit.reduce(
            (total, link) => total + link.current_uses / (link.max_uses ?? 1),
            0,
          ) /
            linksWithUsageLimit.length) *
            100,
        )}%`
      : "N/A"

  return (
    <div className="flex min-h-full w-full flex-col">
      <div className="flex flex-1 p-4 sm:p-6 lg:p-8 flex-col gap-8 md:gap-10">
        <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-text-primary">
              Checkout Links
            </h1>
            <p className="text-text-secondary font-medium">
              Manage and share payment links for your products
            </p>
          </div>
          <CreateCheckoutLinkSheet>
            <Button className="flex h-auto items-center gap-2 rounded-xl bg-brand-primary px-5 py-2 text-white hover:bg-brand-primary/90">
              <Plus className="size-4" />
              <span className="font-semibold">Create Checkout Link</span>
            </Button>
          </CreateCheckoutLinkSheet>
        </section>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            isLoading={isPending}
            title="Total Links Generated"
            value={String(checkoutLinks.length)}
            changeLabel=""
            icon={<Link2 className="size-5" />}
            iconClassName="rounded-full text-brand-primary"
            changeClassName="text-success-2"
          />
          <MetricCard
            isLoading={isPending}
            title="Active Links"
            value={String(activeLinks.length)}
            change={String(
              activeLinks.reduce((total, link) => total + link.current_uses, 0),
            )}
            changeLabel="total successful uses"
            icon={<PaymentIcon className="size-5" />}
            iconClassName="rounded-full text-brand-primary"
            changeClassName="text-success-2"
          />
          <MetricCard
            isLoading={isPending}
            title="Avg. Click-to-Pay Rate"
            value={clickToPayRate}
            changeLabel=""
            icon={<CursorClickIcon className="size-5" />}
            iconClassName="rounded-full text-brand-primary"
            changeClassName="text-text-muted"
            borderClassName="border-brand-primary"
          />
        </section>

        <CheckoutLinksTable
          data={tableRows}
          totalCount={checkoutLinks.length}
          isPending={isPending}
        />
      </div>
      <SiteFooter />
    </div>
  )
}
