
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { AddButton } from "./AddButton";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";
import { products } from "@/lib/products";

export async function generateMetadata(
	props: {
		params: Promise<{ slug: string; channel: string }>;
	},
): Promise<Metadata> {
	const params = await props.params;
	const product = products.find((p) => p.slug === decodeURIComponent(params.slug));

	if (!product) {
		notFound();
	}

	return {
		title: `${product.name} | SoftSub Hub`,
		description: product.shortDescription,
	};
}

export async function generateStaticParams() {
	return products.map((product) => ({ slug: product.slug }));
}

export default async function Page(props: {
	params: Promise<{ slug: string; channel: string }>;
}) {
	const params = await props.params;
	const product = products.find((p) => p.slug === decodeURIComponent(params.slug));

	if (!product) {
		notFound();
	}

	return (
		<section className="mx-auto max-w-7xl px-8 py-12">
			<div className="grid gap-12 lg:grid-cols-2">
				{/* Left Column: Image & Quick Info */}
				<div className="space-y-8">
					<div className="aspect-square w-full overflow-hidden rounded-2xl border border-neutral-100 bg-white p-12 shadow-sm flex items-center justify-center">
						{product.canUseInAppUI && product.logoUrl ? (
							<img
								src={product.logoUrl}
								alt={`${product.name} logo`}
								className="h-full w-full object-contain"
							/>
						) : product.thumbnail ? (
							<ProductImageWrapper
								priority={true}
								alt={product.thumbnail.alt}
								width={1024}
								height={1024}
								src={product.thumbnail.url}
							/>
						) : (
							<span className="text-9xl">📦</span>
						)}
					</div>

					{/* Quick Stats / Trust Signals could go here */}
					<div className="rounded-xl bg-neutral-50 p-6">
						<h3 className="font-semibold text-neutral-900">Why choose {product.name}?</h3>
						<p className="mt-2 text-sm text-neutral-600">{product.shortDescription}</p>
					</div>
				</div>

				{/* Right Column: Details & Action */}
				<div className="flex flex-col justify-center">
					<div>
						<div className="mb-2 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
							{product.category}
						</div>
						<h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
							{product.name}
						</h1>
						<div className="mb-8 flex items-baseline gap-2">
							<span className="text-3xl font-bold text-neutral-900">₹{product.priceInr}</span>
							<span className="text-lg text-neutral-500">/ {product.duration}</span>
						</div>

						<div className="mb-8">
							<AddButton
								disabled={false}
								product={product}
								selectedVariant={{ name: product.duration, pricing: { price: { gross: { amount: product.priceInr } } } }}
							/>
							<p className="mt-3 text-xs text-neutral-500 text-center">
								Instant delivery via WhatsApp • Official Subscription
							</p>
						</div>

						<div className="space-y-8 border-t border-neutral-100 pt-8">
							{product.features && product.features.length > 0 && (
								<div>
									<h3 className="mb-4 text-lg font-semibold text-neutral-900">Key Features</h3>
									<ul className="grid gap-3 sm:grid-cols-2">
										{product.features.map((feature, i) => (
											<li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
												<svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
												</svg>
												{feature}
											</li>
										))}
									</ul>
								</div>
							)}

							{product.uses && product.uses.length > 0 && (
								<div>
									<h3 className="mb-4 text-lg font-semibold text-neutral-900">Perfect For</h3>
									<div className="flex flex-wrap gap-2">
										{product.uses.map((use, i) => (
											<span key={i} className="inline-flex items-center rounded-md bg-neutral-100 px-2.5 py-1.5 text-sm font-medium text-neutral-700">
												{use}
											</span>
										))}
									</div>
								</div>
							)}

							{!product.features && !product.uses && (
								<div className="text-neutral-600">
									<p>{product.shortDescription}</p>
									<p className="mt-4">Best for: <span className="font-medium">{product.bestFor}</span></p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

