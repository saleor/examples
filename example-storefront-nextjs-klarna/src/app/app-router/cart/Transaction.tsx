"use client";

import { TransactionInitializeDocument } from "@/generated/graphql";
import { executeGraphQL } from "@/lib/common";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

export const Transaction = ({ checkoutId }: { checkoutId: string }) => {
	const router = useRouter();

	const createTransaction = useCallback(async () => {
		const url = window.location.href;
		const success = `${url}/success`;

		const transaction = await executeGraphQL({
			query: TransactionInitializeDocument,
			variables: {
				checkoutId: checkoutId,
				data: {
					merchantUrls: {
						success,
					},
				},
			},
			cache: "no-store",
		});

		const klarnaData = transaction.transactionInitialize?.data as
			| undefined
			| {
					klarnaHppResponse: {
						redirectUrl: string;
					};
			  };

		if (transaction.transactionInitialize?.errors.length ?? !klarnaData) {
			throw new Error("Failed to initialize transaction: ");
		}

		void router.push(klarnaData.klarnaHppResponse.redirectUrl);
	}, [checkoutId, router]);

	React.useEffect(() => {
		void createTransaction();
	}, [createTransaction]);

	return <div>Loading...</div>;
};
