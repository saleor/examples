import { SaleorSyncWebhook } from "@saleor/app-sdk/handlers/next";
import { createLogger } from "@/lib/logger";
import { SynchronousWebhookResponseBuilder } from "@/lib/webhook-response-builder";

import { getAuthorizeConfig } from "@/modules/authorize-net/authorize-net-config";
import { AuthorizeWebhookManager } from "@/modules/authorize-net/webhook/authorize-net-webhook-manager";
import { createAppWebhookManager } from "@/modules/webhooks/webhook-manager-service";
import { errorUtils } from "@/error-utils";
import { saleorApp } from "@/saleor-app";
import { type TransactionRefundRequestedResponse } from "@/schemas/TransactionRefundRequested/TransactionRefundRequestedResponse.mjs";
import {
  UntypedTransactionRefundRequestedDocument,
  type TransactionRefundRequestedEventFragment,
} from "generated/graphql";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const transactionRefundRequestedSyncWebhook =
  new SaleorSyncWebhook<TransactionRefundRequestedEventFragment>({
    name: "TransactionRefundRequested",
    apl: saleorApp.apl,
    event: "TRANSACTION_REFUND_REQUESTED",
    query: UntypedTransactionRefundRequestedDocument,
    webhookPath: "/api/webhooks/transaction-refund-requested",
  });

const logger = createLogger({
  name: "transactionRefundRequestedSyncWebhook",
});

class WebhookResponseBuilder extends SynchronousWebhookResponseBuilder<TransactionRefundRequestedResponse> {}

/**
    @description This handler is called when a Saleor transaction is canceled. It changes the status of the transaction in Authorize to "void".
 */
export default transactionRefundRequestedSyncWebhook.createHandler(
  async (req, res, { authData, ...ctx }) => {
    const responseBuilder = new WebhookResponseBuilder(res);
    logger.debug({ payload: ctx.payload }, "handler called");

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

      const response = await appWebhookManager.transactionRefundRequested(ctx.payload);
      // eslint-disable-next-line @saleor/saleor-app/logger-leak
      logger.info({ response }, "Responding with:");
      return responseBuilder.ok(response);
    } catch (error) {
      const normalizedError = errorUtils.normalize(error);
      errorUtils.capture(normalizedError);
      logger.error(normalizedError);

      return responseBuilder.ok({
        result: "REFUND_FAILURE",
        pspReference: "", // todo: add
        message: normalizedError.message,
      });
    }
  },
);
