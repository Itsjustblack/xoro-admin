"use client"

import { ChevronLeft, ChevronRight, FilterIcon, Search } from "lucide-react"
import Link from "next/link"

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
  billingCycle: string
  status: string
}

const columns: ColumnDef<SubscriptionPlan>[] = [
  {
    accessorKey: "name",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Product
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
        <span className="font-medium text-text-secondary">
          {subscribers.toLocaleString()}
        </span>
      )
    },
  },
  {
    accessorKey: "price",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Price Override
      </span>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-text-secondary">
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
      <Badge className="rounded-md border-0 bg-surface-3 px-2 py-0.5 text-[10px] font-bold text-text-subtitle">
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
            "rounded-md border-0 px-2 py-0.5 text-[10px] font-bold",
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
    cell: ({ row }) => (
      <Button
        asChild
        variant="ghost"
        className="h-auto px-0 font-black text-[10px] uppercase tracking-widest text-brand-primary hover:bg-transparent"
      >
        <Link href={`/subscriptions/${row.original.id}`}>View</Link>
      </Button>
    ),
  },
]

interface SubscriptionPlansTableProps {
  data: SubscriptionPlan[]
  isPending?: boolean
}

export function SubscriptionPlansTable({
  data,
  isPending = false,
}: SubscriptionPlansTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase()

    return data.filter((plan) => {
      if (!normalizedSearchTerm) {
        return true
      }

      return (
        plan.name.toLowerCase().includes(normalizedSearchTerm) ||
        plan.id.toLowerCase().includes(normalizedSearchTerm)
      )
    })
  }, [data, searchTerm])

  return (
    <div className="overflow-hidden rounded-4xl border border-surface-3 bg-surface-1 shadow-sm">
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
              onChange={(event) => setSearchTerm(event.target.value)}
              className="h-10 w-full pl-9 text-sm sm:w-60"
            />
          </div>
          <Button
            variant="outline"
            className="flex h-10 items-center justify-center gap-2 border-border-light bg-transparent px-4 font-satoshi text-text-subtitle"
          >
            <FilterIcon className="size-4" />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      <DataTable
        isPending={isPending}
        columns={columns}
        data={filteredData}
        getRowId={(row) => row.id}
        tableWrapperClassName="w-full"
        headerRowClassName="border-none bg-surface-2 hover:bg-surface-2"
        headClassName="h-14 px-6 py-4 *:font-bold"
        bodyRowClassName="border-surface-3 last:border-0 transition-colors"
        bodyCellClassName="h-auto px-6 py-4"
      />

      <div className="flex items-center justify-between border-t border-surface-3 bg-surface-2 px-6 py-4">
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
          {[1, 2, 3].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "default" : "outline"}
              className={cn(
                "h-9 w-9 rounded-lg border-transparent text-sm font-bold",
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
