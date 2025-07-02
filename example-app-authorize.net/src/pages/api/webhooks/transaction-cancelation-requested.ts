import { SaleorSyncWebhook } from "@saleor/app-sdk/handlers/next";

import { createLogger } from "@/lib/logger";
import { SynchronousWebhookResponseBuilder } from "@/lib/webhook-response-builder";

import { AuthorizeWebhookManager } from "@/modules/authorize-net/webhook/authorize-net-webhook-manager";

import { getAuthorizeConfig } from "@/modules/authorize-net/authorize-net-config";
import { createAppWebhookManager } from "@/modules/webhooks/webhook-manager-service";
import { saleorApp } from "@/saleor-app";
import { type TransactionCancelationRequestedResponse } from "@/schemas/TransactionCancelationRequested/TransactionCancelationRequestedResponse.mjs";
import {
  UntypedTransactionCancelationRequestedDocument,
  type TransactionCancelationRequestedEventFragment,
} from "generated/graphql";
import { errorUtils } from "@/error-utils";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const transactionCancelationRequestedSyncWebhook =
  new SaleorSyncWebhook<TransactionCancelationRequestedEventFragment>({
    name: "TransactionCancelationRequested",
    apl: saleorApp.apl,
    event: "TRANSACTION_CANCELATION_REQUESTED",
    query: UntypedTransactionCancelationRequestedDocument,
    webhookPath: "/api/webhooks/transaction-cancelation-requested",
  });

const logger = createLogger({
  name: "transactionCancelationRequestedSyncWebhook",
});

class WebhookResponseBuilder extends SynchronousWebhookResponseBuilder<TransactionCancelationRequestedResponse> {}

/**
    @description This handler is called when a Saleor transaction is canceled. It changes the status of the transaction in Authorize to "void".
 */
export default transactionCancelationRequestedSyncWebhook.createHandler(
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

      const response = await appWebhookManager.transactionCancelationRequested(ctx.payload);
      // eslint-disable-next-line @saleor/saleor-app/logger-leak
      logger.info({ response }, "Responding with:");
      return responseBuilder.ok(response);
    } catch (error) {
      const normalizedError = errorUtils.normalize(error);
      errorUtils.capture(normalizedError);
      logger.error(normalizedError);

      return responseBuilder.ok({
        result: "CANCEL_FAILURE",
        pspReference: "", // todo: add
        message: normalizedError.message,
      });
    }
  },
);
