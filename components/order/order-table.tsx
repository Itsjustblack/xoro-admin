"use client";

import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PAGE_SIZE } from "@/lib/constants";
import { mockOrders } from "@/lib/mock-data";
import { Order } from "@/lib/types";
import { IconDotsVertical } from "@tabler/icons-react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { OrderModal } from "./order-modal";

const statusVariants: Record<
	Order["status"],
	{ label: string; className: string }
> = {
	pending: {
		label: "Pending",
		className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
	},
	processing: {
		label: "Processing",
		className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
	},
	shipped: {
		label: "Shipped",
		className: "bg-purple-500/10 text-purple-600 border-purple-500/20",
	},
	delivered: {
		label: "Delivered",
		className: "bg-green-500/10 text-green-600 border-green-500/20",
	},
	cancelled: {
		label: "Cancelled",
		className: "bg-red-500/10 text-red-600 border-red-500/20",
	},
};

const paymentVariants: Record<
	Order["paymentStatus"],
	{ label: string; className: string }
> = {
	paid: {
		label: "Paid",
		className: "bg-green-500/10 text-green-600 border-green-500/20",
	},
	unpaid: {
		label: "Unpaid",
		className: "bg-red-500/10 text-red-600 border-red-500/20",
	},
	refunded: {
		label: "Refunded",
		className: "bg-gray-500/10 text-gray-500 border-gray-500/20",
	},
};

const createColumns = (
	onView: (order: Order) => void,
): ColumnDef<Order>[] => [
	{
		accessorKey: "orderNumber",
		header: "Order",
		cell: ({ row }) => (
			<span className="font-medium">{row.original.orderNumber}</span>
		),
		size: 100,
	},
	{
		accessorKey: "customerName",
		header: "Customer",
		cell: ({ row }) => (
			<div>
				<span className="font-medium">{row.original.customerName}</span>
				<p className="text-muted-foreground text-sm">{row.original.customerEmail}</p>
			</div>
		),
		size: 200,
	},
	{
		accessorKey: "items",
		header: "Items",
		cell: ({ row }) => (
			<span className="text-muted-foreground">
				{row.original.items.length} item{row.original.items.length !== 1 ? "s" : ""}
			</span>
		),
		size: 80,
	},
	{
		accessorKey: "totalAmount",
		header: "Total",
		cell: ({ row }) => (
			<span className="font-semibold">{row.original.totalAmount}</span>
		),
		size: 120,
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.original.status;
			const variant = statusVariants[status];
			return (
				<Badge variant="outline" className={variant.className}>
					{variant.label}
				</Badge>
			);
		},
		size: 110,
	},
	{
		accessorKey: "paymentStatus",
		header: "Payment",
		cell: ({ row }) => {
			const status = row.original.paymentStatus;
			const variant = paymentVariants[status];
			return (
				<Badge variant="outline" className={variant.className}>
					{variant.label}
				</Badge>
			);
		},
		size: 100,
	},
	{
		accessorKey: "orderDate",
		header: "Date",
		cell: ({ row }) => (
			<span className="text-muted-foreground">{row.original.orderDate}</span>
		),
		size: 140,
	},
	{
		id: "actions",
		header: () => null,
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
						size="icon"
					>
						<IconDotsVertical />
						<span className="sr-only">Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-40">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="flex items-center gap-2 cursor-pointer"
						onClick={() => onView(row.original)}
					>
						<Eye className="size-4" />
						View
					</DropdownMenuItem>
					<DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
						<Pencil className="size-4" />
						Edit
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive">
						<Trash2 className="size-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		),
		size: 60,
	},
];

export default function OrderTable() {
	const [pageParams, setPageParams] = useState({
		pageIndex: 0,
		pageSize: PAGE_SIZE,
	});
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleViewOrder = (order: Order) => {
		setSelectedOrder(order);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedOrder(null);
	};

	const orders = useMemo(() => mockOrders, []);
	const columns = useMemo(() => createColumns(handleViewOrder), []);
	const pageCount = useMemo(
		() => Math.ceil(orders.length / pageParams.pageSize),
		[orders.length, pageParams.pageSize],
	);

	return (
		<>
			<DataTable
				data={orders}
				columns={columns}
				pageCount={pageCount}
				isPending={false}
				pagination={pageParams}
				setPagination={setPageParams}
				getRowId={(row) => row.id}
			/>
			<OrderModal
				order={selectedOrder}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			/>
		</>
	);
}
