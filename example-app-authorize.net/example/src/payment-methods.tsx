import { gql, useMutation } from "@apollo/client";
import React from "react";
import { z } from "zod";
import {
	PaymentGatewayInitializeDocument,
	PaymentGatewayInitializeMutation,
	PaymentGatewayInitializeMutationVariables,
} from "../generated/graphql";
import { authorizeNetAppId } from "./lib/common";

import { AcceptHostedForm } from "./accept-hosted-form";
import { getCheckoutId } from "./pages/cart";

const acceptHostedPaymentGatewaySchema = z.object({});

export type AcceptHostedData = z.infer<typeof acceptHostedPaymentGatewaySchema>;

// currently, Payment Gateway Initialize doesnt return any config data
const dataSchema = z.object({
	acceptHosted: z.unknown().optional(),
	applePay: z.unknown().optional(),
	paypal: z.unknown().optional(),
});

type PaymentMethods = z.infer<typeof dataSchema>;

const paymentGatewayInitializeSessionSchema = dataSchema;

export const PaymentMethods = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethods>();

	const checkoutId = getCheckoutId();

	const [initializePaymentGateways] = useMutation<
		PaymentGatewayInitializeMutation,
		PaymentGatewayInitializeMutationVariables
	>(gql(PaymentGatewayInitializeDocument.toString()));

	const getPaymentGateways = React.useCallback(async () => {
		setIsLoading(true);
		const response = await initializePaymentGateways({
			variables: {
				appId: authorizeNetAppId,
				checkoutId,
				data: {},
			},
		});

		setIsLoading(false);

		const gateway = response.data?.paymentGatewayInitialize?.gatewayConfigs?.[0];

		if (!gateway) {
			throw new Error("No payment gateway found");
		}

		console.log(gateway.data);

		const data = paymentGatewayInitializeSessionSchema.parse(gateway.data);

		if (!data) {
			throw new Error("No data found");
		}

		setPaymentMethods(data);
	}, [initializePaymentGateways, checkoutId]);

	React.useEffect(() => {
		getPaymentGateways();
	}, [getPaymentGateways]);

	return (
		<div>
			<h2>Payment Methods</h2>
			{isLoading && <p>Loading...</p>}
			<ul className="flex gap-4 items-center">
				{paymentMethods?.acceptHosted !== undefined && (
					<li>
						<AcceptHostedForm />
					</li>
				)}
				{paymentMethods?.applePay !== undefined && (
					<li>
						<button>Apple Pay</button>
					</li>
				)}
				{paymentMethods?.paypal !== undefined && (
					<li>
						<button>PayPal</button>
					</li>
				)}
			</ul>
		</div>
	);
};
