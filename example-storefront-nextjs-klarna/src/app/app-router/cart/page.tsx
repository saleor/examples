"use server";

import { getCheckoutFromCookiesOrRedirect } from "@/lib/app-router";
import { klarnaAppId } from "@/lib/common";
import React from "react";
import { Transaction } from "./Transaction";

export default async function CartPage() {
	const checkout = await getCheckoutFromCookiesOrRedirect();

	const isKlarnaAppInstalled = checkout.availablePaymentGateways.some(
		(gateway) => gateway.id === klarnaAppId,
	);

	if (!isKlarnaAppInstalled) {
		return (
			<div className="text-red-500">
				Klarna App was not installed in this Saleor Cloud instance. Go to{" "}
				<a href="https://klarna.saleor.app/">klarna.saleor.app</a> and follow the instructions.
			</div>
		);
	}

	return <Transaction checkoutId={checkout.id} />;
}
