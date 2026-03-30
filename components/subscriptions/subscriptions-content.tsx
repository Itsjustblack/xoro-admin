"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteFooter } from "../shared/site-footer"
import { MRRChart } from "./mrr-chart"
import { SubscriptionPlansTable, type SubscriptionPlan } from "./subscription-plans-table"
import { cn } from "@/lib/utils"

const MOCK_PLANS: SubscriptionPlan[] = [
  { id: "1", name: "Premium Monthly", subscribers: 1240, price: "$29.99/mo", billingCycle: "Monthly", status: "Active" },
  { id: "2", name: "Basic Annual", subscribers: 850, price: "$199/yr", billingCycle: "Yearly", status: "Active" },
  { id: "3", name: "Enterprise", subscribers: 45, price: "$499/mo", billingCycle: "Custom", status: "Review" },
  { id: "4", name: "Free Tier", subscribers: 3100, price: "$0", billingCycle: "None", status: "Archived" },
]

export function SubscriptionsContent() {
  return (
    <div className="flex min-h-full w-full flex-col font-manrope">
      <div className="flex flex-1 p-4 sm:p-6 lg:p-8 flex-col gap-8 md:gap-10">
        {/* Top Header Section */}
        <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-text-primary font-clash-display">
              Subscriptions
            </h1>
            <p className="text-text-secondary font-medium">
              Manage your billing plans and monitor subscriber growth.
            </p>
          </div>
          <Button className="flex items-center gap-2 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white h-11 px-6 shadow-sm shadow-brand-primary/20">
            <Plus className="size-4" />
            <span className="font-semibold">Create New Plan</span>
          </Button>
        </section>

        {/* Analytics Section Grid */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* MRR Chart (Left Column) */}
          <div className="lg:col-span-2">
            <MRRChart />
          </div>

          {/* Subscriber Stats (Right Column) */}
          <div className="rounded-4xl bg-[#0A0521] p-8 text-white flex flex-col justify-between shadow-xl min-h-64">
            <div className="space-y-1">
              <p className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]">Active Subscribers</p>
              <h2 className="text-5xl font-black font-clash-display">5,235</h2>
              <p className="text-sm font-medium text-white/40">Total subscribers across all 4 plans</p>
            </div>

            <div className="space-y-6 pt-8 mt-auto border-t border-white/10">
              {/* Conversion Rate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="uppercase tracking-widest text-white/60">Conversion Rate</span>
                  <span>3.2%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '32%' }} />
                </div>
              </div>

              {/* Churn Rate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="uppercase tracking-widest text-white/60">Churn Rate</span>
                  <span>1.4%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-brand-primary-dark border border-white/20 rounded-full" style={{ width: '14%' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Plans Table */}
        <SubscriptionPlansTable data={MOCK_PLANS} />
      </div>
      <SiteFooter />
    </div>
  )
}
