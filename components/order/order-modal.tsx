"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Order } from "@/lib/types";

interface OrderModalProps {
	order: Order | null;
	isOpen: boolean;
	onClose: () => void;
}

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

export function OrderModal({ order, isOpen, onClose }: OrderModalProps) {
	if (!order) return null;

	const statusVariant = statusVariants[order.status];
	const paymentVariant = paymentVariants[order.paymentStatus];

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle className="text-xl">Order Details</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					{/* Order Number & Date */}
					<div className="flex justify-between items-center">
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Order Number
							</label>
							<p className="text-foreground font-semibold text-lg">
								{order.orderNumber}
							</p>
						</div>
						<div className="text-right">
							<label className="text-sm font-medium text-muted-foreground">
								Order Date
							</label>
							<p className="text-foreground text-lg">{order.orderDate}</p>
						</div>
					</div>

					{/* Customer Info */}
					<div>
						<label className="text-sm font-medium text-muted-foreground">
							Customer
						</label>
						<p className="text-foreground font-semibold">{order.customerName}</p>
						<p className="text-muted-foreground text-sm">{order.customerEmail}</p>
					</div>

					{/* Status & Payment */}
					<div className="flex justify-between items-center">
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Status
							</label>
							<div className="mt-1">
								<Badge variant="outline" className={statusVariant.className}>
									{statusVariant.label}
								</Badge>
							</div>
						</div>
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Payment
							</label>
							<div className="mt-1">
								<Badge variant="outline" className={paymentVariant.className}>
									{paymentVariant.label}
								</Badge>
							</div>
						</div>
					</div>

					{/* Order Items */}
					<div>
						<label className="text-sm font-medium text-muted-foreground">
							Items
						</label>
						<div className="mt-2 space-y-2">
							{order.items.map((item, index) => (
								<div
									key={index}
									className="flex justify-between items-center py-2 border-b border-border last:border-0"
								>
									<div>
										<p className="text-foreground">{item.productName}</p>
										<p className="text-muted-foreground text-sm">
											Qty: {item.quantity}
										</p>
									</div>
									<p className="text-foreground font-medium">{item.price}</p>
								</div>
							))}
						</div>
					</div>

					{/* Total */}
					<div className="flex justify-between items-center pt-2 border-t border-border">
						<label className="text-sm font-medium text-muted-foreground">
							Total Amount
						</label>
						<p className="text-foreground font-semibold text-lg">
							{order.totalAmount}
						</p>
					</div>

					{/* Shipping Address */}
					<div>
						<label className="text-sm font-medium text-muted-foreground">
							Shipping Address
						</label>
						<p className="text-foreground text-sm">{order.shippingAddress}</p>
					</div>
				</div>

				<DialogFooter>
					<Button variant="destructive" size="lg" onClick={onClose}>
						Close
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
