"use client"

import { Filter, Search } from "lucide-react"

import { DataTable } from "@/components/data-table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ITransaction } from "@/lib/types"
import { cn, formatCurrency } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table"

const columns: ColumnDef<ITransaction>[] = [
  {
    id: "contributor",
    header: () => (
      <span className="text-xs font-bold uppercase text-text-muted">
        Contributor
      </span>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-9 rounded-full">
          <AvatarFallback className="bg-brand-primary/10 text-xs font-bold text-brand-primary">
            {getInitials(row.original.customer.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-text-primary">
            {row.original.customer.name}
          </span>
          <span className="text-xs text-text-secondary">
            {row.original.customer.email}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => (
      <span className="text-xs font-bold uppercase text-text-muted">
        Amount
      </span>
    ),
    cell: ({ row }) => (
      <span className="font-bold text-text-primary">
        {formatCurrency(Number(row.getValue("amount")), "NGN")}
      </span>
    ),
  },
  {
    accessorKey: "type",
    header: () => (
      <span className="text-xs font-bold uppercase text-text-muted">
        Type
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm capitalize text-text-secondary">
        {row.getValue("type")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <span className="text-xs font-bold uppercase text-text-muted">
        Status
      </span>
    ),
    cell: ({ row }) => {
      const status = String(row.getValue("status"))
      return (
        <Badge
          className={cn(
            "rounded-full border-0 px-3 py-0.5 text-[10px] font-bold tracking-wider uppercase",
            status === "success" && "bg-stat text-success-2",
            status === "pending" &&
              "bg-status-warning-soft text-status-warning",
            status === "failed" && "bg-status-danger-soft text-status-danger",
          )}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: () => (
      <span className="text-xs font-bold uppercase text-text-muted">
        Date
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-text-secondary">
        {formatDate(String(row.getValue("created_at")))}
      </span>
    ),
  },
]

interface CheckoutLinkDetailsTableProps {
  data: ITransaction[]
  totalCount: number
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  isPending: boolean
}

function formatDate(value?: string) {
  if (!value) return "-"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
  }).format(date)
}

function getInitials(name?: string) {
  return name
    ?.split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase() || "--"
}

export function CheckoutLinkDetailsTable({
  data,
  totalCount,
  searchQuery,
  onSearchQueryChange,
  isPending,
}: CheckoutLinkDetailsTableProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-text-primary">
          Recent Transactions
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              className="h-11 w-full rounded-xl border-surface-6 bg-white pl-10.5 text-sm shadow-sm focus:bg-white sm:w-72"
            />
          </div>
          <Button
            variant="outline"
            className="flex h-10 px-4 items-center font-satoshi justify-center gap-2 border-border-light text-text-subtitle bg-transparent"
          >
            <Filter className="size-4" />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-t-3xl rounded-b-3xl border border-surface-3 bg-surface-1 shadow-sm">
        <DataTable
          isPending={isPending}
          columns={columns}
          data={data}
          getRowId={(row) => String(row.id)}
          tableWrapperClassName="w-full"
          headerRowClassName="border-b border-surface-6 bg-surface-2/40 hover:bg-surface-2/40"
          headClassName="h-11 px-8 py-3.5"
          bodyRowClassName="border-b border-surface-3 last:border-0 hover:bg-surface-2/20 transition-colors"
          bodyCellClassName="h-auto px-8 py-6"
        />
        <div className="flex h-16.75 items-center justify-between border-t border-surface-3 bg-surface-2 px-6 py-4">
          <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
            Showing {data.length} of {totalCount} transactions
          </p>
        </div>
      </div>
    </section>
  )
}
