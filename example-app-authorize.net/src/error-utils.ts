import { BaseError } from "./errors";

function normalizeError(error: unknown) {
  return BaseError.normalize(error);
}

function buildErrorResponse(error: Error) {
  return {
    error: {
      message: error.message,
    },
  };
}

export const errorUtils = {
  buildResponse: buildErrorResponse,
  normalize: normalizeError,
};
