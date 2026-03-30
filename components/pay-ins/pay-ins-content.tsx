"use client"

import MetricCard from "@/components/dashboard/metric-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockPayInKPIs, mockPayInTransactions } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Download } from "lucide-react"
import { useState } from "react"
import { PayInsTable } from "./pay-ins-table"

const TABS = ["All", "Card", "Transfer", "Crypto"] as const

export function PayInsContent() {
  const [activeTab, setActiveTab] = useState<string>("All")
  const filteredData = mockPayInTransactions.filter((tx) => {
    if (activeTab === "All") return true
    return tx.method === activeTab
  })

  return (
    <div className="flex h-full w-full flex-col gap-10 p-4 sm:p-6 lg:p-8">
      <section className="space-y-1">
        <h1 className="text-3xl font-black text-text-primary tracking-tight">
          Pay-Ins
        </h1>
        <p className="font-primary text-base font-medium text-text-secondary">
          Real-time overview of all incoming merchant transactions.
        </p>
      </section>

      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-fit">
          <TabsList
            variant="line"
            className="h-auto gap-0 border-b border-surface-6 p-0"
          >
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={cn(
                  "rounded-none bg-transparent px-6 pb-4 text-sm font-bold text-text-secondary transition-all",
                  "data-[state=active]:text-brand-primary-dark after:bg-brand-primary-dark",
                )}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="pb-4">
          <Button className="flex items-center gap-2 rounded-xl bg-brand-primary-dark hover:bg-brand-primary-2/90 text-white h-11 px-6 shadow-sm font-bold">
            <Download size={18} />
            <span>Export</span>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <MetricCard
          title="Total Volume"
          value={mockPayInKPIs.totalVolume}
          change={mockPayInKPIs.volumeChange}
          changeLabel="vs last month"
          iconClassName="text-brand-primary-dark"
          changeClassName="text-success-4"
          borderClassName="border-brand-primary-dark"
        />
        <MetricCard
          title="Transaction Count"
          value={mockPayInKPIs.transactionCount}
          change={mockPayInKPIs.countChange}
          changeLabel="vs last month"
          iconClassName="text-brand-primary"
          changeClassName="text-success-4"
          borderClassName="border-brand-primary"
        />
        <MetricCard
          title="Average Pay-In"
          value={mockPayInKPIs.averagePayIn}
          change="Steady"
          changeLabel=""
          iconClassName="text-text-secondary"
          changeClassName="text-text-muted"
          borderClassName="border-0"
        />
      </section>

      <PayInsTable data={filteredData} />
    </div>
  )
}
