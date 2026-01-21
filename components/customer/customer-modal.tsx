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
import { CustomerData } from "@/lib/types";

interface CustomerModalProps {
	customer: CustomerData | null;
	isOpen: boolean;
	onClose: () => void;
}

export function CustomerModal({
	customer,
	isOpen,
	onClose,
}: CustomerModalProps) {
	if (!customer) return null;

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => !open && onClose()}
		>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle className="text-xl">Customer Details</DialogTitle>
				</DialogHeader>

				{/* Customer Info */}
				<div className="space-y-4">
					<div>
						<label className="text-sm font-medium text-muted-foreground">
							Name
						</label>
						<p className="text-foreground font-semibold text-lg">
							{customer.name}
						</p>
					</div>

					<div>
						<label className="text-sm font-medium text-muted-foreground">
							Email
						</label>
						<p className="text-foreground text-lg">{customer.email}</p>
					</div>

					<div className="flex justify-between items-center">
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Phone
							</label>
							<p className="text-foreground text-lg">{customer.phone}</p>
						</div>
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Status
							</label>
							<div className="mt-1">
								<Badge
									className="uppercase"
									variant={customer.status === "active" ? "default" : "outline"}
								>
									{customer.status}
								</Badge>
							</div>
						</div>
					</div>

					<div className="flex justify-between items-center">
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Total Spent
							</label>
							<p className="text-foreground font-semibold text-lg">
								{customer.totalSpent}
							</p>
						</div>
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Join Date
							</label>
							<p className="text-foreground text-lg">{customer.joinDate}</p>
						</div>
					</div>
				</div>

				<DialogFooter>
					<Button
						variant="destructive"
						size="lg"
						onClick={onClose}
					>
						Close
					</Button>
					{/* <Button>Edit Customer</Button> */}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
