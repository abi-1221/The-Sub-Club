import { CategoryViewer } from "@/ui/components/CategoryViewer";

export const metadata = {
	title: "Products | SoftSub Hub",
	description: "Browse our premium software subscriptions by category.",
};

export default async function Page() {
	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			<CategoryViewer />
		</section>
	);
}
