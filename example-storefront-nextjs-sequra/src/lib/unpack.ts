type PromiseToTupleResult<T> = [Error, null] | [null, Awaited<T>];
export const unpackPromise = async <T extends Promise<unknown>>(
	promise: T,
): Promise<PromiseToTupleResult<T>> => {
	try {
		const result = await promise;
		return [null, result];
	} catch (maybeError) {
		if (maybeError instanceof Error) {
			return [maybeError, null];
		}
		return [new Error(String(maybeError)), null];
	}
};
