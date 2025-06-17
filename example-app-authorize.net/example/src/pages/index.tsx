import Image from "next/image";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
	ProductListQuery,
	ProductListQueryVariables,
	ProductListDocument,
	CreateCheckoutMutation,
	CreateCheckoutMutationVariables,
	CreateCheckoutDocument,
	UpdateDeliveryMutation,
	UpdateDeliveryMutationVariables,
	UpdateDeliveryDocument,
} from "../../generated/graphql";

export default function Page() {
	const { data, loading } = useQuery<ProductListQuery, ProductListQueryVariables>(
		gql(ProductListDocument.toString()),
	);

	const [createCheckout] = useMutation<CreateCheckoutMutation, CreateCheckoutMutationVariables>(
		gql(CreateCheckoutDocument.toString()),
	);

	const [updateDelivery] = useMutation<UpdateDeliveryMutation, UpdateDeliveryMutationVariables>(
		gql(UpdateDeliveryDocument.toString()),
	);

	const product = data?.products?.edges[0].node;
	const variant = product?.defaultVariant;

	const router = useRouter();

	if (loading || !product || !variant) {
		return <div>Loading…</div>;
	}

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const response = await createCheckout({ variables: { variantId: variant.id } });

		if (!response.data?.checkoutCreate?.checkout?.id) {
			throw new Error("Failed to create checkout");
		}

		const methodId = response.data.checkoutCreate.checkout.shippingMethods?.[0].id;

		if (!methodId) {
			throw new Error("Failed to find shipping method for checkout");
		}

		await updateDelivery({ variables: { checkoutId: response.data.checkoutCreate.checkout.id, methodId } });

		sessionStorage.setItem("checkoutId", response.data.checkoutCreate.checkout.id);
		return router.push("/cart");
	};

	return (
		<div className="flex">
			<div className="w-1/3 flex-none">
				<div className="rounded-md border bg-slate-50">
					{product.thumbnail && (
						<Image
							alt={product.thumbnail.alt || ""}
							src={product.thumbnail.url}
							width={256}
							height={256}
							className="h-full w-full object-cover"
						/>
					)}
				</div>
			</div>
			{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
			<form className="flex flex-auto px-6" onSubmit={handleFormSubmit}>
				<div className="flex flex-col">
					<h1 className="flex-auto text-5xl font-semibold text-slate-900">{product.name}</h1>
					<div className="text-lg font-semibold text-slate-500">
						{`${variant.pricing?.price?.gross.amount} ${variant.pricing?.price?.gross.currency}`}
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
