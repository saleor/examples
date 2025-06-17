import * as Sentry from "@sentry/nextjs";

import { type NextWebhookApiHandler } from "@saleor/app-sdk/handlers/next";
import type { ValidateFunction } from "ajv";
import { type NextApiResponse } from "next";
import { createLogger, redactError } from "../lib/logger";
import { type OrderOrCheckoutSourceObjectFragment } from "generated/graphql";
import { BaseError, JsonSchemaError, UnknownError } from "@/errors";

export const validateData = async <S extends ValidateFunction>(data: unknown, validate: S) => {
  type Result = S extends ValidateFunction<infer T> ? T : never;
  try {
    const isValid = validate(data);
    if (!isValid) {
      throw JsonSchemaError.normalize(validate.errors);
    }
    return data as Result;
  } catch (err) {
    throw UnknownError.normalize(err);
  }
};

export function getSyncWebhookHandler<TPayload, TResult, TSchema extends ValidateFunction<TResult>>(
  name: string,
  webhookHandler: (
    payload: TPayload,
    params: { saleorApiUrl: string; baseUrl: string },
  ) => Promise<TResult>,
  ResponseSchema: TSchema,
  errorMapper: (payload: TPayload, errorResponse: ErrorResponse) => TResult & {},
): NextWebhookApiHandler<TPayload> {
  return async (_req, res: NextApiResponse<Error | TResult>, ctx) => {
    const logger = createLogger(
      {
        event: ctx.event,
      },
      { msgPrefix: `[${name}] ` },
    );
    const { authData, baseUrl, payload } = ctx;
    logger.info(`handler called: ${webhookHandler.name}`);
    logger.debug({ payload }, "ctx payload");

    try {
      const result = await webhookHandler(payload, {
        saleorApiUrl: authData.saleorApiUrl,
        baseUrl,
      });
      logger.info(`${webhookHandler.name} was successful`);
      logger.debug({ result }, "Sending successful response");
      return res.json(await validateData(result, ResponseSchema));
    } catch (err) {
      logger.error({ err: redactError(err) }, `${webhookHandler.name} error`);

      const response = errorToResponse(err);

      if (!response) {
        Sentry.captureException(err);
        const result = BaseError.serialize(err);
        logger.debug("Sending error response");
        return res.status(500).json(result);
      }

      Sentry.captureException(...response.sentry);
      const finalErrorResponse = errorMapper(payload, response);
      logger.debug({ finalErrorResponse }, "Sending error response");
      return res.status(200).json(await validateData(finalErrorResponse, ResponseSchema));
    }
  };
}

type ErrorResponse = Exclude<ReturnType<typeof errorToResponse>, null>;
const errorToResponse = (err: unknown) => {
  const normalizedError = err instanceof BaseError ? err : null;

  if (!normalizedError) {
    return null;
  }

  const sentry = [
    normalizedError,
    {
      extra: {
        errors: normalizedError.errors,
      },
    },
  ] as const;

  const message = normalizedError.message;

  const errors = [
    {
      code: normalizedError.name,
      message: normalizedError.message,
      details: {},
    },
    ...(normalizedError.errors?.map((inner) => {
      return {
        code: inner.name,
        message: inner.message,
      };
    }) ?? []),
  ];

  return {
    sentry,
    errors,
    message,
  };
};

export const getNormalizedLocale = (event: {
  sourceObject: OrderOrCheckoutSourceObjectFragment;
}) => {
  return event.sourceObject.__typename === "Checkout"
    ? event.sourceObject.languageCode
    : event.sourceObject.languageCodeEnum.toString();
};
