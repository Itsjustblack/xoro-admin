"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

import { CopyButton } from "@/components/copy-button"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PAGE_SIZE } from "@/lib/constants"
import { cn } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table"

export interface CheckoutLinkTableRow {
  id: string
  productName: string
  amount: string
  linkUrl: string
  status: "Active" | "Inactive"
  createdAt: string
}

const columns: ColumnDef<CheckoutLinkTableRow>[] = [
  {
    accessorKey: "productName",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Product Name
      </span>
    ),
    cell: ({ row }) => (
      <Link
        href={`/checkout-links/${row.original.id}`}
        className="font-bold text-text-primary hover:text-brand-primary transition-colors"
      >
        {row.getValue("productName")}
      </Link>
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
      <span className="text-text-secondary font-medium">
        {row.getValue("amount")}
      </span>
    ),
  },
  {
    accessorKey: "linkUrl",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Link URL
      </span>
    ),
    cell: ({ row }) => (
      <div className="flex min-w-0 items-center gap-2">
        <span className="max-w-50 truncate font-bold text-brand-primary">
          {row.getValue("linkUrl")}
        </span>
        <CopyButton
          value={row.original.linkUrl}
          className="size-8 shrink-0 text-text-muted hover:text-brand-primary"
        />
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
      const status = row.getValue("status") as string
      return (
        <Badge
          className={cn(
            "rounded-full px-3 py-0.5 font-medium border-0",
            status === "Active"
              ? "bg-success-2/15 text-success-2"
              : "bg-surface-6 text-text-muted",
          )}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Created
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-text-secondary">{row.getValue("createdAt")}</span>
    ),
  },
]

interface CheckoutLinksTableProps {
  data: CheckoutLinkTableRow[]
  totalCount: number
  isPending?: boolean
}

export function CheckoutLinksTable({
  data,
  totalCount,
  isPending = false,
}: CheckoutLinksTableProps) {
  const [rawPageIndex, setRawPageIndex] = useState(0)
  const pageCount = Math.max(Math.ceil(totalCount / PAGE_SIZE), 1)
  const pageIndex = Math.min(rawPageIndex, Math.max(pageCount - 1, 0))

  const paginatedData = useMemo(() => {
    const start = pageIndex * PAGE_SIZE
    return data.slice(start, start + PAGE_SIZE)
  }, [data, pageIndex])

  const startRange = paginatedData.length === 0 ? 0 : pageIndex * PAGE_SIZE + 1
  const endRange = paginatedData.length === 0 ? 0 : startRange + paginatedData.length - 1
  const visiblePageNumbers = Array.from({ length: pageCount }, (_, index) => index).slice(
    Math.max(0, Math.min(pageIndex - 1, Math.max(0, pageCount - 3))),
    Math.max(0, Math.min(pageIndex - 1, Math.max(0, pageCount - 3))) + 3,
  )

  return (
    <section className="flex flex-col rounded-3xl border border-surface-3 bg-surface-1 shadow-sm overflow-hidden">
      <DataTable
        isPending={isPending}
        columns={columns}
        data={paginatedData}
        getRowId={(row) => row.id}
        tableWrapperClassName="w-full"
        headerRowClassName="bg-surface-2 border-b border-surface-6"
        headClassName="h-14 px-6 py-4"
        bodyRowClassName="border-b border-surface-3 last:border-0 hover:bg-surface-2/20 transition-colors"
        bodyCellClassName="px-6 py-4 h-auto"
      />

      <div className="flex items-center justify-between bg-surface-2 h-16.75 px-6 border-t border-surface-6">
        <p className="text-sm font-medium text-text-secondary">
          Showing {startRange} to {endRange} of {totalCount} links
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-surface-6 bg-transparent hover:bg-surface-1"
            disabled={pageIndex === 0}
            onClick={() => setRawPageIndex((current) => Math.max(0, current - 1))}
          >
            <ChevronLeft className="size-4" />
          </Button>
          {visiblePageNumbers.map((index) => (
            <Button
              key={index}
              variant={index === pageIndex ? "default" : "outline"}
              className={cn(
                "h-9 w-9 rounded-lg border-transparent font-bold text-sm",
                index === pageIndex
                  ? "bg-brand-primary-2 text-white hover:bg-brand-primary-2/90"
                  : "bg-transparent text-text-secondary hover:bg-surface-1",
              )}
              onClick={() => setRawPageIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-surface-6 bg-transparent hover:bg-surface-1"
            disabled={pageIndex >= pageCount - 1}
            onClick={() =>
              setRawPageIndex((current) => Math.min(pageCount - 1, current + 1))
            }
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
