import { createLogger } from "@/lib/logger";
import { type AuthorizeConfig } from "@/modules/authorize-net/authorize-net-config";

/**
 * @description Create a value for Authorization: basic header for Authorize.net webhooks
 * @see https://developer.authorize.net/api/reference/features/webhooks.html
 */
function createAuthorizeAuthenticationKey(config: AuthorizeConfig): string {
  const concatenatedKey = `${config.apiLoginId}:${config.transactionKey}`;
  const encodedKey = Buffer.from(concatenatedKey).toString("base64");

  return encodedKey;
}

type AuthorizeWebhooksFetchParams = {
  path?: string;
  body?: Record<string, unknown>;
  method: Required<RequestInit["method"]>;
} & Omit<RequestInit, "body" | "method">;

export function createAuthorizeWebhooksFetch(config: AuthorizeConfig) {
  const authenticationKey = createAuthorizeAuthenticationKey(config);

  const url =
    config.environment === "sandbox"
      ? "https://apitest.authorize.net/rest/v1/webhooks"
      : "https://api.authorize.net/rest/v1/webhooks";

  const logger = createLogger({
    name: "AuthorizeWebhooksFetch",
  });

  return ({ path, body, method }: AuthorizeWebhooksFetchParams) => {
    const apiUrl = path ? `${url}/${path}` : url;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authenticationKey}`,
      },
      body: JSON.stringify(body),
    };

    logger.trace({ apiUrl, options: { method, body } }, "Calling Authorize.net webhooks API");
    return fetch(apiUrl, options);
  };
}
