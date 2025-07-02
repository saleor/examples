import { createManifestHandler } from "@saleor/app-sdk/handlers/next";
import { type AppManifest } from "@saleor/app-sdk/types";

import packageJson from "../../../package.json";
import { paymentGatewayInitializeSessionSyncWebhook } from "./webhooks/payment-gateway-initialize-session";
import { transactionCancelationRequestedSyncWebhook } from "./webhooks/transaction-cancelation-requested";
import { transactionInitializeSessionSyncWebhook } from "./webhooks/transaction-initialize-session";
import { transactionRefundRequestedSyncWebhook } from "./webhooks/transaction-refund-requested";
import { transactionProcessSessionSyncWebhook } from "./webhooks/transaction-process-session";

export default createManifestHandler({
  async manifestFactory(context) {
    const manifest: AppManifest = {
      name: "Authorize.net",
      tokenTargetUrl: `${context.appBaseUrl}/api/register`,
      appUrl: `${context.appBaseUrl}/config`,
      permissions: ["HANDLE_PAYMENTS"],
      id: "saleor.app.authorize.net",
      version: packageJson.version,
      requiredSaleorVersion: ">=3.13",
      webhooks: [
        transactionInitializeSessionSyncWebhook.getWebhookManifest(context.appBaseUrl),
        transactionProcessSessionSyncWebhook.getWebhookManifest(context.appBaseUrl),
        transactionCancelationRequestedSyncWebhook.getWebhookManifest(context.appBaseUrl),
        transactionRefundRequestedSyncWebhook.getWebhookManifest(context.appBaseUrl),
        paymentGatewayInitializeSessionSyncWebhook.getWebhookManifest(context.appBaseUrl),
      ],
      extensions: [
        /**
         * Optionally, extend Dashboard with custom UIs
         * https://docs.saleor.io/docs/3.x/developer/extending/apps/extending-dashboard-with-apps
         */
      ],
    };

    return manifest;
  },
});
