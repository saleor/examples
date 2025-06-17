import { verifyJWT } from "@saleor/app-sdk/verify-jwt";
import { logger, redactLogValue } from "../../lib/logger";
import { REQUIRED_SALEOR_PERMISSIONS } from "../jwt/consts";
import { middleware, procedure } from "./trpc-server";
import { checkTokenExpiration } from "@/modules/jwt/check-token-expiration";
import { saleorApp } from "@/saleor-app";
import { createClient } from "@/lib/create-graphq-client";
import {
  JwtInvalidError,
  JwtTokenExpiredError,
  ReqMissingAppIdError,
  ReqMissingAuthDataError,
  ReqMissingSaleorApiUrlError,
  ReqMissingTokenError,
} from "@/errors";

const attachAppToken = middleware(async ({ ctx, next }) => {
  logger.debug("attachAppToken middleware");

  if (!ctx.saleorApiUrl) {
    logger.debug("ctx.saleorApiUrl not found, throwing");

    throw new ReqMissingSaleorApiUrlError("Missing saleorApiUrl in request");
  }

  const authData = await saleorApp.apl.get(ctx.saleorApiUrl);

  if (!authData) {
    logger.debug("authData not found, throwing 401");

    throw new ReqMissingAuthDataError("Missing authData in request");
  }

  return next({
    ctx: {
      appToken: authData.token,
      saleorApiUrl: authData.saleorApiUrl,
      appId: authData.appId,
    },
  });
});

const validateClientToken = middleware(async ({ ctx, next }) => {
  logger.debug("validateClientToken middleware");

  if (!ctx.token) {
    throw new ReqMissingTokenError(
      "Missing token in request. This middleware can be used only in frontend",
    );
  }

  if (!ctx.appId) {
    throw new ReqMissingAppIdError(
      "Missing appId in request. This middleware can be used after auth is attached",
    );
  }

  if (!ctx.saleorApiUrl) {
    throw new ReqMissingSaleorApiUrlError(
      "Missing saleorApiUrl in request. This middleware can be used after auth is attached",
    );
  }

  logger.debug({ token: redactLogValue(ctx.token) }, "check if JWT token didn't expire");

  const expired = checkTokenExpiration(ctx.token);
  logger.debug({ expired }, "JWT token expiration check result");
  if (expired) {
    throw new JwtTokenExpiredError("Token expired");
  }

  try {
    logger.debug({ token: redactLogValue(ctx.token) }, "trying to verify JWT token from frontend");

    await verifyJWT({
      appId: ctx.appId,
      token: ctx.token,
      saleorApiUrl: ctx.saleorApiUrl,
      requiredPermissions: REQUIRED_SALEOR_PERMISSIONS,
    });
  } catch (e) {
    logger.debug("JWT verification failed, throwing");
    throw new JwtInvalidError("Invalid token", { cause: e });
  }

  return next({
    ctx: {
      ...ctx,
      saleorApiUrl: ctx.saleorApiUrl,
    },
  });
});

/**
 * Construct common graphQL client and attach it to the context
 *
 * Can be used only if called from the frontend (react-query),
 * otherwise jwks validation will fail (if createCaller used)
 *
 * TODO Rethink middleware composition to enable safe server-side router calls
 */
export const protectedClientProcedure = procedure
  .use(attachAppToken)
  .use(validateClientToken)
  .use(async ({ ctx, next }) => {
    const client = createClient(ctx.saleorApiUrl, async () =>
      Promise.resolve({ token: ctx.appToken }),
    );

    const pinoLoggerInstance = logger.child({
      saleorApiUrl: ctx.saleorApiUrl,
    });

    return next({
      ctx: {
        apiClient: client,
        appToken: ctx.appToken,
        saleorApiUrl: ctx.saleorApiUrl,
        logger: pinoLoggerInstance,
      },
    });
  });
