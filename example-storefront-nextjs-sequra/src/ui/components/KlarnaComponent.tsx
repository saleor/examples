"use client";

import { useEffect, useRef } from "react";

export const SequraComponent = ({
	sequraClientToken,
	onComplete,
}: {
	sequraClientToken: string;
	onComplete: () => Promise<void>;
}) => {
	const isInitializedRef = useRef(false);

	useEffect(() => {
		if (typeof window === "undefined" || "Sequra" in window) {
			return;
		}
		if (isInitializedRef.current) {
			return;
		}
		isInitializedRef.current = true;
		console.log("useEffect");

		// @ts-expect-error -- sequra callback
		window.sequraAsyncCallback = () => {
			console.log("sequraAsyncCallback");
			// @ts-expect-error -- sequra callback
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
			Sequra.Payments.init({
				client_token: sequraClientToken,
			});
			// @ts-expect-error -- sequra callback
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
			Sequra.Payments.authorize(
				{
					payment_method_categories: [
						{
							asset_urls: {},
							identifier: "sequra",
							name: "Pay with Sequra",
						},
					],
					customer: {
						date_of_birth: "1980-01-01",
					},
				},
				async function (...args: unknown[]) {
					console.log(...args);
					await onComplete();
				},
			);
			// Sequra.Payments.load(
			// 	{
			// 		container: "#sequra-payments-container",
			// 		// payment_method_categories: sequraSession.payment_method_categories,
			// 		// payment_method_category: "pay_later",
			// 		// payment_method_categories: [{ identifier: "pay_later" }],
			// 		payment_method_categories: [
			// 			{
			// 				asset_urls: {},
			// 				identifier: "sequra",
			// 				name: "Pay with Sequra",
			// 			},
			// 		],
			// 	},
			// 	(res) => {
			// 		console.debug(res);
			// 	},
			// );
		};

		const script = document.createElement("script");
		script.id = "sequra-payments-sdk";
		script.src = `https://x.sequracdn.net/kp/lib/v1/api.js`;
		script.async = true;
		document.body.appendChild(script);
	}, [sequraClientToken, onComplete]);

	return <div id="sequra-payments-container" />;
};
