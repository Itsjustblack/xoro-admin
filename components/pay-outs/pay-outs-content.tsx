"use client"

import MetricCard from "@/components/dashboard/metric-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SiteFooter } from "../shared/site-footer"
import { CreatePayoutSheet } from "./create-payout-sheet"

export function PayOutsContent() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-1 flex-col gap-10 p-4 sm:p-6 lg:p-8">
        <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-text-primary tracking-tight">
              Pay-Outs
            </h1>
            <p className="text-base font-medium text-text-secondary">
              Manage and track your outgoing merchant transfers and vendor payments.
            </p>
          </div>
          <CreatePayoutSheet>
            <Button className="flex items-center gap-2 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white h-11 px-6 shadow-sm shadow-brand-primary/20 font-bold">
              <Plus size={18} />
              <span>New Pay-Out</span>
            </Button>
          </CreatePayoutSheet>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <MetricCard
            title="Total Paid (MTD)"
            value="N/A"
            changeLabel=""
            iconClassName="text-brand-primary"
            changeClassName="text-success-2"
            borderClassName="border-brand-primary"
          />
          <MetricCard
            title="Pending Processing"
            value="N/A"
            changeLabel=""
            iconClassName="text-brand-primary"
            changeClassName="text-status-warning"
            borderClassName="border-brand-primary"
          />
          <MetricCard
            title="Failed Payouts"
            value="N/A"
            changeLabel=""
            iconClassName="text-status-danger"
            changeClassName="text-status-danger"
            borderClassName="border-status-danger text-status-warning!"
          />
        </section>
      </div>
      <SiteFooter />
    </div>
  )
}
