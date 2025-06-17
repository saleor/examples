import { CheckoutCompleteDocument } from "@/generated/graphql";
import { executeGraphQL } from "@/lib/common";
import { redirect } from "next/navigation";

export default async function CartReturnPage({
	params,
}: {
	params: { checkoutId: string };
	searchParams: { sqProductCode: string };
}) {
	const checkoutCompleteResult = await executeGraphQL({
		query: CheckoutCompleteDocument,
		variables: {
			checkoutId: params.checkoutId,
		},
	});

	if (!checkoutCompleteResult.checkoutComplete) {
		return <div>Checkout not found</div>;
	}
	if (checkoutCompleteResult.checkoutComplete.errors.length > 0) {
		return <div>Errors: {JSON.stringify(checkoutCompleteResult.checkoutComplete.errors)}</div>;
	}
	if (!checkoutCompleteResult.checkoutComplete.order) {
		return <div>Order not created</div>;
	}
	if (checkoutCompleteResult.checkoutComplete.order.errors.length > 0) {
		return <div>Order errors: {JSON.stringify(checkoutCompleteResult.checkoutComplete.order.errors)}</div>;
	}
	redirect(`/app-router/cart/success/${checkoutCompleteResult.checkoutComplete.order.id}`);
}
