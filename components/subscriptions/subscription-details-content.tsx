"use client"

import { useQuery } from "@tanstack/react-query"
import { PauseCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SubscriptionKPIs } from "./subscription-kpis"
import { HealthOverview } from "./health-overview"
import { PlanSubscribersTable } from "./plan-subscribers-table"
import { PlanInfoSidebar } from "./plan-info-sidebar"
import { subscriptionQueryKeys } from "@/lib/api/v1/query-key-factory"
import { getSubscriptions } from "@/lib/api/v1/subscriptions/queries"
import { useParams } from "next/navigation"
import { buildPlanDetails } from "./subscription-view-model"

export function SubscriptionDetailsContent() {
  const { id } = useParams()
  const productId = String(id)
  const { data: subscriptionResponse } = useQuery({
    queryKey: subscriptionQueryKeys.list(1, 100, null, productId),
    queryFn: () => getSubscriptions({ product_id: productId, page_size: 100 }),
    enabled: Boolean(productId),
  })

  const plan = buildPlanDetails(productId, subscriptionResponse?.items ?? [])

  return (
    <div className="flex h-full w-full flex-col gap-8 p-4 sm:p-6 lg:p-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-secondary text-5xl font-black tracking-tight text-text-primary">
            Subscription Details
          </h1>
          <p className="font-primary text-base font-medium text-text-secondary">
            View and manage this subscription plan
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            disabled
            variant="outline"
            className="flex h-12 items-center gap-2 rounded-none border-text-primary/10 bg-transparent px-6 font-bold text-text-primary hover:bg-surface-2"
          >
            <div className="flex items-center justify-center">
              <PauseCircle className="size-5" />
            </div>
            <span>Subscription Actions</span>
          </Button>
        </div>
      </section>

      <SubscriptionKPIs plan={plan} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-8">
          <HealthOverview stats={plan.healthStats} />
          <PlanSubscribersTable data={plan.subscribers} />
        </div>

        <div className="lg:col-span-4">
          <PlanInfoSidebar plan={plan} />
        </div>
      </div>
    </div>
  )
}
