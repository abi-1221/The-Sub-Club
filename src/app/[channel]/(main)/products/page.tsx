import { products } from "@/lib/products";
import { ProductList } from "@/ui/components/ProductList";

export const metadata = {
	title: "Products · THE SUB CLUB",
	description: "All software subscriptions",
};

export default async function Page() {
	const categories: Record<string, string> = {
		"AI Tools": "AI Powerhouse",
		"Design": "Creative Suite",
		"Video": "Video Production",
		"Productivity": "Productivity Boosters",
		"Learning": "Knowledge & Learning",
		"Business": "Business Essentials",
	};

	// Group products by category
	const groupedProducts = products.reduce((acc, product) => {
		const category = product.category;
		if (!acc[category]) {
			acc[category] = [];
		}
		acc[category].push(product);
		return acc;
	}, {} as Record<string, typeof products>);

	// Define the order of categories
	const categoryOrder = [
		"AI Tools",
		"Design",
		"Video",
		"Productivity",
		"Business",
		"Learning",
	];

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16 space-y-16">
			<h2 className="sr-only">Product Catalogs</h2>

			{categoryOrder.map((categoryKey) => {
				const categoryProducts = groupedProducts[categoryKey];
				if (!categoryProducts || categoryProducts.length === 0) return null;

				return (
					<div key={categoryKey} className="space-y-6">
						<div className="flex items-center justify-between border-b border-neutral-200 pb-4">
							<h3 className="text-2xl font-bold tracking-tight text-neutral-900">
								{categories[categoryKey] || categoryKey}
							</h3>
							<span className="text-sm text-neutral-500">
								{categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'}
							</span>
						</div>
						<ProductList products={categoryProducts} />
					</div>
				);
			})}
		</section>
	);
}
