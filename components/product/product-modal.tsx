"use client";

import Image from "next/image";
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
import { Product } from "@/lib/types";

interface ProductModalProps {
	product: Product | null;
	isOpen: boolean;
	onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
	if (!product) return null;

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => !open && onClose()}
		>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle className="text-xl">Product Details</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					{/* Product Image */}
					<div className="relative aspect-video w-full overflow-hidden rounded-lg bg-secondary">
						{product.image ? (
							<Image
								src={product.image}
								alt={product.name}
								fill
								className="object-cover"
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-secondary/50">
								<svg
									className="h-16 w-16 text-muted-foreground/30"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
							</div>
						)}
					</div>

					{/* Product Info */}
					<div className="grid grid-cols-2 gap-4">
						<div className="col-span-2">
							<label className="text-sm font-medium text-muted-foreground">
								Name
							</label>
							<p className="text-foreground font-semibold text-lg">
								{product.name}
							</p>
						</div>

						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Category
							</label>
							<div className="mt-1">
								<Badge variant="secondary">{product.category}</Badge>
							</div>
						</div>

						<div>
							<label className="text-sm font-medium text-muted-foreground">
								SKU
							</label>
							<p className="text-foreground font-mono text-base">
								{product.sku}
							</p>
						</div>

						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Price
							</label>
							<p className="text-foreground font-semibold text-base">
								{product.price}
							</p>
						</div>

						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Stock
							</label>
							<p
								className={cn("font-semibold text-base", {
									"text-green-600": product.stock > 10,
									"text-orange-600": product.stock > 0 && product.stock <= 10,
									"text-red-600": product.stock <= 0,
								})}
							>
								{product.stock} units
							</p>
						</div>

						<div className="col-span-2">
							<label className="text-sm font-medium text-muted-foreground">
								Description
							</label>
							<p className="text-foreground text-base text-wrap">
								{product.description}
							</p>
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
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
