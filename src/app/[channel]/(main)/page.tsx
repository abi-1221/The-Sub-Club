import { ProductList } from "@/ui/components/ProductList";
import { products } from "@/lib/products";

export const metadata = {
	title: "SoftSub Hub - Premium Software Subscriptions",
	description:
		"Premium software & AI tools at student‑friendly prices. Get the best deals on software subscriptions.",
};

export default function Page() {
	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			<div className="mb-12 rounded-2xl bg-neutral-900 px-6 py-16 text-center sm:px-12 lg:px-16">
				<h1 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
					Premium Software Subscriptions
				</h1>
				<p className="mx-auto mt-4 max-w-xl text-lg text-neutral-300">
					Instant access to the best digital tools. No shipping, no waiting.
					100% official licenses at student-friendly prices.
				</p>
				<div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
					<div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
						<h3 className="font-semibold text-white">Activation Time</h3>
						<p className="mt-2 text-sm text-neutral-300">Instant or within 2 hours</p>
					</div>
					<div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
						<h3 className="font-semibold text-white">Warranty</h3>
						<p className="mt-2 text-sm text-neutral-300">Full term support included</p>
					</div>
					<div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
						<h3 className="font-semibold text-white">Account Type</h3>
						<p className="mt-2 text-sm text-neutral-300">Private & Secure</p>
					</div>
				</div>
			</div>
			<h2 className="sr-only">Product list</h2>
			<ProductList products={products} />
		</section>
	);
}
