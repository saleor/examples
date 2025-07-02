import { gql, useMutation } from "@apollo/client";
import React from "react";
import { AcceptHosted } from "react-acceptjs";
import { z } from "zod";
import {
	TransactionInitializeDocument,
	TransactionInitializeMutation,
	TransactionInitializeMutationVariables,
	TransactionProcessDocument,
	TransactionProcessMutation,
	TransactionProcessMutationVariables,
} from "../generated/graphql";
import { authorizeNetAppId } from "./lib/common";
import { getCheckoutId } from "./pages/cart";
import { useRouter } from "next/router";

const acceptHostedTransactionResponseSchema = z.object({
	transId: z.string(),
});

const authorizeEnvironmentSchema = z.enum(["sandbox", "production"]);

const acceptHostedTransactionInitializeResponseDataSchema = z.object({
	formToken: z.string().min(1),
	environment: authorizeEnvironmentSchema,
});

type AcceptHostedData = z.infer<typeof acceptHostedTransactionInitializeResponseDataSchema>;

export function AcceptHostedForm() {
	const checkoutId = getCheckoutId();
	const router = useRouter();
	const [acceptData, setAcceptData] = React.useState<AcceptHostedData>();
	const [transactionId, setTransactionId] = React.useState<string>();

	const [initializeTransaction] = useMutation<
		TransactionInitializeMutation,
		TransactionInitializeMutationVariables
	>(gql(TransactionInitializeDocument.toString()));

	const [processTransaction] = useMutation<TransactionProcessMutation, TransactionProcessMutationVariables>(
		gql(TransactionProcessDocument.toString()),
	);

	const getAcceptData = React.useCallback(async () => {
		const initializeTransactionResponse = await initializeTransaction({
			variables: {
				checkoutId,
				paymentGateway: authorizeNetAppId,
				data: {
					type: "acceptHosted",
					data: {
						shouldCreateCustomerProfile: true,
					},
				},
			},
		});

		if (initializeTransactionResponse.data?.transactionInitialize?.errors?.length) {
			throw new Error("Failed to initialize transaction");
		}

		const nextTransactionId = initializeTransactionResponse.data?.transactionInitialize?.transaction?.id;

		if (!nextTransactionId) {
			throw new Error("Transaction id not found in response");
		}

		setTransactionId(nextTransactionId);

		const data = initializeTransactionResponse.data?.transactionInitialize?.data;

		if (!data) {
			throw new Error("No data found in response");
		}

		console.log(data);

		const nextAcceptData = acceptHostedTransactionInitializeResponseDataSchema.parse(data);
		setAcceptData(nextAcceptData);
	}, [initializeTransaction, checkoutId]);

	React.useEffect(() => {
		getAcceptData();
	}, [getAcceptData]);

	const transactionResponseHandler = React.useCallback(
		async (rawResponse: unknown) => {
			console.log({ rawResponse }, "✅ transactionResponseHandler called");

			const authorizeResponse = acceptHostedTransactionResponseSchema.parse(rawResponse);

			const data = {
				authorizeTransactionId: authorizeResponse.transId,
			};

			if (!transactionId) {
				throw new Error("Transaction id not found");
			}

			const processTransactionResponse = await processTransaction({
				variables: {
					transactionId,
					data,
				},
			});

			const isProcessTransactionSuccessful =
				processTransactionResponse?.data?.transactionProcess?.transactionEvent?.type ===
				"AUTHORIZATION_SUCCESS";

			if (!isProcessTransactionSuccessful) {
				throw new Error("Failed to process transaction");
			}

			router.push("/success");
		},
		[processTransaction, router, transactionId],
	);

	return (
		<>
			{acceptData && (
				<AcceptHosted
					integration="iframe"
					formToken={acceptData.formToken}
					environment={acceptData.environment.toUpperCase() as "SANDBOX" | "PRODUCTION"}
					onTransactionResponse={transactionResponseHandler}
				>
					<AcceptHosted.Button className="mt-2 rounded-md border bg-slate-900 px-8 py-2 text-lg text-white hover:bg-slate-800">
						Pay
					</AcceptHosted.Button>
					<AcceptHosted.IFrameBackdrop />
					<AcceptHosted.IFrameContainer>
						<AcceptHosted.IFrame />
					</AcceptHosted.IFrameContainer>
				</AcceptHosted>
			)}
		</>
	);
}
