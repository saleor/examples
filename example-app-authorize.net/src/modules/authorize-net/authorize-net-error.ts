import { BaseError } from "@/errors";

export const AuthorizeNetError = BaseError.subclass("AuthorizeNetError");

/**
 * We parse each response from Authorize.net and if it doesn't match the expected schema we throw this error. It probably means that the transaction flow differed from what is implemented.
 */
export const AuthorizeNetResponseValidationError = AuthorizeNetError.subclass(
  "AuthorizeNetResponseValidationError",
);
