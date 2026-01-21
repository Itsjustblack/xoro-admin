"use client";

import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PAGE_SIZE } from "@/lib/constants";
import { mockCustomers } from "@/lib/mock-data";
import { CustomerData } from "@/lib/types";
import { IconDotsVertical } from "@tabler/icons-react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { CustomerModal } from "./customer-modal";

const statusVariants: Record<
	CustomerData["status"],
	{ label: string; className: string }
> = {
	active: {
		label: "Active",
		className: "bg-green-500/10 text-green-600 border-green-500/20",
	},
	pending: {
		label: "Pending",
		className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
	},
	inactive: {
		label: "Inactive",
		className: "bg-gray-500/10 text-gray-500 border-gray-500/20",
	},
};

const createColumns = (
	onView: (customer: CustomerData) => void,
): ColumnDef<CustomerData>[] => [
	{
		accessorKey: "name",
		header: "Customer",
		cell: ({ row }) => (
			<div className="flex items-center gap-3">
				<Avatar className="h-8 w-8">
					<AvatarFallback className="text-xs">
						{row.original.avatar}
					</AvatarFallback>
				</Avatar>
				<span className="font-medium">{row.original.name}</span>
			</div>
		),
		size: 200,
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => (
			<span className="text-muted-foreground">{row.original.email}</span>
		),
		size: 220,
	},
	{
		accessorKey: "phone",
		header: "Phone",
		cell: ({ row }) => (
			<span className="text-muted-foreground">{row.original.phone}</span>
		),
		size: 150,
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.original.status;
			const variant = statusVariants[status];
			return (
				<Badge
					variant="outline"
					className={variant.className}
				>
					{variant.label}
				</Badge>
			);
		},
		size: 100,
	},
	{
		accessorKey: "totalOrders",
		header: "Orders",
		cell: ({ row }) => (
			<span className="font-medium">{row.original.totalOrders}</span>
		),
		size: 80,
	},
	{
		accessorKey: "totalSpent",
		header: "Total Spent",
		cell: ({ row }) => (
			<span className="font-semibold">{row.original.totalSpent}</span>
		),
		size: 120,
	},
	{
		accessorKey: "joinDate",
		header: "Joined",
		cell: ({ row }) => (
			<span className="text-muted-foreground">{row.original.joinDate}</span>
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
				<DropdownMenuContent
					align="end"
					className="w-40"
				>
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

export default function CustomerTable() {
	const [pageParams, setPageParams] = useState({
		pageIndex: 0,
		pageSize: PAGE_SIZE,
	});
	const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(
		null,
	);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleViewCustomer = (customer: CustomerData) => {
		setSelectedCustomer(customer);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedCustomer(null);
	};

	const customers = useMemo(() => mockCustomers, []);
	const columns = useMemo(() => createColumns(handleViewCustomer), []);
	const pageCount = useMemo(
		() => Math.ceil(customers.length / pageParams.pageSize),
		[customers.length, pageParams.pageSize],
	);

	return (
		<>
			<DataTable
				data={customers}
				columns={columns}
				pageCount={pageCount}
				isPending={false}
				pagination={pageParams}
				setPagination={setPageParams}
				getRowId={(row) => row.id}
			/>
			<CustomerModal
				customer={selectedCustomer}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			/>
		</>
	);
}
