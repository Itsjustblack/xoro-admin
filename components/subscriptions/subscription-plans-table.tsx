"use client"

import { ChevronLeft, ChevronRight, FilterIcon, Search } from "lucide-react"

import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table"
import { useMemo, useState } from "react"

export interface SubscriptionPlan {
  id: string
  name: string
  subscribers: number
  price: string
  billingCycle: "Monthly" | "Yearly" | "Custom" | "None"
  status: "Active" | "Review" | "Archived"
}

const columns: ColumnDef<SubscriptionPlan>[] = [
  {
    accessorKey: "name",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Plan Name
      </span>
    ),
    cell: ({ row }) => (
      <span className="font-bold text-text-primary">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "subscribers",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Subscribers
      </span>
    ),
    cell: ({ row }) => {
      const subscribers = row.getValue("subscribers") as number

      return (
        <span className="text-text-secondary font-medium">
          {subscribers.toLocaleString()}
        </span>
      )
    },
  },
  {
    accessorKey: "price",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Price
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-text-secondary font-medium">
        {row.getValue("price")}
      </span>
    ),
  },
  {
    accessorKey: "billingCycle",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Billing Cycle
      </span>
    ),
    cell: ({ row }) => (
      <Badge className="bg-surface-3 text-text-subtitle border-0 font-bold text-[10px] rounded-md px-2 py-0.5">
        {row.getValue("billingCycle")}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Status
      </span>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          className={cn(
            "rounded-md px-2 py-0.5 font-bold text-[10px] border-0",
            status === "Active" && "bg-status-success-soft text-status-success",
            status === "Review" && "bg-status-warning-soft text-status-warning",
            status === "Archived" && "bg-surface-6 text-text-muted",
          )}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Actions
      </span>
    ),
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Button
          variant="ghost"
          className={cn(
            "font-black text-[10px] uppercase tracking-widest px-0 h-auto hover:bg-transparent",
            status === "Archived" ? "text-brand-primary" : "text-brand-primary",
          )}
        >
          {status === "Archived" ? "Restore" : "Edit"}
        </Button>
      )
    },
  },
]

interface SubscriptionPlansTableProps {
  data: SubscriptionPlan[]
}

export function SubscriptionPlansTable({ data }: SubscriptionPlansTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [pageIndex, setPageIndex] = useState(0)

  const filteredData = useMemo(() => {
    return data.filter((plan) =>
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [data, searchTerm])

  return (
    <div className="rounded-4xl border border-surface-3 bg-surface-1 shadow-sm overflow-hidden">
      <div className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-bold text-text-primary">
          Subscription Plans
        </h3>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search plans..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPageIndex(0)
              }}
              className="h-10 w-full pl-9 sm:w-60 text-sm"
            />
          </div>
          <Button
            variant="outline"
            className="flex h-10 items-center px-4 font-satoshi justify-center gap-2 border-border-light text-text-subtitle bg-transparent"
          >
            <FilterIcon className="size-4" />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      <DataTable
        isPending={false}
        columns={columns}
        data={filteredData}
        getRowId={(row) => row.id}
        tableWrapperClassName="w-full"
        headerRowClassName="bg-surface-2 border-none hover:bg-surface-2"
        headClassName="h-14 px-6 *:font-bold py-4"
        bodyRowClassName="border-surface-3 last:border-0 transition-colors"
        bodyCellClassName="px-6 py-4 h-auto"
      />

      <div className="flex items-center justify-between p-6 border-t border-surface-3 bg-surface-2">
        <p className="text-sm font-medium text-text-secondary">
          Showing {filteredData.length} of {data.length} plans
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-surface-6 bg-white hover:bg-surface-5"
          >
            <ChevronLeft className="size-4" />
          </Button>
          {[1, 2, 3].map((page, i) => (
            <Button
              key={i}
              variant={page === 1 ? "default" : "outline"}
              className={cn(
                "h-9 w-9 rounded-lg border-transparent font-bold text-sm",
                page === 1
                  ? "bg-brand-primary text-white hover:bg-brand-primary"
                  : "bg-transparent text-text-secondary hover:bg-white",
              )}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-surface-6 bg-white hover:bg-surface-5"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
