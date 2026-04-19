"use client"

import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { PayOutTransaction } from "@/lib/types"
import { cn, formatTransactionDate } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table"
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  MoreVertical,
  RefreshCw,
} from "lucide-react"
import type { Dispatch, SetStateAction } from "react"

const columns: ColumnDef<PayOutTransaction>[] = [
  {
    accessorKey: "recipientName",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Recipient
      </span>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold text-text-primary text-xs">
          {row.original.recipientName}
        </span>
        <span className="text-xs text-text-muted">
          {row.original.recipientType}
        </span>
      </div>
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
      <span className="text-text-secondary font-secondary text-sm">
        {row.getValue("reference")}
      </span>
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
      <span className="font-bold font-secondary text-text-primary text-sm">
        {row.getValue("amount")}
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
    cell: ({ row }) => {
      const method = row.getValue("method") as string
      return (
        <Badge className="bg-brand-primary/10 text-brand-primary border-0 font-bold text-[10px] rounded-md px-3 py-1">
          {method}
        </Badge>
      )
    },
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
      const statusUpper = status.toUpperCase()
      return (
        <div className="flex items-center gap-2">
          {statusUpper === "COMPLETED" && (
            <CheckCircle2 className="size-3.5 text-success-2" />
          )}
          {statusUpper === "PENDING" && (
            <Clock className="size-3.5 text-status-warning" />
          )}
          {statusUpper === "PROCESSING" && (
            <RefreshCw className="size-3.5 text-blue-500" />
          )}
          {statusUpper === "FAILED" && (
            <AlertCircle className="size-3.5 text-status-danger" />
          )}
          <span
            className={cn(
              "font-bold text-[10px] tracking-wider",
              statusUpper === "COMPLETED" && "text-success-2",
              statusUpper === "PENDING" && "text-status-warning",
              statusUpper === "PROCESSING" && "text-blue-500",
              statusUpper === "FAILED" && "text-status-danger",
            )}
          >
            {statusUpper}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Date
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-text-secondary text-sm">
        {formatTransactionDate(String(row.getValue("date")))}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Action
      </span>
    ),
    cell: () => (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-text-muted hover:text-text-primary"
      >
        <MoreVertical className="size-4" />
      </Button>
    ),
  },
]

interface PayOutsTableProps {
  data: PayOutTransaction[]
  isPending: boolean
  pagination: { pageIndex: number; pageSize: number }
  setPagination: Dispatch<
    SetStateAction<{ pageIndex: number; pageSize: number }>
  >
  pageCount: number
  totalCount: number
}

export function PayOutsTable({
  data,
  isPending,
  pagination,
  setPagination,
  pageCount,
  totalCount,
}: PayOutsTableProps) {
  const startRange =
    data.length === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1
  const endRange = data.length === 0 ? 0 : startRange + data.length - 1
  const visiblePageNumbers = Array.from(
    { length: Math.max(pageCount, 1) },
    (_, index) => index,
  ).slice(
    Math.max(0, Math.min(pagination.pageIndex - 1, Math.max(0, pageCount - 3))),
    Math.max(
      0,
      Math.min(pagination.pageIndex - 1, Math.max(0, pageCount - 3)),
    ) + 3,
  )

  return (
    <div className="rounded-4xl border border-surface-3 bg-surface-1 shadow-sm overflow-hidden">
      <DataTable
        isPending={isPending}
        columns={columns}
        data={data}
        loaders={pagination.pageSize}
        getRowId={(row) => row.id}
        tableWrapperClassName="w-full"
        headerRowClassName="bg-surface-2 border-b border-surface-6 hover:bg-surface-2"
        headClassName="h-14 px-6 py-4"
        bodyRowClassName="border-b border-surface-3 last:border-0 hover:bg-surface-2/20 transition-colors"
        bodyCellClassName="px-6 py-4 h-auto"
      />

      <div className="flex items-center justify-between border-t border-surface-3 px-6 py-4 bg-surface-2">
        <p className="text-sm font-medium text-text-secondary">
          Showing {startRange} to {endRange} of {totalCount} payouts
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-surface-6 bg-white hover:bg-surface-5"
            disabled={pagination.pageIndex === 0}
            onClick={() =>
              setPagination((current) => ({
                ...current,
                pageIndex: current.pageIndex - 1,
              }))
            }
          >
            <ChevronLeft size={16} />
          </Button>
          {visiblePageNumbers.map((index) => (
            <Button
              key={index}
              variant={pagination.pageIndex === index ? "default" : "outline"}
              className={cn(
                "h-9 w-9 rounded-lg border-transparent font-bold text-sm",
                pagination.pageIndex === index
                  ? "bg-brand-primary text-white hover:bg-brand-primary/90"
                  : "bg-transparent text-text-secondary hover:bg-white",
              )}
              onClick={() =>
                setPagination((current) => ({ ...current, pageIndex: index }))
              }
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-surface-6 bg-white hover:bg-surface-5"
            disabled={pagination.pageIndex >= pageCount - 1}
            onClick={() =>
              setPagination((current) => ({
                ...current,
                pageIndex: current.pageIndex + 1,
              }))
            }
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
