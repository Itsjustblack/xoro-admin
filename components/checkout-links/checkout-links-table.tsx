"use client"

import { ChevronLeft, ChevronRight, Copy } from "lucide-react"

import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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

import Link from "next/link"

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
      <div className="flex items-center gap-2">
        <span className="font-bold text-brand-primary truncate max-w-50">
          {row.getValue("linkUrl")}
        </span>
        <button className="text-text-muted hover:text-brand-primary transition-colors">
          <Copy className="size-3.5" />
        </button>
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
  return (
    <section className="flex flex-col rounded-3xl border border-surface-3 bg-surface-1 shadow-sm overflow-hidden">
      <DataTable
        isPending={isPending}
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        tableWrapperClassName="w-full"
        headerRowClassName="bg-surface-2 border-b border-surface-6"
        headClassName="h-14 px-8 py-4"
        bodyRowClassName="border-b border-surface-3 last:border-0 hover:bg-surface-2/20 transition-colors"
        bodyCellClassName="px-8 py-6 h-auto"
      />

      <div className="flex items-center justify-between bg-surface-2 h-16.75 px-6 border-t border-surface-6">
        <p className="text-sm font-medium text-text-secondary">
          Showing {data.length} of {totalCount} links
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-surface-6 bg-transparent hover:bg-surface-1"
          >
            <ChevronLeft className="size-4" />
          </Button>
          {[1, 2, 3].map((page, i) => (
            <Button
              key={i}
              variant={page === 1 ? "default" : "outline"}
              className={cn(
                "h-9 w-9 rounded-lg border-transparent font-bold text-sm",
                page === 1
                  ? "bg-brand-primary-2 text-white hover:bg-brand-primary-2/90"
                  : "bg-transparent text-text-secondary hover:bg-surface-1",
              )}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-surface-6 bg-transparent hover:bg-surface-1"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
