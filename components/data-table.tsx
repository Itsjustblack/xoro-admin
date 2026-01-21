"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { PAGE_SIZE_OPTIONS } from "@/lib/constants";
import {
	IconChevronLeft,
	IconChevronRight,
	IconChevronsLeft,
	IconChevronsRight,
} from "@tabler/icons-react";
import {
	ColumnDef,
	Table as TanStackTable,
	flexRender,
	getCoreRowModel,
	getGroupedRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import RowsSkeleton from "./row-skeleton";

/** Pagination Controls */
function PaginationControls<TData>({ table }: { table: TanStackTable<TData> }) {
	const {
		pagination: { pageIndex, pageSize },
	} = table.getState();

	const pageCount = table.getPageCount();
	const canPreviousPage = table.getCanPreviousPage();
	const canNextPage = table.getCanNextPage();

	return (
		<div className="flex w-full items-center gap-8">
			<div className="hidden items-center gap-2 lg:flex">
				<Label
					htmlFor="rows-per-page"
					className="text-sm font-medium"
				>
					Rows per page
				</Label>
				<Select
					value={String(pageSize)}
					onValueChange={(value) => table.setPageSize(Number(value))}
				>
					<SelectTrigger
						size="sm"
						className="w-20"
						id="rows-per-page"
					>
						<SelectValue placeholder={String(pageSize)} />
					</SelectTrigger>
					<SelectContent side="top">
						{PAGE_SIZE_OPTIONS.map((size) => (
							<SelectItem
								key={size}
								value={String(size)}
							>
								{size}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex w-fit items-center justify-center text-sm font-medium">
				Page {pageIndex + 1} of {pageCount}
			</div>
			<div className="ml-auto flex items-center gap-2 lg:ml-0">
				<Button
					variant="outline"
					size="icon"
					onClick={() => table.setPageIndex(0)}
					disabled={!canPreviousPage}
				>
					<IconChevronsLeft />
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={() => table.previousPage()}
					disabled={!canPreviousPage}
				>
					<IconChevronLeft />
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={() => table.nextPage()}
					disabled={!canNextPage}
				>
					<IconChevronRight />
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={() => table.setPageIndex(pageCount - 1)}
					disabled={!canNextPage}
				>
					<IconChevronsRight />
				</Button>
			</div>
		</div>
	);
}

interface DataTableProps<TData> {
	data: TData[];
	columns: ColumnDef<TData>[];
	isPending: boolean;
	getRowId?: (row: TData) => string;

	// pagination is optional
	withPagination?: boolean;
	pageCount?: number;
	pagination?: { pageIndex: number; pageSize: number };
	setPagination?: Dispatch<
		SetStateAction<{ pageIndex: number; pageSize: number }>
	>;

	rowGrouping?: boolean;

	loaders?: number;

	//row selection
	rowSelection?: Record<string, boolean>;
	setRowSelection?: Dispatch<SetStateAction<Record<string, boolean>>>;
}

/** Main Generic Table */
export function DataTable<TData>({
	data,
	columns,
	pageCount,
	isPending,
	pagination,
	setPagination,
	getRowId,
	withPagination = true,
	rowGrouping = false,
	loaders = 4,
	rowSelection,
	setRowSelection,
}: DataTableProps<TData>) {
	const table = useReactTable({
		data,
		columns,
		state: {
			...(withPagination && pagination ? { pagination } : {}),
			...(rowSelection ? { rowSelection } : {}),
		},
		onPaginationChange: withPagination ? setPagination : undefined,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: withPagination ? getPaginationRowModel() : undefined,
		manualPagination: withPagination,
		pageCount: withPagination ? pageCount : undefined,
		getGroupedRowModel: rowGrouping ? getGroupedRowModel() : undefined,
		onRowSelectionChange: setRowSelection,
		enableRowSelection: true,
		getRowId,
	});

	return (
		<div className="space-y-4">
			<div className="overflow-hidden border-b">
				<Table>
					<TableHeader className="sticky top-0 z-10">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										colSpan={header.colSpan}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isPending ? (
							<RowsSkeleton
								length={loaders}
								columnCount={columns.length}
							/>
						) : table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{withPagination && pagination && pageCount && (
				<PaginationControls table={table} />
			)}
		</div>
	);
}
