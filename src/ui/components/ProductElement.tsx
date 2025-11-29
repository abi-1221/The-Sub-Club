import { LinkWithChannel } from "../atoms/LinkWithChannel";
import Image from "next/image";
import { type Product } from "@/lib/products";

export function ProductElement({
	product,
	loading,
	priority,
}: { product: Product } & { loading: "eager" | "lazy"; priority?: boolean }) {
	return (
		<li data-testid="ProductElement">
			<LinkWithChannel href={`/products/${product.slug}`} key={product.id}>
				<div className="group relative p-4 transition-all rounded-2xl hover:bg-white/5">
					{/* Round floating icon container with off-white matte background */}
					<div className="aspect-square w-full overflow-hidden rounded-full bg-neutral-200 flex items-center justify-center p-6 shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
						{product.canUseInAppUI && product.logoUrl ? (
							<img
								src={product.logoUrl}
								alt={`${product.name} logo`}
								className="h-full w-full object-contain"
								loading={loading}
							/>
						) : product.thumbnail ? (
							<Image
								src={product.thumbnail.url}
								alt={product.thumbnail.alt}
								width={512}
								height={512}
								className="h-full w-full object-contain"
								loading={loading}
								sizes="512px"
								priority={priority}
							/>
						) : (
							<span className="text-4xl">📦</span>
						)}
					</div>
					<div className="mt-6 flex justify-between items-center px-2">
						<div>
							<h3 className="text-base font-medium text-neutral-200 group-hover:text-white transition-colors">{product.name}</h3>
							<p className="mt-1 text-sm text-neutral-500" data-testid="ProductElement_Category">
								{product.category}
							</p>
						</div>
						<div className="flex flex-col items-end">
							<p className="text-sm font-medium text-neutral-200" data-testid="ProductElement_PriceRange">
								₹{product.priceInr}
							</p>
							<p className="text-xs text-neutral-500">{product.duration}</p>
						</div>
					</div>
				</div>
			</LinkWithChannel>
		</li>
	);
}
