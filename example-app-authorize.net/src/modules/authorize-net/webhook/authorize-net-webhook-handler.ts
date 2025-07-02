import crypto from "crypto";
import { type AuthData } from "@saleor/app-sdk/APL";
import { buffer } from "micro";
import { type NextApiRequest } from "next";
import { z } from "zod";
import { getAuthorizeConfig } from "../authorize-net-config";

import { AuthorizeNetError } from "../authorize-net-error";
import { authorizeNetEventSchema } from "./authorize-net-webhook-client";
import { MissingAuthDataError } from "./authorize-net-webhook-errors";
import { TransactionEventReporter } from "./transaction-event-reporter";
import { createServerClient } from "@/lib/create-graphq-client";
import { createLogger } from "@/lib/logger";
import { unpackThrowable } from "@/lib/utils";
import { saleorApp } from "@/saleor-app";

const eventPayloadSchema = z.object({
  notificationId: z.string(),
  eventType: authorizeNetEventSchema,
  eventDate: z.string(),
  webhookId: z.string(),
  payload: z.object({
    entityName: z.enum(["transaction"]),
    id: z.string(),
  }),
});

export type EventPayload = z.infer<typeof eventPayloadSchema>;

const AuthorizeNetWebhookHandlerError = AuthorizeNetError.subclass(
  "AuthorizeNetWebhookHandlerError",
);

const AuthorizeNetInvalidWebhookSignatureError = AuthorizeNetWebhookHandlerError.subclass(
  "AuthorizeNetInvalidWebhookSignatureError",
);

/**
 * @description This class is used to handle webhook calls from Authorize.net
 */
export class AuthorizeNetWebhookHandler {
  private readonly authorizeSignature = "x-anet-signature";
  private authData: AuthData | null = null;

  private logger = createLogger({
    name: "AuthorizeWebhookHandler",
  });

  constructor(private request: NextApiRequest) {}

  private async getAuthData() {
    if (this.authData) {
      return this.authData;
    }

    const results = await saleorApp.apl.getAll();
    const authData = results?.[0];

    if (!authData) {
      throw new MissingAuthDataError("APL not found");
    }

    this.authData = authData;

    return authData;
  }

  private async getRawBody() {
    const rawBody = (await buffer(this.request)).toString();
    return rawBody;
  }

  /**
   * @description This method follows the process described in the documentation:
   * @see https://developer.authorize.net/api/reference/features/webhooks.html#Verifying_the_Notification
   */
  private async verifyWebhook() {
    this.logger.debug("Verifying webhook signature...");
    const authorizeConfig = getAuthorizeConfig();
    const headers = this.request.headers;
    const xAnetSignature = headers[this.authorizeSignature]?.toString();

    if (!xAnetSignature) {
      throw new AuthorizeNetInvalidWebhookSignatureError(
        `Missing ${this.authorizeSignature} header`,
      );
    }

    const rawBody = await this.getRawBody();

    const hash = crypto
      .createHmac("sha512", authorizeConfig.signatureKey)
      .update(rawBody)
      .digest("hex");

    const validSignature = `sha512=${hash.toUpperCase()}`;

    if (
      validSignature.length !== xAnetSignature.length ||
      !crypto.timingSafeEqual(Buffer.from(validSignature), Buffer.from(xAnetSignature))
    ) {
      throw new AuthorizeNetInvalidWebhookSignatureError("The signature does not match");
    }

    this.logger.debug("Webhook verified successfully");
  }

  private async parseWebhookBody() {
    const rawBody = await this.getRawBody();
    const [parsingError, body] = unpackThrowable(() => JSON.parse(rawBody));
    if (parsingError) {
      throw new AuthorizeNetInvalidWebhookSignatureError("Unexpected webhook body (not JSON)");
    }

    const parseResult = eventPayloadSchema.safeParse(body);

    if (!parseResult.success) {
      throw new AuthorizeNetInvalidWebhookSignatureError("Unexpected shape of the webhook body");
    }

    const eventPayload = parseResult.data;

    return eventPayload;
  }

  private async processAuthorizeWebhook(eventPayload: EventPayload) {
    const authData = await this.getAuthData();
    const client = createServerClient(authData.saleorApiUrl, authData.token);

    const reporter = new TransactionEventReporter({
      client,
    });

    return reporter.reportEvent(eventPayload);
  }

  async handle() {
    await this.verifyWebhook();
    const eventPayload = await this.parseWebhookBody();
    await this.processAuthorizeWebhook(eventPayload);

    this.logger.debug("Finished processing webhook");
  }
}
