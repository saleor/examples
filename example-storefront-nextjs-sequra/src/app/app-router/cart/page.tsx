import { getCheckoutFromCookiesOrRedirect } from "@/lib/app-router";
import { executeGraphQL, sequraAppId } from "@/lib/common";
import { TransactionInitializeDocument } from "@/generated/graphql";
import { redirect } from "next/navigation";

export default async function CartPage() {
	const checkout = await getCheckoutFromCookiesOrRedirect();

	const isSequraAppInstalled = checkout.availablePaymentGateways.some(
		(gateway) => gateway.id === sequraAppId,
	);

	if (!isSequraAppInstalled) {
		return (
			<div className="text-red-500">
				Sequra App was not installed in this Saleor Cloud instance. Go to{" "}
				<a href="https://sequra.saleor.app/">sequra.saleor.app</a> and follow the instructions.
			</div>
		);
	}

	return (
		<form
			action={async () => {
				"use server";
				const transaction = await executeGraphQL({
					query: TransactionInitializeDocument,
					variables: {
						checkoutId: checkout.id,
						data: {
							returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/app-router/cart/return/${checkout.id}?sqProductCode=SQ_PRODUCT_CODE`,
						},
					},
					cache: "no-store",
				});

				if (transaction.transactionInitialize?.errors.length) {
					console.error(transaction.transactionInitialize.errors);
					return;
				}

				const sequraData = transaction.transactionInitialize?.data as
					| undefined
					| {
							sequraOrderUrl: string;
							sequraOrderId: string;
					  };
				if (transaction.transactionInitialize?.errors.length ?? !sequraData) {
					console.error(transaction.transactionInitialize?.errors);
					return;
				}
				redirect(`/app-router/${sequraData.sequraOrderId}`);
			}}
		>
			<button type="submit" className="rounded-md border p-2 shadow-md">
				Pay with Sequra
			</button>
		</form>
	);
}
