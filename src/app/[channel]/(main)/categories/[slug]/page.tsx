
import { type Metadata } from "next";
import { products } from "@/lib/products";
import { ProductList } from "@/ui/components/ProductList";

export const generateMetadata = async (
	props: { params: Promise<{ slug: string }> },
): Promise<Metadata> => {
	const params = await props.params;
	const categoryName = decodeURIComponent(params.slug).replace(/-/g, " ");

	return {
		title: `${categoryName} | THE SUB CLUB`,
		description: `All products in ${categoryName}`,
	};
};

export default async function Page(props: { params: Promise<{ slug: string }> }) {
	const params = await props.params;
	// Simple slug matching: "ai-tools" -> "AI Tools" (approximate)
	// For now, let's just show all products if we can't match exactly, or filter loosely.
	// Actually, let's try to filter by checking if the category string includes the slug parts.

	const slug = params.slug.toLowerCase();
	const categoryProducts = products.filter(p =>
		p.category.toLowerCase().replace(/ /g, "-").includes(slug) ||
		slug.includes(p.category.toLowerCase().replace(/ /g, "-"))
	);

	if (categoryProducts.length === 0) {
		// Fallback to showing all if no match (or 404? let's show all for demo purposes or 404)
		// notFound();
	}

	const name = params.slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

	return (
		<div className="mx-auto max-w-7xl p-8 pb-16">
			<h1 className="pb-8 text-xl font-semibold">{name}</h1>
			<ProductList products={categoryProducts.length > 0 ? categoryProducts : products} />
		</div>
	);
}
