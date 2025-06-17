import { createManifestHandler } from "@saleor/app-sdk/handlers/next";
import { type AppManifest } from "@saleor/app-sdk/types";

import packageJson from "../../../package.json";
import { paymentGatewayInitializeSessionSyncWebhook } from "./webhooks/saleor/payment-gateway-initialize-session";
import { transactionInitializeSessionSyncWebhook } from "./webhooks/saleor/transaction-initialize-session";
import { env } from "@/lib/env.mjs";
import { transactionRefundRequestedSyncWebhook } from "@/pages/api/webhooks/saleor/transaction-refund-requested";
import { orderFulfilledAsyncWebhook } from "@/pages/api/webhooks/saleor/order-fulfilled";

export default createManifestHandler({
  async manifestFactory({ appBaseUrl }) {
    const iframeBaseUrl = env.APP_IFRAME_BASE_URL || appBaseUrl;
    const apiBaseURL = env.APP_API_BASE_URL || appBaseUrl;

    const manifest: AppManifest = {
      id: "app.saleor.sequra",
      name: "Example Sequra App",
      about: packageJson.description,
      tokenTargetUrl: `${apiBaseURL}/api/register`,
      appUrl: iframeBaseUrl,
      permissions: ["HANDLE_PAYMENTS", "MANAGE_CHECKOUTS", "MANAGE_ORDERS"],
      version: packageJson.version,
      requiredSaleorVersion: `>=${packageJson.saleor.schemaVersion}.0`,
      homepageUrl: "https://docs.saleor.io/docs/3.x/developer/app-store/apps/sequra",
      supportUrl: "https://github.com/saleor/saleor-app-payment-sequra/issues",
      brand: {
        logo: {
          default: `${apiBaseURL}/logo.png`,
        },
      },
      webhooks: [
        paymentGatewayInitializeSessionSyncWebhook.getWebhookManifest(apiBaseURL),
        transactionInitializeSessionSyncWebhook.getWebhookManifest(apiBaseURL),
        transactionRefundRequestedSyncWebhook.getWebhookManifest(apiBaseURL),
        orderFulfilledAsyncWebhook.getWebhookManifest(apiBaseURL),
      ],
      extensions: [],
    };

    return manifest;
  },
});
