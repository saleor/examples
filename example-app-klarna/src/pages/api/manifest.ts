import { createManifestHandler } from "@saleor/app-sdk/handlers/next";
import { type AppManifest } from "@saleor/app-sdk/types";

import packageJson from "../../../package.json";
import { paymentGatewayInitializeSessionSyncWebhook } from "./webhooks/saleor/payment-gateway-initialize-session";
import { transactionInitializeSessionSyncWebhook } from "./webhooks/saleor/transaction-initialize-session";
import { transactionProcessSessionSyncWebhook } from "./webhooks/saleor/transaction-process-session";
import { env } from "@/lib/env.mjs";
import { transactionRefundRequestedSyncWebhook } from "@/pages/api/webhooks/saleor/transaction-refund-requested";

export default createManifestHandler({
  async manifestFactory({ appBaseUrl }) {
    const iframeBaseUrl = env.APP_IFRAME_BASE_URL || appBaseUrl;
    const apiBaseURL = env.APP_API_BASE_URL || appBaseUrl;

    const manifest: AppManifest = {
      id: "app.saleor.klarna",
      name: "Klarna",
      about: packageJson.description,
      tokenTargetUrl: `${apiBaseURL}/api/register`,
      appUrl: iframeBaseUrl,
      permissions: ["HANDLE_PAYMENTS"],
      version: packageJson.version,
      requiredSaleorVersion: ">=3.15.0",
      homepageUrl: "https://docs.saleor.io/docs/3.x/developer/app-store/apps/klarna",
      supportUrl: "https://github.com/saleor/saleor-app-payment-klarna/issues",
      brand: {
        logo: {
          default: `${apiBaseURL}/logo.png`,
        },
      },
      webhooks: [
        paymentGatewayInitializeSessionSyncWebhook.getWebhookManifest(apiBaseURL),
        transactionInitializeSessionSyncWebhook.getWebhookManifest(apiBaseURL),
        transactionProcessSessionSyncWebhook.getWebhookManifest(apiBaseURL),
        transactionRefundRequestedSyncWebhook.getWebhookManifest(apiBaseURL),
      ],
      extensions: [],
    };

    return manifest;
  },
});
