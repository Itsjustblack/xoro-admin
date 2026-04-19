"use client"

import { StatusBadge } from "@/components/dashboard/transactions-table"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { BulkPayout } from "@/lib/types"
import { cn, formatChartDateTime } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, FilterIcon, Search } from "lucide-react"
import { Dispatch, SetStateAction, useMemo, useState } from "react"

import Link from "next/link"

const columns: ColumnDef<BulkPayout>[] = [
  {
    accessorKey: "name",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Batch Name
      </span>
    ),
    cell: ({ row }) => (
      <Link
        href={`/bulk-payouts/${row.original.reference}`}
        className="font-bold text-text-primary hover:text-brand-primary transition-colors"
      >
        {row.getValue("name")}
      </Link>
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
      <span className="font-secondary font-medium text-sm text-text-secondary">
        {row.getValue("reference")}
      </span>
    ),
  },
  {
    id: "transactions",
    header: () => (
      <div className="w-full text-center">
        <span className="text-xs font-semibold uppercase text-text-muted">
          Transactions
        </span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-full font-secondary text-center text-text-secondary">
        {row.original.transaction_details.length}
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
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "created_at",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Created At
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-text-secondary">
        {formatChartDateTime(row.getValue("created_at"))}
      </span>
    ),
  },
]

interface BulkPayoutsTableProps {
  data: BulkPayout[]
  isPending?: boolean
  pagination?: {
    pageIndex: number
    pageSize: number
  }
  totalCount?: number
  pageCount?: number
  setPagination?: Dispatch<
    SetStateAction<{
      pageIndex: number
      pageSize: number
    }>
  >
}

export function BulkPayoutsTable({
  data,
  isPending = false,
  pagination,
  totalCount,
  pageCount,
  setPagination,
}: BulkPayoutsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = useMemo(() => {
    return data.filter((batch) => {
      const matchesSearch =
        searchTerm === "" ||
        batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        batch.reference.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesSearch
    })
  }, [data, searchTerm])

  const resolvedPageIndex = pagination?.pageIndex ?? 0
  const resolvedPageSize =
    pagination?.pageSize ?? Math.max(filteredData.length, 1)
  const resolvedPageCount =
    pageCount ?? Math.max(Math.ceil(filteredData.length / resolvedPageSize), 1)
  const resolvedTotalCount = totalCount ?? filteredData.length
  const startRange =
    resolvedTotalCount === 0 ? 0 : resolvedPageIndex * resolvedPageSize + 1
  const endRange = Math.min(
    (resolvedPageIndex + 1) * resolvedPageSize,
    resolvedTotalCount,
  )

  return (
    <div className="flex flex-col rounded-3xl border border-surface-3 bg-surface-1 shadow-sm">
      <section className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-text-primary">Batch History</h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search batches..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPagination?.((current) => ({ ...current, pageIndex: 0 }))
              }}
              className="h-10 w-full pl-9 sm:w-60 font-manrope text-sm"
            />
          </div>
          <Button
            variant="outline"
            className="flex h-auto py-2 px-3 items-center font-satoshi justify-center gap-2 border-border-light text-text-subtitle bg-transparent"
          >
            <FilterIcon className="size-4" />
            <span>Filter</span>
          </Button>
        </div>
      </section>

      <section className="w-full">
        <DataTable
          data={filteredData}
          columns={columns}
          isPending={isPending}
          getRowId={(row) => String(row.id)}
          tableWrapperClassName="w-full overflow-x-auto"
          headerClassName="sticky top-0 z-10 bg-surface-2"
          headerRowClassName="border-y border-surface-3 bg-surface-2 hover:bg-surface-2"
          headClassName="h-auto bg-surface-2 px-4 py-3 font-bold sm:px-8 whitespace-nowrap"
          bodyRowClassName="border-b border-surface-3 transition-colors duration-100 hover:bg-surface-2/40 last:border-0"
          bodyCellClassName="px-4 py-3 text-sm text-text-primary sm:px-8 sm:py-4 whitespace-nowrap"
          emptyStateClassName="h-24 text-center"
        />
      </section>

      <div className="flex items-center bg-surface-2 justify-between border-t border-surface-3 rounded-b-3xl px-6 py-4">
        <p className="text-sm font-medium text-text-secondary">
          Showing {startRange} to {endRange} of {resolvedTotalCount} records
        </p>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 hover:bg-surface-1 bg-transparent rounded-full border-transparent"
            disabled={resolvedPageIndex === 0}
            onClick={() =>
              setPagination?.((current) => ({
                ...current,
                pageIndex: current.pageIndex - 1,
              }))
            }
          >
            <ChevronLeft className="size-4" />
          </Button>
          {Array.from({ length: resolvedPageCount }).map((_, index) => (
            <Button
              key={index}
              variant={resolvedPageIndex === index ? "default" : "outline"}
              className={cn(
                "h-8 w-8 bg-transparent rounded-full border-transparent",
                resolvedPageIndex === index
                  ? "bg-indigo-900 text-white hover:bg-indigo-900/90"
                  : "hover:bg-surface-1",
              )}
              onClick={() =>
                setPagination?.((current) => ({ ...current, pageIndex: index }))
              }
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 hover:bg-surface-1 bg-transparent rounded-full border-transparent"
            disabled={
              resolvedPageIndex === resolvedPageCount - 1 ||
              resolvedPageCount === 0
            }
            onClick={() =>
              setPagination?.((current) => ({
                ...current,
                pageIndex: current.pageIndex + 1,
              }))
            }
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
