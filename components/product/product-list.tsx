"use client";

import { useState } from "react";
import { mockProducts } from "@/lib/mock-data";
import { Product } from "@/lib/types";
import { ProductCard } from "./product-card";
import { ProductModal } from "./product-modal";

export default function ProductList() {
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				{mockProducts.length > 0 ? (
					mockProducts.map((product) => (
						<ProductCard
							key={product.id}
							{...product}
							onClick={() => setSelectedProduct(product)}
						/>
					))
				) : (
					<div className="col-span-full py-12 text-center">
						<p className="text-muted-foreground text-lg">No products found</p>
					</div>
				)}
			</div>

			<ProductModal
				product={selectedProduct}
				isOpen={!!selectedProduct}
				onClose={() => setSelectedProduct(null)}
			/>
		</>
	);
}
