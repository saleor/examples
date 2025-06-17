import Link from "next/link";
import Image from "next/image";
import { ProductListDocument } from "@/generated/graphql";
import { executeGraphQL } from "@/lib";

export const metadata = {
	title: "Product List | Saleor Storefront",
};

export default async function Page() {

	const data = await executeGraphQL({
		query: ProductListDocument,
		variables: {
			channel: "default-channel",
			first: 12,
		},
	});

	return (
		<div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{data.products?.edges.map(({ node: product }) => {
				return (
					<Link href={`/products/${product.id}`} key={product.id}>
						<div>
							<div className="min-h-80 h-80 overflow-hidden rounded-md border bg-slate-50 hover:bg-slate-100">
								{product.thumbnail && (
									<Image
										width={256}
										height={256}
										alt={product.thumbnail.alt ?? ""}
										src={product.thumbnail.url}
										className="h-full w-full object-cover object-center p-4 hover:scale-105"
									/>
								)}
							</div>
							<div className="mt-2 flex justify-between">
								<div>
									<h3 className="text-sm font-semibold text-gray-700">{product.name}</h3>
									<p className="text-sm text-gray-500">{product.category?.name}</p>
								</div>
								<p className="text-sm font-medium text-gray-900">
									${product.pricing?.priceRange?.start?.gross.amount}
								</p>
							</div>
						</div>
					</Link>
				);
			})}
		</div>
	);
}
