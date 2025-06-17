import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { CreateCheckoutDocument, ProductListDocument } from "@/generated/graphql";
import { formatMoney, executeGraphQL } from "@/lib/common";
import { cookies } from "next/headers";

export const metadata = {
	title: "Product List | Saleor Storefront",
};

export default async function Page() {
	const data = await executeGraphQL({
		query: ProductListDocument,
	});

	const product = data.products?.edges.find((p) => p.node.productType.isShippingRequired === false)?.node;

	if (!product?.defaultVariant) {
		notFound();
	}
	const variant = product.defaultVariant;

	console.log(variant);

	async function addToCart() {
		"use server";

		const response = await executeGraphQL({
			query: CreateCheckoutDocument,
			variables: {
				variantId: variant.id,
			},
			cache: "no-store",
		});

		if (!response.checkoutCreate?.checkout?.id) {
			console.log(response.checkoutCreate?.errors);
			throw new Error("Failed to create checkout", { cause: response.checkoutCreate?.errors });
		}

		cookies().set("checkoutId", response.checkoutCreate.checkout.id);
		redirect("/app-router/cart");
	}

	return (
		<div className="flex">
			<div className="w-1/3 flex-none">
				<div className="rounded-md border bg-slate-50">
					{product.thumbnail && (
						<Image
							alt={product.thumbnail.alt ?? ""}
							src={product.thumbnail.url}
							width={256}
							height={256}
							className="h-full w-full object-cover"
						/>
					)}
				</div>
			</div>
			{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
			<form className="flex flex-auto px-6" action={addToCart}>
				<div className="flex flex-col">
					<h1 className="flex-auto text-5xl font-semibold text-slate-900">{product.name}</h1>
					<div className="text-lg font-semibold text-slate-500">
						{variant.pricing?.price &&
							formatMoney(variant.pricing.price.gross.amount, variant.pricing.price.gross.currency)}
					</div>
					<div className="mt-2 w-full flex-none text-sm font-medium text-slate-700">In stock</div>
					<button
						type="submit"
						className="mt-2 rounded-md border bg-slate-900 px-8 py-2 text-lg text-white hover:bg-slate-800"
					>
						Add to cart
					</button>
				</div>
			</form>
		</div>
	);
}
