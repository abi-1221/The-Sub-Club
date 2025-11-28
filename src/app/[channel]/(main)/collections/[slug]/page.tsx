import { type Metadata } from "next";
import { products } from "@/lib/products";
import { ProductList } from "@/ui/components/ProductList";

export const generateMetadata = async (
	props: { params: Promise<{ slug: string }> },
): Promise<Metadata> => {
	const params = await props.params;
	const collectionName = decodeURIComponent(params.slug).replace(/-/g, " ");

	return {
		title: `${collectionName} | THE SUB CLUB`,
		description: `Collection: ${collectionName}`,
	};
};

export default async function Page(props: { params: Promise<{ slug: string }> }) {
	const params = await props.params;
	const name = params.slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

	// For now, just show all products as a "collection"
	return (
		<div className="mx-auto max-w-7xl p-8 pb-16">
			<h1 className="pb-8 text-xl font-semibold">{name}</h1>
			<ProductList products={products} />
		</div>
	);
}
