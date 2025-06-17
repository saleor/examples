import { SaleorSyncWebhook } from "@saleor/app-sdk/handlers/next";

import { createLogger } from "@/lib/logger";
import { SynchronousWebhookResponseBuilder } from "@/lib/webhook-response-builder";
import { getAuthorizeConfig } from "@/modules/authorize-net/authorize-net-config";
import { AuthorizeWebhookManager } from "@/modules/authorize-net/webhook/authorize-net-webhook-manager";
import { createAppWebhookManager } from "@/modules/webhooks/webhook-manager-service";
import { saleorApp } from "@/saleor-app";
import { type TransactionInitializeSessionResponse } from "@/schemas/TransactionInitializeSession/TransactionInitializeSessionResponse.mjs";
import {
  UntypedTransactionInitializeSessionDocument,
  type TransactionInitializeSessionEventFragment,
} from "generated/graphql";
import { errorUtils } from "@/error-utils";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const transactionInitializeSessionSyncWebhook =
  new SaleorSyncWebhook<TransactionInitializeSessionEventFragment>({
    name: "TransactionInitializeSession",
    apl: saleorApp.apl,
    event: "TRANSACTION_INITIALIZE_SESSION",
    query: UntypedTransactionInitializeSessionDocument,
    webhookPath: "/api/webhooks/transaction-initialize-session",
  });

export const logger = createLogger({
  name: "transactionInitializeSessionSyncWebhook",
});

class WebhookResponseBuilder extends SynchronousWebhookResponseBuilder<TransactionInitializeSessionResponse> {}

export default transactionInitializeSessionSyncWebhook.createHandler(
  async (req, res, { authData, ...ctx }) => {
    const responseBuilder = new WebhookResponseBuilder(res);
    logger.info({ payload: ctx.payload.action }, "called with:");

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

      const response = await appWebhookManager.transactionInitializeSession(ctx.payload);

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
