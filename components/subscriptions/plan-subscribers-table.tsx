"use client"

import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { IndividualSubscriber } from "@/lib/types"
import { cn } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  FilterIcon,
  Info,
  Search,
} from "lucide-react"
import { useMemo, useState } from "react"

const columns: ColumnDef<IndividualSubscriber>[] = [
  {
    accessorKey: "customerName",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Customer Name
      </span>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold text-text-primary">
          {row.getValue("customerName")}
        </span>
        <span className="text-xs text-text-secondary">
          {row.original.email}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "planType",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Plan
      </span>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-text-secondary">
        {row.getValue("planType")}
      </span>
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
            "rounded-md px-3 py-1 font-bold text-[10px] border-0",
            status === "Active" && "bg-status-success-soft text-status-success",
            status === "Past Due" && "bg-status-danger-soft text-status-danger",
            status === "Canceled" && "bg-surface-6 text-text-muted",
          )}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "nextBillingDate",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Next Billing Date
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-text-secondary">{row.getValue("nextBillingDate")}</span>
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
        {row.getValue("amount")}
      </span>
    ),
  },
]

interface PlanSubscribersTableProps {
  data: IndividualSubscriber[]
}

export function PlanSubscribersTable({ data }: PlanSubscribersTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = useMemo(() => {
    return data.filter((sub) =>
      sub.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [data, searchTerm])

  return (
    <div className="flex flex-col rounded-4xl border border-surface-3 bg-white shadow-sm overflow-hidden">
      <section className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
          <Input
            placeholder="Search subscribers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full pl-9 border-none bg-surface-2 sm:w-[320px] text-sm rounded-xl focus-visible:ring-0"
          />
        </div>
        <Button
          variant="outline"
          className="flex h-10 items-center justify-center gap-2 border-surface-3 text-text-subtitle bg-white hover:bg-surface-2 rounded-xl"
        >
          <FilterIcon className="size-4" />
          <span className="font-bold">Filter</span>
        </Button>
      </section>

      <section className="w-full">
        <DataTable
          data={filteredData}
          columns={columns}
          isPending={false}
          getRowId={(row) => row.id}
          withPagination={false}
          tableWrapperClassName="w-full"
          headerRowClassName="bg-surface-2 border-none hover:bg-surface-2"
          headClassName="h-14 px-6 py-4 font-bold"
          bodyRowClassName="border-surface-2 last:border-0 transition-colors"
          bodyCellClassName="px-6 py-6 text-sm"
        />
      </section>

      <div className="flex items-center gap-3 bg-surface-2 p-6 rounded-b-4xl">
        <div className="flex size-6 items-center justify-center rounded-full bg-white text-brand-primary-2 shadow-sm">
          <Info size={14} />
        </div>
        <p className="text-xs font-medium text-text-secondary">
          Subscription renewals are processed automatically based on billing cycle.
        </p>
      </div>

      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-text-secondary whitespace-nowrap">Rows per page:</span>
          <select className="bg-transparent text-sm font-bold text-text-primary focus:outline-none">
            <option>10</option>
          </select>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-text-secondary">
            {filteredData.length === 0
              ? "0 of 0"
              : `1-${Math.min(filteredData.length, 10)} of ${filteredData.length}`}
          </span>
          <div className="flex items-center gap-4">
            <button className="text-text-muted hover:text-text-primary disabled:opacity-50">
              <ChevronLeft size={20} />
            </button>
            <button className="text-text-muted hover:text-text-primary disabled:opacity-50">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
