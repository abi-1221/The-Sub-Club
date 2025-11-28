
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
		<section className="mx-auto grid max-w-7xl p-8">
			<div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-8">
				<div className="md:col-span-1 lg:col-span-5">
					<div className="aspect-square w-full overflow-hidden rounded-md bg-neutral-100 flex items-center justify-center p-8">
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
				</div>
				<div className="flex flex-col pt-6 sm:col-span-1 sm:px-6 sm:pt-0 lg:col-span-3 lg:pt-16">
					<div>
						<h1 className="mb-4 flex-auto text-3xl font-medium tracking-tight text-neutral-900">
							{product.name}
						</h1>
						<p className="mb-8 text-2xl font-bold text-neutral-900">
							₹{product.priceInr} <span className="text-base font-normal text-neutral-500">/ {product.duration}</span>
						</p>
						<div className="mb-6 rounded-md bg-neutral-50 p-4 text-sm text-neutral-600">
							<span className="font-semibold text-neutral-900">Best for:</span> {product.bestFor}
						</div>

						<div className="mt-8">
							<AddButton
								disabled={false}
								product={product}
								selectedVariant={{ name: product.duration, pricing: { price: { gross: { amount: product.priceInr } } } }}
							/>
						</div>

						<div className="mt-8 space-y-6 text-sm text-neutral-500">
							<p>{product.shortDescription}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

