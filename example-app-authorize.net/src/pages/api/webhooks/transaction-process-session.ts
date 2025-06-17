import { SaleorSyncWebhook } from "@saleor/app-sdk/handlers/next";

import { createLogger } from "@/lib/logger";
import { SynchronousWebhookResponseBuilder } from "@/lib/webhook-response-builder";
import { getAuthorizeConfig } from "@/modules/authorize-net/authorize-net-config";
import { AuthorizeWebhookManager } from "@/modules/authorize-net/webhook/authorize-net-webhook-manager";
import { createAppWebhookManager } from "@/modules/webhooks/webhook-manager-service";
import { errorUtils } from "@/error-utils";
import { saleorApp } from "@/saleor-app";
import { type TransactionProcessSessionResponse } from "@/schemas/TransactionProcessSession/TransactionProcessSessionResponse.mjs";
import {
  UntypedTransactionProcessSessionDocument,
  type TransactionProcessSessionEventFragment,
} from "generated/graphql";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const transactionProcessSessionSyncWebhook =
  new SaleorSyncWebhook<TransactionProcessSessionEventFragment>({
    name: "TransactionProcessSession",
    apl: saleorApp.apl,
    event: "TRANSACTION_PROCESS_SESSION",
    query: UntypedTransactionProcessSessionDocument,
    webhookPath: "/api/webhooks/transaction-process-session",
  });

const logger = createLogger({
  name: "transactionProcessSessionSyncWebhook",
});

class WebhookResponseBuilder extends SynchronousWebhookResponseBuilder<TransactionProcessSessionResponse> {}

/**
 * This webhook can be used to synchronize the transaction status with Saleor. It calls Authorize transaction API, and then maps the response to Saleor's transaction.
 */
export default transactionProcessSessionSyncWebhook.createHandler(
  async (req, res, { authData, ...ctx }) => {
    const responseBuilder = new WebhookResponseBuilder(res);
    const channelSlug = ctx.payload.sourceObject.channel.slug;

    // todo: add more extensive logs
    logger.debug(
      {
        action: ctx.payload.action,
        channelSlug,
        transaction: ctx.payload.transaction,
      },
      "Handler called",
    );

    try {
      const authorizeConfig = getAuthorizeConfig();
      const authorizeWebhookManager = new AuthorizeWebhookManager({
        appConfig: authorizeConfig,
      });

      await authorizeWebhookManager.register();

      const appWebhookManager = await createAppWebhookManager({
        authData,
        authorizeConfig,
      });

      const response = await appWebhookManager.transactionProcessSession(ctx.payload);

      // eslint-disable-next-line @saleor/saleor-app/logger-leak
      logger.info({ response }, "Responding with:");
      return responseBuilder.ok(response);
    } catch (error) {
      const normalizedError = errorUtils.normalize(error);
      errorUtils.capture(normalizedError);
      logger.error(normalizedError);

      return responseBuilder.ok({
        amount: ctx.payload.action.amount,
        result: "AUTHORIZATION_FAILURE",
        message: "Failure",
        data: errorUtils.buildResponse(normalizedError),
      });
    }
  },
);
