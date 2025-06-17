import { GetCheckoutByIdDocument } from "@/generated/graphql";
import { executeGraphQL } from "@/lib/common";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getCheckoutFromCookiesOrRedirect() {
	const checkoutId = cookies().get("checkoutId")?.value;

	if (!checkoutId) {
		redirect("/app-router/");
	}

	const checkout = await executeGraphQL({
		query: GetCheckoutByIdDocument,
		variables: {
			id: checkoutId,
		},
		cache: "no-store",
	});

	if (!checkout.checkout) {
		// https://github.com/vercel/next.js/issues/51875
		// cookies().set("checkoutId", "");
		redirect("/app-router/");
	}

	return checkout.checkout;
}
