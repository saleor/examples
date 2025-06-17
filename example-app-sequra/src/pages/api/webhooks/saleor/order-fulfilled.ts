import { SaleorAsyncWebhook } from "@saleor/app-sdk/handlers/next";
import { type PageConfig } from "next";
import { type OrderFulfilledEventFragment, UntypedOrderFulfilledDocument } from "generated/graphql";
import { saleorApp } from "@/saleor-app";
import { createLogger } from "@/lib/logger";
import { paymentAppFullyConfiguredEntrySchema } from "@/modules/payment-app-configuration/config-entry";
import { getConfigurationForChannel } from "@/modules/payment-app-configuration/payment-app-configuration";
import { getWebhookPaymentAppConfigurator } from "@/modules/payment-app-configuration/payment-app-configuration-factory";
import { getSequraApiClient } from "@/modules/sequra/sequra-api";
import { env } from "@/lib/env.mjs";
import { buildSequraCreateOrderPayload } from "@/modules/sequra/sequra-payloads";
import { type OrderUpdateRequest } from "@/schemas/Sequra/OrderUpdateRequest.mjs";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export const orderFulfilledAsyncWebhook = new SaleorAsyncWebhook<OrderFulfilledEventFragment>({
  name: "OrderFulfilled",
  apl: saleorApp.apl,
  event: "ORDER_FULFILLED",
  query: UntypedOrderFulfilledDocument,
  webhookPath: "/api/webhooks/saleor/order-fulfilled",
});

export default orderFulfilledAsyncWebhook.createHandler(async (req, res, ctx) => {
  const logger = createLogger({}, { msgPrefix: "[orderFulfilledAsyncWebhook] " });
  logger.info("Processing order fulfilled");
  const { recipient: app } = ctx.payload;

  if (!app) {
    return res.status(400).json("Invalid event: missing recipient");
  }
  if (!ctx.payload || !ctx.payload.order) {
    return res.status(400).json("Invalid event: missing order");
  }
  const sourceObject = ctx.payload.order;

  if (!sourceObject.checkoutId) {
    return res.status(400).json("Invalid event: missing checkoutId");
  }

  const { privateMetadata } = app;
  const configurator = getWebhookPaymentAppConfigurator(
    { privateMetadata },
    ctx.authData.saleorApiUrl,
  );
  const appConfig = await configurator.getConfig();
  const sequraConfig = paymentAppFullyConfiguredEntrySchema.parse(
    getConfigurationForChannel(appConfig, sourceObject.channel.id),
  );

  const authData = await saleorApp.apl.get(ctx.authData.saleorApiUrl);
  if (!authData) {
    logger.error(
      {
        channelId: sourceObject.channel.id,
        saleorApiUrl: ctx.authData.saleorApiUrl,
      },
      "Unauthorized",
    );
    return res.status(401).json("Unauthorized");
  }

  const sequraClient = getSequraApiClient({
    sequraApiUrl: sequraConfig.apiUrl,
    username: sequraConfig.username,
    password: sequraConfig.password,
    merchantRef: sequraConfig.merchantId,
  });
  const appBaseUrl = env.APP_API_BASE_URL;

  const { order } = buildSequraCreateOrderPayload({
    sourceObject,

    // returnUrl is the url to which the customer will be redirected after completing the payment
    // in this case, we don't need to redirect the customer anywhere because it's the async webhook
    // so we can leave it empty
    returnUrl: "",

    appBaseUrl,
    saleorApiUrl: authData.saleorApiUrl,
    merchantId: sequraConfig.merchantId,

    // We set it when creating SeQura order – it's used as `order_ref_2`
    // Here we can leave it empty. It doesn't override what's already saved in SeQura.
    transactionId: "",

    currency: sourceObject.total.gross.currency,
    amount: sourceObject.total.gross.amount,

    // customerIpAddress is used when creating the payment flow
    // not used in the async webhook
    customerIpAddress: "",
    meta: {
      saleorVersion: ctx.payload.version,
    },
  });

  const payload: OrderUpdateRequest = {
    order: {
      merchant: {
        id: order.merchant.id,
      },
      platform: order.platform,
      merchant_reference: {
        order_ref_1: sourceObject.checkoutId,
        order_ref_2: "",
      },
      customer: order.customer,
      delivery_address: order.delivery_address,
      delivery_method: order.delivery_method,
      invoice_address: order.invoice_address,
      trackings: [],

      // empty `unshipped cart` and full `shipped cart` mean the whole order is being fulfilled
      unshipped_cart: {
        currency: sourceObject.total.gross.currency,
        order_total_with_tax: 0,
        items: [],
      },
      shipped_cart: order.cart,
    },
  };

  await sequraClient.fulfillOrder({
    orderRef: sourceObject.checkoutId,
    payload,
  });

  return res.status(200).json("OK");
});
