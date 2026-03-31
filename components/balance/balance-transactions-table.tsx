"use client"

import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { BalanceTransaction } from "@/lib/types"
import { cn } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table"
import {
  ArrowDownCircle,
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
  CornerUpLeft,
  FilterIcon,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react"
import type { Dispatch, SetStateAction } from "react"
import { useMemo } from "react"

import { useAppliedBalanceFilters } from "../../store/balance-filter-store"
import { StatusBadge } from "../dashboard/transactions-table"
import { BalanceFilterPanel } from "./balance-filter-panel"
import { applyBalanceFilters } from "./balance-filter-utils"

type TransactionTypeConfig = {
  icon: LucideIcon
  className: string
}

const transactionTypeMap: Record<string, TransactionTypeConfig> = {
  payout: {
    icon: ArrowDownToLine,
    className: "bg-green-100 text-green-500",
  },
  refund: {
    icon: CornerUpLeft,
    className: "bg-red-100 text-red-500",
  },
  "sales income": {
    icon: ShoppingCart,
    className: "bg-purple-100 text-purple-600",
  },
  "top-up": {
    icon: ArrowDownCircle,
    className: "bg-blue-100 text-blue-500",
  },
}

const columns: ColumnDef<BalanceTransaction>[] = [
  {
    accessorKey: "type",
    header: () => (
      <span className="text-[12px] font-semibold uppercase text-text-muted">
        Type
      </span>
    ),
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      const config = transactionTypeMap[type.toLowerCase()] ?? {
        icon: ArrowDownCircle,
        className: "bg-blue-100 text-blue-500",
      }
      const Icon = config.icon

      return (
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-full",
              config.className,
            )}
          >
            <Icon className="size-4" />
          </div>
          <span className="font-bold text-text-primary">{type}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "reference",
    header: () => (
      <span className="text-[12px] font-semibold uppercase text-text-muted">
        Reference
      </span>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm text-text-secondary">
        {row.getValue("reference")}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: () => (
      <span className="text-[12px] font-semibold uppercase text-text-muted">
        Amount
      </span>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("amount") as string

      return (
        <span
          className={cn(
            "font-bold",
            amount.startsWith("-") ? "text-red-500" : "text-text-primary",
          )}
        >
          {amount}
        </span>
      )
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <span className="text-[12px] font-semibold uppercase text-text-muted">
        Status
      </span>
    ),
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "date",
    header: () => (
      <span className="text-[12px] font-semibold uppercase text-text-muted">
        Date
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-text-secondary">{row.getValue("date")}</span>
    ),
  },
]

interface BalanceTransactionsTableProps {
  data: BalanceTransaction[]
  isPending: boolean
  pageCount: number
  totalCount: number
  hasKnownPageCount: boolean
  pagination: { pageIndex: number; pageSize: number }
  setPagination: Dispatch<
    SetStateAction<{ pageIndex: number; pageSize: number }>
  >
}

export default function BalanceTransactionsTable({
  data,
  isPending,
  pageCount,
  totalCount,
  hasKnownPageCount,
  pagination,
  setPagination,
}: BalanceTransactionsTableProps) {
  const appliedFilters = useAppliedBalanceFilters()

  const filteredData = useMemo(() => {
    return data.filter((transaction) =>
      applyBalanceFilters(transaction, appliedFilters),
    )
  }, [appliedFilters, data])

  const startRange =
    filteredData.length === 0
      ? 0
      : pagination.pageIndex * pagination.pageSize + 1
  const endRange =
    filteredData.length === 0 ? 0 : startRange + filteredData.length - 1
  const hasActiveFilters =
    appliedFilters.status.length > 0 ||
    appliedFilters.paymentMethod.length > 0 ||
    appliedFilters.currency.length > 0 ||
    Boolean(appliedFilters.dateRange.type) ||
    Boolean(appliedFilters.amount.min) ||
    Boolean(appliedFilters.amount.max)

  return (
    <div className="flex flex-col rounded-3xl border border-surface-6 bg-surface-2">
      <section className="overflow-hidden rounded-t-3xl bg-surface-1">
        <div className="flex items-center justify-between gap-4 px-6 py-6">
          <h2 className="text-lg font-bold text-text-primary">
            Transaction History
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-auto py-2 rounded-full border-0 bg-surface-3 px-4 text-sm font-semibold"
            >
              Export CSV
            </Button>
            <BalanceFilterPanel
              onApply={() =>
                setPagination((current) => ({ ...current, pageIndex: 0 }))
              }
              trigger={
                <Button
                  variant={hasActiveFilters ? "default" : "outline"}
                  className={cn(
                    "flex h-auto py-2 flex-row items-center gap-2 rounded-lg px-4 text-sm font-semibold",
                    hasActiveFilters
                      ? "border-0 bg-brand-primary-dark text-white hover:bg-brand-primary-dark/90"
                      : "border-border-light text-text-subtitle",
                  )}
                >
                  <FilterIcon className="h-4 w-4" />
                  Filter
                </Button>
              }
            />
          </div>
        </div>

        <DataTable
          data={filteredData}
          columns={columns}
          isPending={isPending}
          getRowId={(row) => row.id}
          withPagination={false}
          tableWrapperClassName="w-full overflow-x-auto"
          headerClassName="sticky top-0 z-10 bg-surface-2"
          headerRowClassName="border-t border-surface-6 bg-surface-2 hover:bg-surface-2"
          headClassName="h-auto bg-surface-2 px-4 py-3 font-bold sm:px-8 sm:py-4"
          bodyRowClassName="border-b border-surface-3 transition-colors duration-100 hover:bg-surface-2/40 last:border-0"
          bodyCellClassName="px-4 py-3 text-sm text-text-primary sm:px-8 sm:py-4"
          emptyStateClassName="h-24 text-center"
        />
      </section>

      <div className="flex items-center justify-between rounded-b-3xl border-t border-surface-6 p-6">
        <p className="text-sm font-medium text-text-secondary">
          Showing {startRange} to {endRange} of {totalCount} transactions
        </p>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 hover:bg-surface-1 bg-transparent rounded-full"
            disabled={pagination.pageIndex === 0}
            onClick={() =>
              setPagination((current) => ({
                ...current,
                pageIndex: current.pageIndex - 1,
              }))
            }
          >
            <ChevronLeft className="size-4" />
          </Button>
          {hasKnownPageCount ? (
            Array.from({ length: pageCount }).map((_, index) => (
              <Button
                key={index}
                variant={pagination.pageIndex === index ? "default" : "outline"}
                className={cn(
                  "h-8 w-8 bg-transparent rounded-full",
                  pagination.pageIndex === index
                    ? "bg-indigo-900 text-white"
                    : "hover:bg-surface-1",
                )}
                onClick={() =>
                  setPagination((current) => ({ ...current, pageIndex: index }))
                }
              >
                {index + 1}
              </Button>
            ))
          ) : (
            <span className="px-3 text-sm font-medium text-text-secondary">
              Page {pagination.pageIndex + 1}
            </span>
          )}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 hover:bg-surface-1 bg-transparent rounded-full"
            disabled={
              pageCount === 0 ||
              (hasKnownPageCount
                ? pagination.pageIndex >= pageCount - 1
                : data.length < pagination.pageSize)
            }
            onClick={() =>
              setPagination((current) => ({
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
