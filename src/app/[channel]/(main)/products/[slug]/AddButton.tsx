"use client";



export function AddButton({ disabled, product, selectedVariant }: { disabled?: boolean; product?: any; selectedVariant?: any }) {
	const phoneNumber = "919847061823"; // Your WhatsApp Number
	const productName = product?.name || "Product";
	const variantName = selectedVariant?.name || "Standard";
	const price = selectedVariant?.pricing?.price?.gross?.amount
		? `₹${selectedVariant.pricing.price.gross.amount}`
		: "best price";

	const message = `Hi, I'm interested in ${productName} – ${variantName} at ${price}. Please share payment details.`;
	const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

	return (
		<a
			href={whatsappUrl}
			target="_blank"
			rel="noopener noreferrer"
			className={`flex h-12 items-center justify-center rounded-md bg-green-600 px-6 py-3 text-base font-medium leading-6 text-white shadow hover:bg-green-500 ${disabled ? "pointer-events-none opacity-50" : ""}`}
		>
			<span>Request on WhatsApp</span>
		</a>
	);
}
