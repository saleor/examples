import Image from "next/image";
import { executeGraphQL } from "@/lib";
import { ProductDocument, ProductListDocument } from "@/generated/graphql";
import { notFound } from "next/navigation";

export const generateMetadata = () => {
	return {
		title: "Single Product | Saleor Storefront ",
	};
};

export async function generateStaticParams() {
	const { products } = await executeGraphQL({
		query: ProductListDocument,
		variables: {
			channel: "default-channel",
			first: 12,
		},
	});
	const paths = products?.edges.map(({ node: { id } }) => ({ id })) ?? [];

	return paths;
}

export default async function Page({ params }: { params: { id: string } }) {
	const { product } = await executeGraphQL({
		query: ProductDocument,
		variables: {
			channel: "default-channel",
			id: decodeURIComponent(params.id),
		},
	});

	if (!product) {
		notFound();
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
			<div className="flex-auto px-6">
				<div className="flex flex-wrap">
					<h1 className="flex-auto text-lg font-semibold text-slate-900">{product.name}</h1>
					<div className="text-lg font-semibold text-slate-500">$13.00</div>
					<div className="mt-2 w-full flex-none text-sm font-medium text-slate-700">In stock</div>
				</div>
			</div>
		</div>
	);
}
