import { type NextWebhookApiHandler } from "@saleor/app-sdk/handlers/next";
import type { ValidateFunction } from "ajv";
import { type NextApiRequest, type NextApiResponse } from "next";
import { type z } from "zod";
import { createLogger, redactError } from "../lib/logger";
import {
  type CheckoutSourceObjectFragment,
  type OrderSourceObjectFragment,
} from "generated/graphql";
import { saleorApp } from "@/saleor-app";
import { toStringOrEmpty } from "@/lib/utils";
import {
  BaseError,
  JsonParseError,
  JsonSchemaError,
  MissingAuthDataError,
  MissingSaleorApiUrlError,
  UnknownError,
} from "@/errors";

export const parseRawBodyToJson = async <T>(req: NextApiRequest, schema: z.ZodType<T>) => {
  try {
    if (typeof req.body !== "string") {
      throw new JsonParseError("Invalid body type");
    }
    if (req.body === "") {
      throw new JsonParseError("No request body");
    }
    const json = JSON.parse(req.body);
    return [null, schema.parse(json)] as const;
  } catch (err) {
    return [JsonParseError.normalize(err), null] as const;
  }
};

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
        const result = BaseError.serialize(err);
        logger.debug("Sending error response");
        return res.status(500).json(result);
      }

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
    errors,
    message,
  };
};

export const getAuthDataForRequest = async (request: NextApiRequest) => {
  const logger = createLogger({}, { msgPrefix: "[getAuthDataForRequest] " });

  const saleorApiUrl = toStringOrEmpty(request.query.saleorApiUrl);
  logger.info(`Got saleorApiUrl=${saleorApiUrl || "<undefined>"}`);
  if (!saleorApiUrl) {
    throw new MissingSaleorApiUrlError("Missing saleorApiUrl query param");
  }

  const authData = await saleorApp.apl.get(saleorApiUrl);
  logger.debug({ authData });
  if (!authData) {
    throw new MissingAuthDataError(`APL for ${saleorApiUrl} not found`);
  }

  return authData;
};

export const getNormalizedLocale = (
  sourceObject: OrderSourceObjectFragment | CheckoutSourceObjectFragment,
) => {
  return "languageCode" in sourceObject
    ? sourceObject.languageCode
    : sourceObject.languageCodeEnum.toString();
};
