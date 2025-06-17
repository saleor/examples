import { type PaymentGatewayInitializeSessionResponse } from "@/schemas/PaymentGatewayInitializeSession/PaymentGatewayInitializeSessionResponse.mjs";
import { type PaymentGatewayInitializeSessionEventFragment } from "generated/graphql";
import { invariant } from "@/lib/invariant";
import { createLogger } from "@/lib/logger";
import { paymentAppFullyConfiguredEntrySchema } from "@/modules/payment-app-configuration/config-entry";
import { getConfigurationForChannel } from "@/modules/payment-app-configuration/payment-app-configuration";
import { getWebhookPaymentAppConfigurator } from "@/modules/payment-app-configuration/payment-app-configuration-factory";
import { getSequraApiClient } from "@/modules/sequra/sequra-api";

export const PaymentGatewayInitializeSessionWebhookHandler = async (
  event: PaymentGatewayInitializeSessionEventFragment,
  { saleorApiUrl }: { saleorApiUrl: string; baseUrl: string },
): Promise<PaymentGatewayInitializeSessionResponse> => {
  const logger = createLogger(
    {},
    { msgPrefix: "[PaymentGatewayInitializeSessionWebhookHandler] " },
  );

  const app = event.recipient;
  invariant(app, "Missing event.recipient!");
  invariant(event.data, "Missing data");

  logger.info({}, "Processing Payment Gateway Initialize request");

  const { privateMetadata } = app;

  const configurator = getWebhookPaymentAppConfigurator({ privateMetadata }, saleorApiUrl);
  const appConfig = await configurator.getConfig();
  const sequraConfig = paymentAppFullyConfiguredEntrySchema.parse(
    getConfigurationForChannel(appConfig, event.sourceObject.channel.id),
  );

  const sequraClient = getSequraApiClient({
    sequraApiUrl: sequraConfig.apiUrl,
    username: sequraConfig.username,
    password: sequraConfig.password,
    merchantRef: sequraConfig.merchantId,
  });

  const data = event.data as unknown;

  if (!data || typeof data !== "object") {
    return { data: {} };
  }

  if ("orderId" in data && typeof data.orderId === "string") {
    const orderForm = await sequraClient.getOrderForm(data.orderId);
    const paymentGatewayInitializeSessionResponse: PaymentGatewayInitializeSessionResponse = {
      data: {
        orderForm,
      },
    };
    return paymentGatewayInitializeSessionResponse;
  }

  const paymentGatewayInitializeSessionResponse: PaymentGatewayInitializeSessionResponse = {
    data: {},
  };
  return paymentGatewayInitializeSessionResponse;
};
