"use client"

import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import type { Beneficiary } from "@/lib/types"
import type { ColumnDef } from "@tanstack/react-table"
import { Plus, UserPlus } from "lucide-react"

const columns: ColumnDef<Beneficiary>[] = [
  {
    accessorKey: "name",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Name
      </span>
    ),
    cell: ({ row }) => (
      <span className="font-bold text-text-primary">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "accountNumber",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Account Number
      </span>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm text-text-secondary">
        {row.getValue("accountNumber")}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Email
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-text-secondary">
        {row.getValue("email")}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Category
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-text-secondary">
        {row.getValue("category")}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Amount (₦)
      </span>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number
      return <span className="font-bold text-text-primary">{amount.toLocaleString()}</span>
    },
  },
  {
    accessorKey: "phoneNo",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Phone No.
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-text-secondary">
        {row.getValue("phoneNo")}
      </span>
    ),
  },
  {
    accessorKey: "whatsappNo",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        WhatsApp No.
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-text-secondary">
        {row.getValue("whatsappNo")}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => (
      <span className="text-xs font-semibold uppercase text-text-muted">
        Actions
      </span>
    ),
    cell: () => null,
  },
]

interface BeneficiariesTableProps {
  data: Beneficiary[]
}

export function BeneficiariesTable({ data }: BeneficiariesTableProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col rounded-3xl border border-surface-3 bg-surface-1 shadow-sm overflow-hidden w-full">
        <div className="flex w-full items-center justify-between border-b border-surface-3 bg-surface-2 px-4 py-3 sm:px-8 sm:py-4">
          <span className="text-xs font-semibold uppercase text-text-muted flex-1">Name</span>
          <span className="text-xs font-semibold uppercase text-text-muted flex-1">Account Number</span>
          <span className="text-xs font-semibold uppercase text-text-muted flex-1">Email</span>
          <span className="text-xs font-semibold uppercase text-text-muted flex-1">Category</span>
          <span className="text-xs font-semibold uppercase text-text-muted flex-1">Amount (₦)</span>
          <span className="text-xs font-semibold uppercase text-text-muted flex-1">Phone No.</span>
          <span className="text-xs font-semibold uppercase text-text-muted flex-1">WhatsApp No.</span>
          <span className="text-xs font-semibold uppercase text-text-muted flex-1">Actions</span>
        </div>

        <div className="flex flex-col items-center justify-center p-12 sm:p-24 text-center">
          <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-surface-2">
            <UserPlus className="size-8 text-text-muted" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-text-primary">
            No beneficiaries added yet
          </h3>
          <p className="mb-8 max-w-sm text-sm text-text-secondary">
            Add beneficiaries to start sending payouts to employees or partners.
          </p>
          <Button className="flex items-center rounded-xl bg-brand-primary text-white hover:bg-brand-primary/90 px-6 py-2 h-auto gap-2">
            <Plus className="size-4" />
            <span>Add Beneficiary</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded-3xl border border-surface-3 bg-surface-1 shadow-sm overflow-hidden w-full">
      <DataTable
        data={data}
        columns={columns}
        isPending={false}
        getRowId={(row) => row.id}
        withPagination={true}
        tableWrapperClassName="w-full overflow-x-auto"
        headerClassName="sticky top-0 z-10 bg-surface-2"
        headerRowClassName="border-y border-surface-3 bg-surface-2 hover:bg-surface-2"
        headClassName="h-auto bg-surface-2 px-4 py-3 font-bold sm:px-8 sm:py-4 whitespace-nowrap"
        bodyRowClassName="border-b border-surface-3 transition-colors duration-100 hover:bg-surface-2/40 last:border-0"
        bodyCellClassName="px-4 py-3 text-sm text-text-primary sm:px-8 sm:py-4 whitespace-nowrap"
        emptyStateClassName="h-48 text-center"
      />
    </div>
  )
}
