import { notFound, redirect } from "next/navigation";
import { products } from "@/lib/products";
import { ProductList } from "@/ui/components/ProductList";

export const metadata = {
	title: "Search products · THE SUB CLUB",
	description: "Search products in THE SUB CLUB",
};

export default async function Page(props: {
	searchParams: Promise<Record<"query", string | string[] | undefined>>;
}) {
	const searchParams = await props.searchParams;
	const searchValue = searchParams.query;

	if (!searchValue) {
		notFound();
	}

	if (Array.isArray(searchValue)) {
		const firstValidSearchValue = searchValue.find((v) => v.length > 0);
		if (!firstValidSearchValue) {
			notFound();
		}
		redirect(`/search?${new URLSearchParams({ query: firstValidSearchValue }).toString()}`);
	}

	const searchResults = products.filter(p =>
		p.name.toLowerCase().includes(searchValue.toLowerCase()) ||
		p.shortDescription.toLowerCase().includes(searchValue.toLowerCase()) ||
		p.category.toLowerCase().includes(searchValue.toLowerCase())
	);

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			{searchResults.length > 0 ? (
				<div>
					<h1 className="pb-8 text-xl font-semibold">Search results for &quot;{searchValue}&quot;:</h1>
					<ProductList products={searchResults} />
				</div>
			) : (
				<h1 className="mx-auto pb-8 text-center text-xl font-semibold">Nothing found :(</h1>
			)}
		</section>
	);
}
