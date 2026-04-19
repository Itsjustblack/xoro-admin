"use client"

import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  ListFilter,
  Search,
} from "lucide-react"

import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { IBulkTransaction } from "@/lib/types"
import { cn } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table"

const columns: ColumnDef<IBulkTransaction>[] = [
  {
    id: "name",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Name
      </span>
    ),
    cell: ({ row }) => (
      <span className="font-bold text-brand-primary">
        {row.original.customer.name ?? row.original.details.customer_name}
      </span>
    ),
  },
  {
    id: "identifier",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Identifier
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-text-secondary">{row.original.customer.email}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Amount
      </span>
    ),
    cell: ({ row }) => (
      <span className="font-bold text-text-primary">
        NGN{" "}
        {Number(row.getValue("amount")).toLocaleString("en-NG", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
    ),
  },
  {
    id: "method",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Method
      </span>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-text-secondary">
        <LayoutGrid className="size-4" />
        <span>{row.original.details.bank}</span>
      </div>
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
      const status = String(row.getValue("status"))

      return (
        <div
          className={cn(
            "rounded-full px-3 py-1 font-medium",
            status === "Success" && "bg-success-2/15 text-success-2",
            status === "Pending" &&
              "bg-status-warning-soft text-status-warning",
            status === "Failed" && "bg-status-danger-soft text-status-danger",
          )}
        >
          {status}
        </div>
      )
    },
  },
]

interface BulkPayoutDetailsTableProps {
  data: IBulkTransaction[]
  totalCount: number
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  isPending: boolean
}

export function BulkPayoutDetailsTable({
  data,
  totalCount,
  searchQuery,
  onSearchQueryChange,
  isPending,
}: BulkPayoutDetailsTableProps) {
  return (
    <section className="flex flex-col overflow-hidden rounded-4xl border border-surface-3 bg-surface-1 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-surface-6 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="size-1 rounded-full bg-text-muted" />
          <p className="text-sm font-medium text-text-secondary">
            Some payouts may take longer depending on payment method
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search recipients..."
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              className="h-11 w-full rounded-xl border-surface-6 bg-surface-5 pl-10.5 text-sm focus:bg-white sm:w-72"
            />
          </div>
          <Button
            variant="ghost"
            className="flex h-11 items-center gap-2 rounded-xl border border-surface-6 px-4 hover:bg-surface-5"
          >
            <ListFilter className="size-4" />
          </Button>
        </div>
      </div>

      <DataTable
        isPending={isPending}
        columns={columns}
        data={data}
        getRowId={(row) => String(row.id)}
        withPagination={false}
        tableWrapperClassName="w-full"
        headerRowClassName="border-b border-surface-6 bg-surface-2/40 hover:bg-surface-2/40"
        headClassName="h-14 px-8 py-4"
        bodyRowClassName="border-b border-surface-3 last:border-0 hover:bg-surface-2/20 transition-colors"
        bodyCellClassName="h-auto px-8 py-6"
      />

      <div className="flex items-center justify-between border-t border-surface-6 bg-surface-2 p-8">
        <p className="text-sm font-medium text-text-secondary">
          Showing {data.length} of {totalCount} recipients
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-surface-6 bg-transparent hover:bg-surface-1"
            disabled
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="default"
            className="h-9 w-9 rounded-lg border-transparent bg-[#0A0521] text-sm font-bold text-white hover:bg-[#0A0521]/90"
          >
            1
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-surface-6 bg-transparent hover:bg-surface-1"
            disabled
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
