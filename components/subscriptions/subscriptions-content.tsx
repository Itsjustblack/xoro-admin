"use client"

import { useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { analyticsQueryKeys, subscriptionQueryKeys } from "@/lib/api/v1/query-key-factory"
import { getSubscriptions } from "@/lib/api/v1/subscriptions/queries"
import { SiteFooter } from "../shared/site-footer"
import { MRRChart } from "./mrr-chart"
import { SubscriptionPlansTable } from "./subscription-plans-table"
import { AddSubscriptionSheet } from "./add-subscription-sheet"
import {
  buildSubscriptionPlans,
  buildSubscriptionTrend,
  getSubscriptionCountLabel,
  getTrendChangeLabel,
} from "./subscription-view-model"
import { getSubscriptionAnalytics } from "@/lib/api/v1/analytics/queries"

export function SubscriptionsContent() {
  const { data: subscriptionResponse, isPending } = useQuery({
    queryKey: subscriptionQueryKeys.list(1, 100),
    queryFn: () => getSubscriptions({ page: 1, page_size: 100 }),
  })

  const { data: subscriptionAnalytics } = useQuery({
    queryKey: analyticsQueryKeys.subscriptions(),
    queryFn: () => getSubscriptionAnalytics(),
  })


const activeSubscriptions = subscriptionAnalytics?.active ?? 0
const totalSubscriptions = subscriptionAnalytics?.total ?? 0
const subscriptions = subscriptionResponse?.items ?? []
const plans = buildSubscriptionPlans(subscriptions)
const trend = buildSubscriptionTrend(subscriptions)

const activeRate = totalSubscriptions > 0
  ? `${Math.round((activeSubscriptions / totalSubscriptions) * 100)}%`
  : "0%"

const churnedSubscriptions = (subscriptionAnalytics?.cancelled ?? 0) + (subscriptionAnalytics?.expired ?? 0)
const churnRate = totalSubscriptions > 0
  ? `${Math.round((churnedSubscriptions / totalSubscriptions) * 100)}%`
  : "0%"

  return (
    <div className="flex min-h-full w-full flex-col">
      <div className="flex flex-1 flex-col gap-8 p-4 md:gap-10 sm:p-6 lg:p-8">
        <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-text-primary">
              Subscriptions
            </h1>
            <p className="font-medium text-text-secondary">
              Manage your billing plans and monitor subscriber growth.
            </p>
          </div>
          <AddSubscriptionSheet>
            <Button
              className="flex h-auto items-center gap-2 rounded-xl bg-brand-primary px-5 py-2 text-white hover:bg-brand-primary/90"
            >
              <Plus className="size-4" />
              <span className="font-semibold">Add New Subscription</span>
            </Button>
          </AddSubscriptionSheet>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MRRChart
               data={trend}
               total={totalSubscriptions}
               changeLabel={getTrendChangeLabel(trend)}
            />
          </div>

          <div className="flex min-h-64 flex-col justify-between rounded-4xl bg-brand-primary p-8 text-white shadow-xl">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase text-surface-1">
                Active Subscriptions
              </p>
              <h2 className="text-4xl font-bold">
                {activeSubscriptions.toLocaleString()}
              </h2>
              <p className="text-sm font-medium text-surface-1">
                {getSubscriptionCountLabel(totalSubscriptions)} across{" "}
                {/* {plans.length.toLocaleString()} plans */}
              </p>
            </div>

            <div className="mt-auto space-y-6 border-t border-surface-1/10 pt-8">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="uppercase tracking-widest text-surface-1">
                    Active Rate
                  </span>
                  <span>{activeRate}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-1/10">
                  <div
                    className="h-full rounded-l-full bg-surface-1"
                    style={{ width: activeRate }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="uppercase tracking-widest text-surface-1">
                    Churn Rate
                  </span>
                  <span>{churnRate}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-1/10">
                  <div
                    className="h-full rounded-l-full bg-warning-6"
                    style={{ width: churnRate }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <SubscriptionPlansTable data={plans} isPending={isPending} />
      </div>
      <SiteFooter />
    </div>
  )
}
