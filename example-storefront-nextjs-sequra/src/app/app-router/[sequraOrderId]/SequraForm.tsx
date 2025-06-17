"use client";

import { useEffect } from "react";
import DangerouslySetHtmlContent from "dangerously-set-html-content";

export const SequraForm = ({ orderForm }: { orderForm: string }) => {
	useEffect(() => {
		void (async () => {
			// This is a hack to make sure the Sequra form has loaded before showing it
			for (let i = 0; i < 10; i++) {
				await new Promise((resolve) => setTimeout(resolve, i * 10));
				try {
					// @ts-expect-error -- untyped third-party library
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
					window.SequraFormInstance.show();
				} catch {
					continue;
				}
				break;
			}
		})();
	}, []);
	return (
		<div>
			<DangerouslySetHtmlContent html={orderForm} />
		</div>
	);
};
