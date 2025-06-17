import type { TypedDocumentString } from "@/generated/graphql";

interface GraphQlError {
	message: string;
}
type GraphQlErrorRespone<T> = { data: T } | { errors: readonly GraphQlError[] };

const endpoint = process.env.SALEOR_API_URL;

export async function executeGraphQL<Result, Variables>({
	query,
	variables,
	headers,
	cache,
}: {
	query: TypedDocumentString<Result, Variables>;
	variables: Variables;
	headers?: HeadersInit;
	cache?: RequestCache;
}): Promise<Result> {
	if (!endpoint) {
		throw new Error("Missing SALEOR_API_URL");
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
		throw body.errors[0];
	}

	return body.data;
}
