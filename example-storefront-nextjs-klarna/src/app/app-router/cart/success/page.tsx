import { CheckoutCompleteDocument, TransactionProcessDocument } from "@/generated/graphql";
import { getCheckoutFromCookiesOrRedirect } from "@/lib/app-router";
import { executeGraphQL } from "@/lib/common";
import { notFound } from "next/navigation";

export default async function CartSuccessPage({
	searchParams,
}: {
	searchParams: { authorization_token: string | undefined; transaction_id: string };
}) {
	const checkout = await getCheckoutFromCookiesOrRedirect();

	if (!searchParams.transaction_id) {
		throw new Error("transaction_id search param is missing");
	}

	if (!searchParams.authorization_token) {
		throw new Error("authorization_token search param is missing");
	}

	const transactionId = decodeURIComponent(searchParams.transaction_id);
	const authorizationToken = searchParams.authorization_token;

	await executeGraphQL({
		query: TransactionProcessDocument,
		variables: {
			transactionId,
			data: {
				authorizationToken,
			},
		},
		cache: "no-store",
	});

	const data = await executeGraphQL({
		query: CheckoutCompleteDocument,
		variables: {
			checkoutId: checkout.id,
		},
	});

	const order = data.checkoutComplete?.order;

	if (!order) {
		notFound();
	}

	return (
		<article>
			<h1 className="text-5xl">Order #{order.id} created!</h1>
		</article>
	);
}
