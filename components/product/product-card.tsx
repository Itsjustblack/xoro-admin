"use client";

import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
	id: string;
	name: string;
	image?: string;
	price: string;
	stock: number;
	category: string;
	onClick: () => void;
}

export function ProductCard({
	name,
	image,
	price,
	stock,
	category,
	onClick,
}: ProductCardProps) {
	return (
		<Card
			onClick={onClick}
			className="group ring-0 hover:ring-0 pt-0 cursor-pointer border border-border bg-card text-left transition-all duration-300 hover:border-primary/50 shadow-none hover:shadow-sm"
		>
			<div className="relative aspect-square w-full overflow-hidden bg-secondary">
				{image ? (
					<Image
						src={image}
						alt={name}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-linear-to-br from-secondary to-secondary/50">
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

			<CardContent className="flex flex-1 flex-col p-4">
				<Badge
					variant="secondary"
					className="mb-2 w-fit text-xs"
				>
					{category}
				</Badge>
				<CardTitle className="mb-2 text-lg line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary">
					{name}
				</CardTitle>
				<div className="mt-auto flex items-end justify-between">
					<div>
						<p className="mb-1 text-sm text-muted-foreground">Price</p>
						<p className="text-lg font-bold text-foreground">{price}</p>
					</div>
					<div className="text-right">
						<p className="mb-1 text-xs text-muted-foreground">Stock</p>
						<p
							className={cn("text-base font-semibold", {
								"text-green-600": stock > 10,
								"text-orange-600": stock > 0 && stock <= 10,
								"text-red-600": stock <= 0,
							})}
						>
							{stock} units
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
