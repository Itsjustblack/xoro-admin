"use client"

import { Button } from "@/components/ui/button"
import { mockBeneficiaries } from "@/lib/mock-data"
import { Banknote, Plus, Users } from "lucide-react"
import MetricCard from "../dashboard/metric-card"
import { ShapesIcon2 } from "../icons"
import { BeneficiariesTable } from "./beneficiaries-table"

export function BeneficiariesContent() {
  return (
    <div className="flex h-full p-4 sm:p-6 lg:p-8 w-full flex-col gap-6 md:gap-8">
      <section className="flex flex-col gap-6 md:justify-between">
        <div>
          <h1 className="text-2xl font-black text-text-primary md:text-3xl">
            Beneficiaries Management
          </h1>
          <p className="mt-1 text-sm text-text-secondary md:text-base">
            Manage and organize your payout recipients in one place.
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            className="flex items-center rounded-xl h-auto py-2 px-4 hover:bg-surface-2 gap-2 border-surface-6 bg-surface-1 text-text-primary font-medium"
          >
            <ShapesIcon2 className="size-4" />
            <span>Manage Categories</span>
          </Button>
          <Button className="flex items-center rounded-xl gap-2 px-4 py-2 h-auto bg-brand-primary text-white hover:bg-brand-primary/90">
            <Plus className="size-4" />
            <span>Add Beneficiary</span>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MetricCard
          title="TOTAL AMOUNT (ACROSS ALL ACCOUNTS)"
          value="$0.00"
          changeLabel=""
          icon={<Banknote className="size-5" />}
          borderClassName="border-transparent"
          iconClassName="p-2 rounded-lg bg-brand-primary-dark/10 text-brand-primary"
        />
        <MetricCard
          title="TOTAL BENEFICIARIES"
          value="0"
          changeLabel=""
          icon={<Users className="size-5" />}
          iconClassName="p-2 rounded-lg bg-brand-primary-dark/10 text-brand-primary"
          borderClassName="border-transparent"
        />
      </section>

      <section className="flex flex-col gap-4 w-full">
        <BeneficiariesTable data={mockBeneficiaries} />
      </section>
    </div>
  )
}
