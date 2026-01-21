"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerData } from "@/lib/types";

interface CustomerProfileProps {
	customer: CustomerData | null;
	onBack: () => void;
}

export function CustomerProfile({ customer, onBack }: CustomerProfileProps) {
	if (!customer) return null;

	return (
		<div className="flex flex-col h-full bg-background border-l border-border">
			{/* Header */}
			<div className="p-4 border-b border-border flex items-center gap-3">
				<Button
					variant="ghost"
					size="icon"
					onClick={onBack}
				>
					<ArrowLeft className="w-4 h-4" />
				</Button>
				<h2 className="text-lg font-semibold text-foreground">
					Customer Profile
				</h2>
			</div>

			{/* Profile Content */}
			<div className="flex-1 overflow-y-auto p-8 space-y-8">
				{/* Avatar and Name */}
				<div className="flex items-center gap-5">
					<div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
						<span className="text-2xl font-semibold text-primary">
							{customer.avatar}
						</span>
					</div>
					<div className="space-y-1">
						<h3 className="text-xl font-semibold text-foreground">
							{customer.name}
						</h3>
						<p className="text-base text-muted-foreground">
							Customer ID: {customer.id}
						</p>
					</div>
				</div>

				{/* Contact Information */}
				<div className="space-y-4">
					<h4 className="text-base font-semibold text-muted-foreground">
						Contact Information
					</h4>
					<div className="space-y-3">
						<div>
							<p className="text-sm font-medium text-muted-foreground">Email</p>
							<p className="text-base text-foreground">{customer.email}</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">Phone</p>
							<p className="text-base text-foreground">{customer.phone}</p>
						</div>
					</div>
				</div>

				{/* Account Details */}
				<div className="space-y-4">
					<h4 className="text-base font-semibold text-muted-foreground">
						Account Details
					</h4>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Join Date
							</p>
							<p className="text-base text-foreground">{customer.joinDate}</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Total Orders
							</p>
							<p className="text-base text-foreground">
								{customer.totalOrders}
							</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Total Spent
							</p>
							<p className="text-base text-foreground">{customer.totalSpent}</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Last Purchase
							</p>
							<p className="text-base text-foreground">
								{customer.lastPurchase}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
