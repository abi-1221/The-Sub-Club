import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";
import { type Product } from "@/lib/products";

export function ProductElement({
	product,
	loading,
	priority,
}: { product: Product } & { loading: "eager" | "lazy"; priority?: boolean }) {
	return (
		<li data-testid="ProductElement">
			<LinkWithChannel href={`/products/${product.slug}`} key={product.id}>
				<div className="group relative rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10 hover:shadow-lg hover:shadow-black/20 backdrop-blur-sm">
					{/* Placeholder for image if not present, or use a default software icon */}
					<div className="aspect-square w-full overflow-hidden rounded-md bg-white/5 flex items-center justify-center p-4">
						{product.canUseInAppUI && product.logoUrl ? (
							<img
								src={product.logoUrl}
								alt={`${product.name} logo`}
								className="h-full w-full object-contain"
								loading={loading}
							/>
						) : product.thumbnail ? (
							<ProductImageWrapper
								loading={loading}
								src={product.thumbnail.url}
								alt={product.thumbnail.alt}
								width={512}
								height={512}
								sizes={"512px"}
								priority={priority}
							/>
						) : (
							<span className="text-4xl">📦</span>
						)}
					</div>
					<div className="mt-4 flex justify-between">
						<div>
							<h3 className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors">{product.name}</h3>
							<p className="mt-1 text-sm text-neutral-400" data-testid="ProductElement_Category">
								{product.category}
							</p>
							<p className="mt-1 text-xs text-neutral-500">{product.duration}</p>
						</div>
						<p className="text-sm font-medium text-neutral-200" data-testid="ProductElement_PriceRange">
							₹{product.priceInr}
						</p>
					</div>
				</div>
			</LinkWithChannel>
		</li>
	);
}
