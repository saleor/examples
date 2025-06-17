import { SequraForm } from "@/app/app-router/[sequraOrderId]/SequraForm";
import { PaymentGatewayInitializeDocument } from "@/generated/graphql";
import { getCheckoutFromCookiesOrRedirect } from "@/lib/app-router";
import { executeGraphQL } from "@/lib/common";
import { unpackPromise } from "@/lib/unpack";

export default async function SequraFormPage({ params }: { params: { sequraOrderId: string } }) {
	const checkout = await getCheckoutFromCookiesOrRedirect();

	const [orderFormDataError, orderFormData] = await unpackPromise(
		executeGraphQL({
			query: PaymentGatewayInitializeDocument,
			variables: {
				checkoutId: checkout.id,
				data: {
					orderId: params.sequraOrderId,
				},
			},
			cache: "no-store",
		}),
	);

	if (orderFormDataError) {
		console.error(orderFormDataError);
		return (
			<div>
				<h2>Something went wrong</h2>
				<p>{orderFormDataError.name}</p>
				<p>{orderFormDataError.message}</p>
				{orderFormDataError.stack && <pre>{orderFormDataError.stack}</pre>}
			</div>
		);
	}

	if (orderFormData.paymentGatewayInitialize?.errors.length) {
		console.error(orderFormData.paymentGatewayInitialize.errors);
		return (
			<div>
				<h2>Something went wrong</h2>
				<pre>{JSON.stringify(orderFormData.paymentGatewayInitialize.errors, null, 2)}</pre>
			</div>
		);
	}
	if (!orderFormData.paymentGatewayInitialize?.gatewayConfigs?.[0].data) {
		console.error(orderFormData.paymentGatewayInitialize);
		return (
			<div>
				<h2>Wrong response from payment app</h2>
				<p>Missing gateway configuration</p>
			</div>
		);
	}

	const data = orderFormData.paymentGatewayInitialize.gatewayConfigs[0].data as unknown;

	if (typeof data !== "object" || !data || !("orderForm" in data) || typeof data.orderForm !== "string") {
		console.error(orderFormData.paymentGatewayInitialize);
		return (
			<div>
				<h2>Wrong response from payment app</h2>
				<p>orderForm is not a string</p>
			</div>
		);
	}

	return (
		<div>
			<SequraForm orderForm={data.orderForm} />
		</div>
	);
}
