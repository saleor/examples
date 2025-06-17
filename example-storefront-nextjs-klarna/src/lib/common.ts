import { TypedDocumentString } from "@/generated/graphql";

export const klarnaAppId = `app.saleor.klarna`;

export const formatMoney = (amount: number, currency: string) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(amount);

interface GraphQlError {
	message: string;
}
type GraphQlErrorRespone<T> = { data: T } | { errors: readonly GraphQlError[] };

const endpoint = process.env.NEXT_PUBLIC_SALEOR_API_URL;

export async function executeGraphQL<Result, Variables>({
	query,
	variables,
	headers,
	cache,
}: {
	query: TypedDocumentString<Result, Variables>;
	headers?: HeadersInit;
	cache?: RequestCache;
} & (Variables extends Record<string, never>
	? { variables?: never }
	: { variables: Variables })): Promise<Result> {
	if (!endpoint) {
		throw new Error("Missing NEXT_PUBLIC_SALEOR_API_URL");
	}

	const result = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
		body: JSON.stringify({
			query: query.toString(),
			...(variables && { variables }),
		}),
		cache,
	});

	const body = (await result.json()) as GraphQlErrorRespone<Result>;

	if ("errors" in body) {
		throw new Error(`GraphQL Error`, { cause: body.errors });
	}

	return body.data;
}
