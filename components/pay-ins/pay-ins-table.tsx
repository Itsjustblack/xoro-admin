"use client"

import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { PayInTransaction } from "@/lib/types"
import { cn } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table"
import {
  MoreVertical,
  Bitcoin,
  Landmark,
} from "lucide-react"
import { Card } from "../icons"

const columns: ColumnDef<PayInTransaction>[] = [
  {
    accessorKey: "customerName",
    header: () => (
      <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
        Customer
      </span>
    ),
    cell: ({ row }) => {
      const initials = row.original.customerName
        .split(" ")
        .map((n) => n[0])
        .join("")
      return (
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-brand-primary-2/10 text-brand-primary-2 text-xs font-black uppercase">
            {initials}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-text-primary">
              {row.original.customerName}
            </span>
            <span className="text-xs text-text-muted">
              {row.original.email}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "reference",
    header: () => (
      <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
        Reference
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium text-text-muted">
        {row.getValue("reference")}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: () => (
      <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
        Amount
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm font-black text-text-primary">
        {row.getValue("amount")}
      </span>
    ),
  },
  {
    accessorKey: "method",
    header: () => (
      <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
        Method
      </span>
    ),
    cell: ({ row }) => {
      const method = row.getValue("method") as string
      return (
        <div className="flex items-center justify-center gap-2 bg-surface-3 rounded-full p-1 px-2 w-fit text-text-primary">
          {method === "Card" && <Card size={14} />}
          {method === "Transfer" && <Landmark size={14} />}
          {method === "Crypto" && <Bitcoin className="-rotate-10" size={14} />}
          <span className="text-sm font-medium">{method}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
        Status
      </span>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          className={cn(
            "rounded-full px-3 py-1 font-bold text-xs border-0",
            status === "Success" &&
              "bg-status-success-soft text-status-success",
            status === "Pending" &&
              "bg-status-warning-soft text-status-warning",
            status === "Failed" && "bg-status-danger-soft text-status-danger",
          )}
        >
          <div className="flex items-center gap-1.5">
            <div
              className={cn(
                "size-1.5 rounded-full",
                status === "Success" && "bg-status-success",
                status === "Pending" && "bg-status-warning",
                status === "Failed" && "bg-status-danger",
              )}
            />
            {status}
          </div>
        </Badge>
      )
    },
  },
  {
    accessorKey: "date",
    header: () => (
      <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
        Date
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium text-text-muted">
        {row.getValue("date")}
      </span>
    ),
  },
  {
    id: "action",
    header: () => (
      <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
        Action
      </span>
    ),
    cell: () => (
      <Button
        variant="ghost"
        size="icon"
        className="size-8 text-text-muted hover:bg-surface-2"
      >
        <MoreVertical size={16} />
      </Button>
    ),
  },
]

interface PayInsTableProps {
  data: PayInTransaction[]
}

export function PayInsTable({ data }: PayInsTableProps) {
  return (
    <div className="flex flex-col rounded-4xl border border-surface-3 bg-white shadow-sm overflow-hidden">
      <section className="w-full">
        <DataTable
          data={data}
          columns={columns}
          isPending={false}
          getRowId={(row) => row.id}
          withPagination={false}
          tableWrapperClassName="w-full"
          headerRowClassName="border-b bg-surface-2 border-surface-3"
          headClassName="h-14 px-8 text-xs py-4 font-bold"
          bodyRowClassName="border-b border-surface-2 last:border-0 transition-colors hover:bg-surface-2"
          bodyCellClassName="px-6 py-4"
        />
      </section>

      <div className="flex h-16 items-center justify-between px-6 py-4 border-t border-surface-3 bg-surface-2">
        <p className="text-sm font-medium text-text-muted">
          Showing 1-5 of 128 results
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-10 px-6 rounded-xl border-surface-3 bg-white text-text-secondary font-bold hover:bg-surface-2"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="h-10 px-6 rounded-xl border-surface-3 bg-white text-text-secondary font-bold hover:bg-surface-2"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
