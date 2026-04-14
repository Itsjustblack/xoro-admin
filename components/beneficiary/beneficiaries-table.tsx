"use client"

import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import type { BeneficiaryTableRow } from "@/lib/types"
import { cn } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, Plus, UserPlus } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"
import { AddBeneficiarySheet } from "./add-beneficiary-sheet"
import { BeneficiaryTableActions } from "./beneficiary-table-actions"

const columns: ColumnDef<BeneficiaryTableRow>[] = [
  {
    accessorKey: "name",
    header: () => (
      <span className="block text-xs font-semibold uppercase text-text-muted">
        Name
      </span>
    ),
    cell: ({ row }) => (
      <span className="block font-bold text-text-primary">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "account_number",
    header: () => (
      <span className="block text-xs font-semibold uppercase text-text-muted">
        Account Number
      </span>
    ),
    cell: ({ row }) => (
      <span className="block font-mono text-sm text-text-secondary">
        {row.getValue("account_number")}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: () => (
      <span className="block text-xs font-semibold uppercase text-text-muted">
        Email
      </span>
    ),
    cell: ({ row }) => (
      <span className="block text-sm text-text-secondary">
        {row.getValue("email")}
      </span>
    ),
  },
  {
    accessorKey: "category_id",
    header: () => (
      <span className="block text-xs font-semibold uppercase text-text-muted">
        Category
      </span>
    ),
    cell: ({ row }) => {
      const categoryName = row.original.category_name

      return (
        <span className="block text-sm text-text-secondary">
          {categoryName || "Uncategorized"}
        </span>
      )
    },
  },
  {
    accessorKey: "default_amount",
    header: () => (
      <span className="block text-xs font-semibold uppercase text-text-muted">
        Amount (NGN)
      </span>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("default_amount") as number

      return (
        <span className="block font-bold text-text-primary">
          {amount.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      )
    },
  },
  {
    accessorKey: "phone_number",
    header: () => (
      <span className="block text-xs font-semibold uppercase text-text-muted">
        Phone No.
      </span>
    ),
    cell: ({ row }) => (
      <span className="block text-sm text-text-secondary">
        {row.getValue("phone_number") || "-"}
      </span>
    ),
  },
  {
    accessorKey: "whatsapp_number",
    header: () => (
      <span className="block text-xs font-semibold uppercase text-text-muted">
        WhatsApp No.
      </span>
    ),
    cell: ({ row }) => (
      <span className="block text-sm text-text-secondary">
        {row.getValue("whatsapp_number") || "-"}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => (
      <span className="block text-xs font-semibold uppercase text-text-muted">
        Actions
      </span>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <BeneficiaryTableActions beneficiary={row.original} />
      </div>
    ),
  },
]

interface BeneficiariesTableProps {
  data: BeneficiaryTableRow[]
  isPending: boolean
  pagination: { pageIndex: number; pageSize: number }
  setPagination: Dispatch<
    SetStateAction<{ pageIndex: number; pageSize: number }>
  >
  pageCount: number
}

export function BeneficiariesTable({
  data,
  isPending,
  pagination,
  setPagination,
  pageCount,
}: BeneficiariesTableProps) {
  const resolvedPageIndex = pagination.pageIndex
  const resolvedPageSize = pagination.pageSize
  const resolvedPageCount = Math.max(pageCount, 1)
  const resolvedTotalCount = data.length
  const startRange =
    resolvedTotalCount === 0 ? 0 : resolvedPageIndex * resolvedPageSize + 1
  const endRange = Math.min(
    (resolvedPageIndex + 1) * resolvedPageSize,
    resolvedTotalCount,
  )

  if (!isPending && data.length === 0) {
    return (
      <div className="flex w-full flex-col overflow-hidden rounded-3xl border border-surface-3 bg-surface-1 shadow-sm">
        <div className="flex w-full items-center justify-between border-b border-surface-3 bg-surface-2 px-4 py-3 sm:px-8 sm:py-4">
          <span className="text-xs font-semibold uppercase text-text-muted">
            Name
          </span>
          <span className="text-xs font-semibold uppercase text-text-muted">
            Account Number
          </span>
          <span className="text-xs font-semibold uppercase text-text-muted">
            Email
          </span>
          <span className="text-xs font-semibold uppercase text-text-muted">
            Category
          </span>
          <span className="text-xs font-semibold uppercase text-text-muted">
            Amount (NGN)
          </span>
          <span className="text-xs font-semibold uppercase text-text-muted">
            Phone No.
          </span>
          <span className="text-xs font-semibold uppercase text-text-muted">
            WhatsApp No.
          </span>
          <span className="text-xs font-semibold uppercase text-text-muted">
            Actions
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-12 sm:p-24">
          <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-surface-2">
            <UserPlus className="size-8 text-text-muted" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-text-primary">
            No beneficiaries added yet
          </h3>
          <p className="mb-8 max-w-sm text-sm text-text-secondary">
            Add beneficiaries to start sending payouts to employees or partners.
          </p>
          <AddBeneficiarySheet>
            <Button className="flex h-auto items-center gap-2 rounded-xl bg-brand-primary px-6 py-2 text-white hover:bg-brand-primary/90">
              <Plus className="size-4" />
              <span>Add Beneficiary</span>
            </Button>
          </AddBeneficiarySheet>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-3xl border border-surface-3 bg-surface-1 shadow-sm">
      <DataTable
        data={data}
        columns={columns}
        isPending={isPending}
        getRowId={(row) => String(row.id)}
        withPagination={false}
        tableWrapperClassName="w-full custom-scrollbar overflow-x-auto"
        headerClassName="sticky top-0 z-10 bg-surface-2"
        headerRowClassName="border-t border-surface-6 bg-surface-2 hover:bg-surface-2"
        headClassName="h-auto whitespace-nowrap bg-surface-2 px-4 py-3 font-bold sm:px-5 sm:py-4"
        bodyRowClassName="border-b border-surface-3 transition-colors duration-100 hover:bg-surface-2/40 last:border-0"
        bodyCellClassName="whitespace-nowrap px-4 py-3 text-sm text-text-primary sm:px-5 sm:py-4"
        emptyStateClassName="h-48"
      />

      <div className="flex items-center justify-between border-t border-surface-6 rounded-b-3xl px-6 py-4">
        <p className="text-sm font-medium text-text-secondary">
          Showing {startRange} to {endRange} of {resolvedTotalCount} records
        </p>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-transparent bg-transparent hover:bg-surface-1"
            disabled={resolvedPageIndex === 0}
            onClick={() =>
              setPagination((current) => ({
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
                "h-8 w-8 rounded-full border-transparent bg-transparent",
                resolvedPageIndex === index
                  ? "bg-indigo-900 text-white hover:bg-indigo-900/90"
                  : "hover:bg-surface-1",
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
            className="h-8 w-8 rounded-full border-transparent bg-transparent hover:bg-surface-1"
            disabled={
              resolvedPageIndex === resolvedPageCount - 1 ||
              resolvedPageCount === 0
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
