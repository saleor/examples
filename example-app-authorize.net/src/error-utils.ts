import * as Sentry from "@sentry/nextjs";
import { BaseError } from "./errors";

function normalizeError(error: unknown) {
  return BaseError.normalize(error);
}

function captureError(error: Error) {
  Sentry.captureException(error);
}

function buildErrorResponse(error: Error) {
  return {
    error: {
      message: error.message,
    },
  };
}

export const errorUtils = {
  capture: captureError,
  buildResponse: buildErrorResponse,
  normalize: normalizeError,
};
