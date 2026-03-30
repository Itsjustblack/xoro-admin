"use client"

import * as React from "react"
import { 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal
} from "lucide-react"

import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table"

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
    header: () => <span className="text-xs font-semibold uppercase text-text-muted">Plan Name</span>,
    cell: ({ row }) => <span className="font-bold text-text-primary">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "subscribers",
    header: () => <span className="text-xs font-semibold uppercase text-text-muted">Subscribers</span>,
    cell: ({ row }) => <span className="text-text-secondary font-medium">{row.getValue("subscribers").toLocaleString()}</span>,
  },
  {
    accessorKey: "price",
    header: () => <span className="text-xs font-semibold uppercase text-text-muted">Price</span>,
    cell: ({ row }) => <span className="text-text-secondary font-medium">{row.getValue("price")}</span>,
  },
  {
    accessorKey: "billingCycle",
    header: () => <span className="text-xs font-semibold uppercase text-text-muted">Billing Cycle</span>,
    cell: ({ row }) => (
      <Badge className="bg-surface-3 text-text-subtitle border-0 font-bold text-[10px] rounded-md px-2 py-0.5">
        {row.getValue("billingCycle")}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: () => <span className="text-xs font-semibold uppercase text-text-muted">Status</span>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge 
          className={cn(
            "rounded-md px-2 py-0.5 font-bold text-[10px] border-0",
            status === "Active" && "bg-success-2/15 text-success-2",
            status === "Review" && "bg-status-warning-soft text-status-warning",
            status === "Archived" && "bg-surface-6 text-text-muted"
          )}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    header: () => <span className="text-xs font-semibold uppercase text-text-muted">Actions</span>,
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Button variant="ghost" className={cn(
          "font-black text-[10px] uppercase tracking-widest px-0 h-auto hover:bg-transparent",
          status === "Archived" ? "text-brand-primary" : "text-brand-primary"
        )}>
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
  return (
    <div className="rounded-4xl border border-surface-3 bg-surface-1 shadow-sm overflow-hidden">
      <div className="p-8 pb-4">
        <h3 className="text-xl font-bold text-text-primary">Subscription Plans</h3>
      </div>
      
      <DataTable 
        columns={columns} 
        data={data}
        getRowId={(row) => row.id}
        tableWrapperClassName="w-full"
        headerRowClassName="bg-surface-2/40 border-b border-surface-6 hover:bg-surface-2/40"
        headClassName="h-14 px-8 py-4"
        bodyRowClassName="border-b border-surface-3 last:border-0 hover:bg-surface-2/20 transition-colors"
        bodyCellClassName="px-8 py-6 h-auto"
      />

      <div className="flex items-center justify-between p-8 bg-surface-2/10">
        <p className="text-sm font-medium text-text-secondary">
          Showing {data.length} of 42 plans
        </p>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-surface-6 bg-white hover:bg-surface-5">
            <ChevronLeft className="size-4" />
          </Button>
          {[1, 2, 3].map((page, i) => (
            <Button
              key={i}
              variant={page === 1 ? "default" : "outline"}
              className={cn(
                "h-9 w-9 rounded-lg border-transparent font-bold text-sm",
                page === 1 ? "bg-brand-primary-2 text-white hover:bg-brand-primary-2/90" : "bg-transparent text-text-secondary hover:bg-white"
              )}
            >
              {page}
            </Button>
          ))}
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-surface-6 bg-white hover:bg-surface-5">
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
