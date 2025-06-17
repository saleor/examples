import { gql, useQuery } from "@apollo/client";
import {
	GetCheckoutByIdDocument,
	GetCheckoutByIdQuery,
	GetCheckoutByIdQueryVariables,
} from "../../../generated/graphql";
import { authorizeNetAppId } from "../../lib/common";
import React from "react";
import { PaymentMethods } from "../../payment-methods";

export function getCheckoutId() {
	const checkoutId = typeof sessionStorage === "undefined" ? undefined : sessionStorage.getItem("checkoutId");

	if (!checkoutId) {
		throw new Error("Checkout ID not found in sessionStorage");
	}

	return checkoutId;
}

export default function CartPage() {
	const checkoutId = getCheckoutId();

	const { data: checkoutResponse, loading: checkoutLoading } = useQuery<
		GetCheckoutByIdQuery,
		GetCheckoutByIdQueryVariables
	>(gql(GetCheckoutByIdDocument.toString()), { variables: { id: checkoutId } });

	const isAuthorizeAppInstalled = checkoutResponse?.checkout?.availablePaymentGateways.some(
		(gateway) => gateway.id === authorizeNetAppId,
	);

	if (!checkoutResponse || checkoutLoading) {
		return <div>Loading…</div>;
	}

	if (!isAuthorizeAppInstalled) {
		return (
			<div className="text-red-500">
				Authorize.net App was not installed in this Saleor Cloud instance. Go to{" "}
				<a href="https://authorize.saleor.app/">authorize.saleor.app</a> and follow the instructions.
			</div>
		);
	}

	return (
		<div>
			<h1 className="text-3xl font-semibold text-slate-900">Cart:</h1>
			<ul className="my-4 ml-4 list-disc">
				{checkoutResponse.checkout?.lines.map((line) => <li key={line.id}>{line.variant.product.name}</li>)}
			</ul>
			<PaymentMethods />
		</div>
	);
}
