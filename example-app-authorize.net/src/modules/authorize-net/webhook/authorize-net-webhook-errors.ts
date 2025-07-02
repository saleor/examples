import { BaseError } from "@/errors";

const AuthorizeNetWebhookError = BaseError.subclass("AuthorizeNetWebhookError", {});

export const MissingAuthDataError = AuthorizeNetWebhookError.subclass("MissingAuthDataError", {});

export const MissingAppUrlError = AuthorizeNetWebhookError.subclass("MissingAppUrlError", {});
