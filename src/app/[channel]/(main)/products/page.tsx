import { products } from "@/lib/products";
import { ProductList } from "@/ui/components/ProductList";

export const metadata = {
	title: "Products · THE SUB CLUB",
	description: "All software subscriptions",
};

export default async function Page() {
	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			<h2 className="sr-only">Product list</h2>
			<ProductList products={products} />
		</section>
	);
}
