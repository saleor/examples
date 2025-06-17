// We have to use process.env, otherwise pino doesn't work
/* eslint-disable node/no-process-env */
import pino from "pino";

import pinoPretty from "pino-pretty";
import { isObject } from "./utils";
import { BaseError, BaseTrpcError } from "@/errors";
import { obfuscateValue } from "@/lib/obfuscate";

const logLevel = process.env.APP_LOG_LEVEL ?? "silent";

export const logger = pino(
  {
    level: logLevel,
    redact: ["response.data.formToken", "response.token"],
  },
  // stream,
  process.env.NODE_ENV === "development"
    ? pinoPretty({
        colorize: true,
      })
    : pino.destination(),
);

export const createLogger = logger.child.bind(logger);

export type Logger = typeof logger;

export const redactLogValue = (value: unknown) => {
  if (typeof value !== "string") {
    // non-string values are fully redacted to prevent leaks
    return "[REDACTED]";
  }

  return obfuscateValue(value);
};

export const redactError = (error: unknown) => {
  if (error instanceof BaseTrpcError) {
    const { message, name, errorCode, statusCode, trpcCode } = error;
    return {
      message,
      name,
      errorCode,
      statusCode,
      trpcCode,
    };
  }
  if (error instanceof BaseError) {
    const { message, name, errorCode, statusCode } = error;
    return {
      message,
      name,
      errorCode,
      statusCode,
    };
  }
  if (error instanceof Error) {
    const { message, name } = error;
    return {
      message,
      name,
    };
  }
};

export const redactLogObject = <T extends {}>(obj: T, callCount = 1): T => {
  if (callCount > 10) {
    logger.warn("Exceeded max call count for redactLogObject");
    return { _message: "[REDACTED - MAX CALL COUNT EXCEEDED]" } as unknown as T;
  }

  const entries = Object.entries(obj).map(([key, value]) => {
    if (isObject(value)) {
      return [key, redactLogObject(value, callCount + 1)];
    }
    if (Array.isArray(value)) {
      return [key, redactLogArray(value)];
    }
    return [key, redactLogValue(value)];
  });
  return Object.fromEntries(entries) as T;
};

export const redactLogArray = <T extends unknown[]>(array: T | undefined, callCount = 1): T => {
  if (!array) return [] as unknown as T;
  if (callCount > 10) {
    logger.warn("Exceeded max call count for redactLogArray");
    return [] as unknown as T;
  }

  return array.map((item) => {
    if (isObject(item)) {
      return redactLogObject(item, callCount + 1);
    }
    if (Array.isArray(item)) {
      return redactLogArray(item, callCount + 1);
    }
    return redactLogValue(item);
  }) as T;
};
