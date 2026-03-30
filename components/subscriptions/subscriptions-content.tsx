"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteFooter } from "../shared/site-footer"
import { MRRChart } from "./mrr-chart"
import {
  SubscriptionPlansTable,
  type SubscriptionPlan,
} from "./subscription-plans-table"

const MOCK_PLANS: SubscriptionPlan[] = [
  {
    id: "1",
    name: "Premium Monthly",
    subscribers: 1240,
    price: "$29.99/mo",
    billingCycle: "Monthly",
    status: "Active",
  },
  {
    id: "2",
    name: "Basic Annual",
    subscribers: 850,
    price: "$199/yr",
    billingCycle: "Yearly",
    status: "Active",
  },
  {
    id: "3",
    name: "Enterprise",
    subscribers: 45,
    price: "$499/mo",
    billingCycle: "Custom",
    status: "Review",
  },
  {
    id: "4",
    name: "Free Tier",
    subscribers: 3100,
    price: "$0",
    billingCycle: "None",
    status: "Archived",
  },
]

export function SubscriptionsContent() {
  return (
    <div className="flex min-h-full w-full flex-col">
      <div className="flex flex-1 p-4 sm:p-6 lg:p-8 flex-col gap-8 md:gap-10">
        <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-text-primary">
              Subscriptions
            </h1>
            <p className="text-text-secondary font-medium">
              Manage your billing plans and monitor subscriber growth.
            </p>
          </div>
          <Button className="flex h-auto items-center gap-2 rounded-xl bg-brand-primary px-5 py-2 text-white hover:bg-brand-primary/90">
            <Plus className="size-4" />
            <span className="font-semibold">Create New Plan</span>
          </Button>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MRRChart />
          </div>

          <div className="rounded-4xl bg-brand-primary p-8 text-white flex flex-col justify-between shadow-xl min-h-64">
            <div className="space-y-1">
              <p className="text-xs font-bold text-surface-1 uppercase">
                Active Subscribers
              </p>
              <h2 className="text-4xl font-bold">5,235</h2>
              <p className="text-sm font-medium text-surface-1">
                Total subscribers across all 4 plans
              </p>
            </div>

            <div className="space-y-6 pt-8 mt-auto border-t border-surface-1/10">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="uppercase tracking-widest text-surface-1">
                    Conversion Rate
                  </span>
                  <span>3.2%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-surface-1/10 overflow-hidden">
                  <div
                    className="h-full bg-surface-1 rounded-l-full"
                    style={{ width: "32%" }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="uppercase tracking-widest text-surface-1">
                    Churn Rate
                  </span>
                  <span>1.4%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-surface-1/10 overflow-hidden">
                  <div
                    className="h-full bg-warning-6 rounded-l-full"
                    style={{ width: "14%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <SubscriptionPlansTable data={MOCK_PLANS} />
      </div>
      <SiteFooter />
    </div>
  )
}
