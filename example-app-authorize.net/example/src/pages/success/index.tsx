import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import {
	CheckoutCompleteMutation,
	CheckoutCompleteMutationVariables,
	CheckoutCompleteDocument,
} from "../../../generated/graphql";
import { getCheckoutId } from "../cart";

const SuccessPage = () => {
	const checkoutId = getCheckoutId();
	const [isCompleted, setIsCompleted] = React.useState(false);
	const [completeCheckout] = useMutation<CheckoutCompleteMutation, CheckoutCompleteMutationVariables>(
		gql(CheckoutCompleteDocument.toString()),
	);

	const checkoutCompleteHandler = async () => {
		const response = await completeCheckout({
			variables: {
				checkoutId,
			},
		});

		if (response.errors?.length) {
			throw new Error("Failed to complete checkout");
		}

		setIsCompleted(true);
	};

	return (
		<div>
			<p>Transaction created 🎉</p>
			{isCompleted ? (
				<p>Checkout completed</p>
			) : (
				<button
					className="mt-2 rounded-md border bg-slate-900 px-8 py-2 text-lg text-white hover:bg-slate-800"
					type="button"
					onClick={checkoutCompleteHandler}
				>
					Complete checkout
				</button>
			)}
		</div>
	);
};

export default SuccessPage;
