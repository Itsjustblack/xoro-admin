"use client"

import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { PaymentRecord } from "@/lib/types"
import { cn } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, FilterIcon, Search } from "lucide-react"
import { useMemo, useState } from "react"

const columns: ColumnDef<PaymentRecord>[] = [
  {
    accessorKey: "date",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Date
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-text-secondary font-medium">
        {row.getValue("date")}
      </span>
    ),
  },
  {
    accessorKey: "reference",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Reference
      </span>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm text-text-primary">
        {row.getValue("reference")}
      </span>
    ),
  },
  {
    accessorKey: "method",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Method
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-text-secondary">{row.getValue("method")}</span>
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
            status === "Success" &&
              "bg-status-success-soft text-status-success",
            status === "Pending" &&
              "bg-status-warning-soft text-status-warning",
            status === "Failed" && "bg-status-danger-soft text-status-danger",
          )}
        >
          {status}
        </Badge>
      )
    },
  },
]

interface PaymentHistoryTableProps {
  data: PaymentRecord[]
}

const PAGE_SIZE = 5

export function PaymentHistoryTable({ data }: PaymentHistoryTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [pageIndex, setPageIndex] = useState(0)

  const filteredData = useMemo(() => {
    return data.filter(
      (record) =>
        record.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.method.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [data, searchTerm])

  const pageCount = Math.ceil(filteredData.length / PAGE_SIZE)
  const paginatedData = useMemo(() => {
    const start = pageIndex * PAGE_SIZE
    const end = start + PAGE_SIZE
    return filteredData.slice(start, end)
  }, [filteredData, pageIndex])

  return (
    <div className="flex flex-col rounded-4xl border border-surface-3 bg-surface-1 shadow-sm overflow-hidden">
      <section className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-text-primary">Payment History</h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search payments..."
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
            className="flex h-10 items-center justify-center gap-2 border-surface-6 text-text-subtitle bg-transparent hover:bg-surface-2"
          >
            <FilterIcon className="size-4" />
            <span>Filter</span>
          </Button>
        </div>
      </section>

      <section className="w-full">
        <DataTable
          data={paginatedData}
          columns={columns}
          isPending={false}
          getRowId={(row) => row.id}
          withPagination={false}
          tableWrapperClassName="w-full"
          headerRowClassName="bg-surface-2 border-none hover:bg-surface-2"
          headClassName="h-14 px-6 py-4 font-bold whitespace-nowrap"
          bodyRowClassName="border-surface-3 last:border-0 transition-colors hover:bg-surface-2"
          bodyCellClassName="px-6 py-4 text-sm text-text-primary whitespace-nowrap"
          emptyStateClassName="h-24 text-center"
        />
      </section>

      <div className="flex items-center justify-between p-6 border-t border-surface-3 bg-surface-2">
        <p className="text-sm font-medium text-text-secondary">
          Showing {Math.min(filteredData.length, pageIndex * PAGE_SIZE + 1)} to{" "}
          {Math.min(filteredData.length, (pageIndex + 1) * PAGE_SIZE)} of{" "}
          {filteredData.length} payments
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-surface-6 bg-white hover:bg-surface-5"
            disabled={pageIndex === 0}
            onClick={() => setPageIndex((p) => p - 1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          {Array.from({ length: Math.max(1, pageCount) }).map((_, i) => (
            <Button
              key={i}
              variant={pageIndex === i ? "default" : "outline"}
              className={cn(
                "h-9 w-9 rounded-lg border-transparent font-bold text-sm",
                pageIndex === i
                  ? "bg-brand-primary text-white hover:bg-brand-primary"
                  : "bg-transparent text-text-secondary hover:bg-white",
              )}
              onClick={() => setPageIndex(i)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-surface-6 bg-white hover:bg-surface-5"
            disabled={pageIndex === pageCount - 1 || pageCount === 0}
            onClick={() => setPageIndex((p) => p + 1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
