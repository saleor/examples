import type { JSONValue } from "../types";
import { BaseError, UnknownError } from "@/errors";

export const tryJsonParse = (text: string | undefined) => {
  if (!text) {
    return undefined;
  }
  try {
    return JSON.parse(text) as JSONValue;
  } catch (e) {
    return text;
  }
};

export const tryIgnore = (fn: () => void) => {
  try {
    fn();
  } catch {
    // noop
  }
};

export const toStringOrEmpty = (value: unknown) => {
  if (typeof value === "string") return value;
  return "";
};

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
    return [BaseError.normalize(maybeError, UnknownError), null];
  }
};

type ThrowableToTupleResult<T> = [Error, null] | [null, T];
export const unpackThrowable = <T>(throwable: () => T): ThrowableToTupleResult<T> => {
  try {
    const result = throwable();
    return [null, result];
  } catch (maybeError) {
    if (maybeError instanceof Error) {
      return [maybeError, null];
    }
    return [BaseError.normalize(maybeError, UnknownError), null];
  }
};

export const isNotNullish = <T>(val: T | null | undefined): val is T =>
  val !== undefined && val !== null;

export const isObject = (val: unknown): val is Record<string, unknown> =>
  typeof val === "object" && val !== null && !Array.isArray(val);

export const __do = <T>(fn: () => T): T => fn();
