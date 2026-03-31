"use client"

import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { RefundRequest } from "@/lib/types"
import { cn } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table"

const columns: ColumnDef<RefundRequest>[] = [
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
          <div className={cn("flex size-10 items-center justify-center rounded-full text-xs font-black uppercase", 
            row.original.avatarColor
          )}>
            {initials}
          </div>
          <span className="font-bold text-text-primary">
            {row.original.customerName}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "transactionId",
    header: () => (
      <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
        Transaction ID
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-xs bg-surface-3 px-2 py-1 rounded-md font-medium text-text-muted">
        {row.getValue("transactionId")}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: () => (
      <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
        Refund Amount
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm font-black text-brand-primary">
        {row.getValue("amount")}
      </span>
    ),
  },
  {
    accessorKey: "reason",
    header: () => (
      <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
        Reason
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium text-text-secondary">
        {row.getValue("reason")}
      </span>
    ),
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
            "rounded-full px-2 py-1 font-bold text-xs border-0",
            status === "Completed" && "bg-status-success-soft text-status-success",
            status === "Processing" && "bg-accent-blue-soft text-accent-blue",
            status === "Failed" && "bg-status-danger-soft text-status-danger",
            status === "Pending" && "bg-surface-3 text-text-heading",
          )}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "date",
    header: () => (
      <span className="text-xs font-bold uppercase tracking-widest text-right block text-text-muted">
        Date
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium text-text-muted text-right block">
        {row.getValue("date")}
      </span>
    ),
  },
]

interface RefundsTableProps {
  data: RefundRequest[]
}

export function RefundsTable({ data }: RefundsTableProps) {
  return (
    <div className="flex flex-col rounded-4xl border border-surface-3 bg-surface-1 shadow-sm overflow-hidden">
      <section className="w-full">
        <DataTable
          data={data}
          columns={columns}
          isPending={false}
          getRowId={(row) => row.id}
          withPagination={false}
          tableWrapperClassName="w-full"
          headerRowClassName="border-b bg-surface-2 border-surface-3"
          headClassName="h-14 px-6 py-4 font-bold"
          bodyRowClassName="border-b border-surface-2 last:border-0 transition-colors hover:bg-surface-2"
          bodyCellClassName="px-6 py-4"
        />
      </section>

      <div className="flex items-center justify-between px-6 py-4 border-t border-surface-3 bg-surface-2">
        <p className="text-sm font-medium text-text-muted">
          Showing 1 to 5 of 24 results
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-6.5 px-3 text-xs rounded-md border-surface-3 bg-surface-1 text-text-secondary font-bold hover:bg-surface-3"
          >
            Previous
          </Button>
          <Button
          variant="outline"
            className="h-6.5 px-3 text-xs rounded-md border-surface-3 bg-surface-1 text-text-secondary font-bold hover:bg-surface-3"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
