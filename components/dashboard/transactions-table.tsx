"use client";

import { DataTable } from "@/components/data-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";

type TableAlign = "left" | "center" | "right";

type DashboardTableColumn<TData> = {
  key: keyof TData;
  label: string;
  align?: TableAlign;
  render?: (value: TData[keyof TData], row: TData) => ReactNode;
};

type DashboardDataTableProps<TData> = {
  title: string;
  columns: DashboardTableColumn<TData>[];
  data: TData[];
  headerActions?: ReactNode;
  rowKey: keyof TData | ((row: TData) => string);
};

type RecentTransaction = {
  customer: string;
  reference: string;
  type: string;
  amount: string;
  status: string;
  date: string;
};

type TransactionsTableProps = {
  data?: RecentTransaction[];
};

const STATUS_MAP = {
  success: {
    bg: "bg-status-success-soft",
    text: "text-status-success",
    label: "Success",
  },
  completed: {
    bg: "bg-status-success-soft",
    text: "text-status-success",
    label: "Completed",
  },
  pending: {
    bg: "bg-status-warning-soft",
    text: "text-status-warning",
    label: "Pending",
  },
  failed: {
    bg: "bg-status-danger-soft",
    text: "text-status-danger",
    label: "Failed",
  },
  partial: { bg: "bg-blue-50", text: "text-blue-500", label: "Partial" },
  active: {
    bg: "bg-status-success-soft",
    text: "text-status-success",
    label: "Active",
  },
  review: {
    bg: "bg-status-warning-soft",
    text: "text-status-warning",
    label: "Review",
  },
  archived: { bg: "bg-slate-100", text: "text-slate-400", label: "Archived" },
} as const;

const TYPE_MAP = {
  "pay-in": { bg: "bg-accent-blue-soft", text: "text-accent-blue" },
  "pay-out": { bg: "bg-accent-violet-soft", text: "text-accent-violet" },
} as const;

function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase() as keyof typeof STATUS_MAP;
  const config = STATUS_MAP[key] ?? {
    bg: "bg-slate-100",
    text: "text-slate-500",
    label: status,
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const key = type.toLowerCase() as keyof typeof TYPE_MAP;
  const config = TYPE_MAP[key] ?? {
    bg: "bg-slate-100",
    text: "text-slate-500",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${config.bg} ${config.text}`}
    >
      {type}
    </span>
  );
}

function CustomerAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((segment) => segment[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Avatar className="h-8 w-8 shrink-0">
      <AvatarFallback className="bg-surface-border text-[11px] font-semibold text-text-primary">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

function getAlignmentClass(align: TableAlign = "left") {
  if (align === "center") {
    return "text-center";
  }

  if (align === "right") {
    return "text-right";
  }

  return "text-left";
}

function DashboardDataTable<TData extends Record<string, unknown>>({
  title,
  columns,
  data,
  headerActions,
  rowKey,
}: DashboardDataTableProps<TData>) {
  const tableColumns: ColumnDef<TData>[] = columns.map((column) => ({
    accessorKey: String(column.key),
    header: () => (
      <span
        className={[
          "block text-[12px] font-semibold uppercase text-text-muted",
          getAlignmentClass(column.align),
        ].join(" ")}
      >
        {column.label}
      </span>
    ),
    cell: ({ row, getValue }) => {
      const value = getValue() as TData[keyof TData];

      return column.render ? column.render(value, row.original) : String(value);
    },
  }));

  const getRowId =
    typeof rowKey === "function" ? rowKey : (row: TData) => String(row[rowKey]);

  return (
    <section className="overflow-hidden rounded-3xl border border-surface-border bg-surface-card shadow-sm">
      <div className="flex items-center justify-between gap-4 px-6 py-6">
        <h2 className="text-lg font-bold text-text-primary">{title}</h2>
        {headerActions ? (
          <div className="flex items-center gap-2">{headerActions}</div>
        ) : null}
      </div>

      <DataTable
        data={data}
        columns={tableColumns}
        isPending={false}
        getRowId={getRowId}
        withPagination={false}
        tableWrapperClassName="w-full overflow-x-auto"
        headerClassName="sticky top-0 z-10 bg-surface-subtle"
        headerRowClassName="border-y border-surface-muted bg-surface-subtle hover:bg-surface-subtle"
        headClassName="h-auto bg-surface-subtle px-4 py-3 font-bold sm:px-8 sm:py-4"
        bodyRowClassName="border-b border-surface-muted transition-colors duration-100 hover:bg-surface-subtle/40 last:border-0"
        bodyCellClassName="px-4 sm:px-8 py-3 sm:py-4 text-sm text-text-primary"
        emptyStateClassName="h-24 text-center"
      />
    </section>
  );
}

const recentTransactionColumns: DashboardTableColumn<RecentTransaction>[] = [
  {
    key: "customer",
    label: "Customer",
    render: (value) => (
      <div className="flex items-center gap-6">
        <CustomerAvatar name={String(value)} />
        <span className="font-medium text-text-primary">{String(value)}</span>
      </div>
    ),
  },
  {
    key: "reference",
    label: "Reference",
    render: (value) => (
      <span className="font-mono text-sm text-text-secondary">
        {String(value)}
      </span>
    ),
  },
  {
    key: "type",
    label: "Type",
    render: (value) => <TypeBadge type={String(value)} />,
  },
  {
    key: "amount",
    label: "Amount",
    render: (value) => (
      <span className="font-bold text-text-primary">{String(value)}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value) => <StatusBadge status={String(value)} />,
  },
  {
    key: "date",
    label: "Date",
    render: (value) => (
      <span className="text-text-secondary">{String(value)}</span>
    ),
  },
];

export { CustomerAvatar, DashboardDataTable, StatusBadge, TypeBadge };

export default function TransactionsTable({
  data = [],
}: TransactionsTableProps) {
  return (
    <DashboardDataTable
      title="Recent Transactions"
      columns={recentTransactionColumns}
      data={data}
      rowKey="reference"
      headerActions={
        <Button
          variant="ghost"
          className="h-auto px-0 text-sm font-bold text-brand-primary hover-underline hover:bg-transparent hover:text-brand-primary"
        >
          View All
        </Button>
      }
    />
  );
}
