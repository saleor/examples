import { type TransactionProcessSessionResponse } from "@/schemas/TransactionProcessSession/TransactionProcessSessionResponse.mjs";
import { invariant } from "@/lib/invariant";
import { type JSONObject } from "@/types";
import { createLogger } from "@/lib/logger";
import { obfuscateConfig } from "@/modules/app-configuration/utils";
import { getConfigurationForChannel } from "@/modules/payment-app-configuration/payment-app-configuration";
import {
  TransactionFlowStrategyEnum,
  type TransactionProcessSessionEventFragment,
} from "generated/graphql";
import {
  type KlarnaMetadata,
  createMerchantConfirmationUrl,
  getKlarnaApiClient,
  getLineItems,
  prepareRequestAddress,
} from "@/modules/klarna/klarna-api";
import { paymentAppFullyConfiguredEntrySchema } from "@/modules/payment-app-configuration/config-entry";
import { getWebhookPaymentAppConfigurator } from "@/modules/payment-app-configuration/payment-app-configuration-factory";
import { type components } from "generated/klarna-payments";
import { KlarnaHttpClientError } from "@/errors";
import { getKlarnaIntegerAmountFromSaleor } from "@/modules/klarna/currencies";

export const TransactionProcessSessionWebhookHandler = async (
  event: TransactionProcessSessionEventFragment,
  { saleorApiUrl }: { saleorApiUrl: string },
): Promise<TransactionProcessSessionResponse> => {
  const logger = createLogger({}, { msgPrefix: "[TransactionProcessSessionWebhookHandler] " });
  const { transaction, action, sourceObject, merchantReference } = event;
  const { id, __typename, channel } = sourceObject;
  const logData = {
    transaction,
    action,
    sourceObject: { id, channel, __typename },
    merchantReference,
  };
  logger.debug(logData, "Received event");

  const app = event.recipient;
  invariant(app, "Missing event.recipient!");
  invariant(event.data, "Missing data");
  invariant(typeof event.data === "object", "Missing data");

  const authorizationToken =
    "authorizationToken" in event.data ? event.data.authorizationToken : undefined;
  invariant(typeof authorizationToken === "string", "Missing authorizationToken");
  const confirmationUrl = "confirmationUrl" in event.data ? event.data.confirmationUrl : undefined;

  const { privateMetadata } = app;
  const configurator = getWebhookPaymentAppConfigurator({ privateMetadata }, saleorApiUrl);
  const appConfig = await configurator.getConfig();
  const klarnaConfig = paymentAppFullyConfiguredEntrySchema.parse(
    getConfigurationForChannel(appConfig, event.sourceObject.channel.id),
  );

  const klarnaClient = getKlarnaApiClient({
    klarnaApiUrl: klarnaConfig.apiUrl,
    username: klarnaConfig.username,
    password: klarnaConfig.password,
  });

  const createKlarnaOrder = klarnaClient
    .path("/payments/v1/authorizations/{authorizationToken}/order")
    .method("post")
    .create();

  const country = event.sourceObject.billingAddress?.country.code;
  invariant(country, "Missing country code");

  const email = event.sourceObject.userEmail;
  invariant(email, "Missing email");

  const merchantConfirmationUrl =
    typeof confirmationUrl === "string"
      ? createMerchantConfirmationUrl(confirmationUrl, event.transaction.id)
      : undefined;

  const transactionId = event.transaction.id;
  const channelId = event.sourceObject.channel.id;

  const metadata: KlarnaMetadata = {
    transactionId,
    channelId,
    ...(event.sourceObject.__typename === "Checkout" && { checkoutId: event.sourceObject.id }),
    ...(event.sourceObject.__typename === "Order" && { orderId: event.sourceObject.id }),
  };

  const isFullCapture = event.action.amount === event.sourceObject.total.gross.amount;
  if (!isFullCapture) {
    throw new Error("Partial capture is not supported");
  }

  const createKlarnaOrderPayload: components["schemas"]["create_order_request"] = {
    purchase_country: country,
    purchase_currency: event.action.currency,
    billing_address: prepareRequestAddress(event.sourceObject.billingAddress, email),
    shipping_address: prepareRequestAddress(event.sourceObject.shippingAddress, email),
    order_amount: getKlarnaIntegerAmountFromSaleor(
      event.sourceObject.total.gross.amount,
      event.sourceObject.total.gross.currency,
    ),
    order_tax_amount: getKlarnaIntegerAmountFromSaleor(event.sourceObject.total.tax.amount),
    order_lines: getLineItems(event.sourceObject),
    merchant_urls: {
      confirmation: merchantConfirmationUrl,
      // @todo
      // notification: "https://example.com/pending",
    },
    ...(event.action.actionType === TransactionFlowStrategyEnum.Charge && { auto_capture: true }),
    merchant_reference1: event.sourceObject.id,
    merchant_reference2: event.transaction.id,
    merchant_data: JSON.stringify(metadata),
  };
  logger.debug({ ...obfuscateConfig(createKlarnaOrderPayload) }, "createKlarnaOrder payload");

  const klarnaOrder = await createKlarnaOrder({
    ...createKlarnaOrderPayload,
    authorizationToken,
  });
  logger.debug({ ...obfuscateConfig(klarnaOrder) }, "createKlarnaOrder result");

  if (!klarnaOrder.ok) {
    throw new KlarnaHttpClientError(klarnaOrder.statusText, { errors: [klarnaOrder.data] });
  }

  const flow =
    event.action.actionType === TransactionFlowStrategyEnum.Charge ? "CHARGE" : "AUTHORIZATION";
  const status = klarnaOrder.data.fraud_status === "ACCEPTED" ? "SUCCESS" : "REQUEST";

  const transactionProcessSessionResponse: TransactionProcessSessionResponse = {
    data: {
      klarnaOrderResponse: klarnaOrder.data as JSONObject,
    },
    pspReference: klarnaOrder.data.order_id,
    result: `${flow}_${status}`,
    actions: [], // @todo
    amount: action.amount,
    message: klarnaOrder.data.fraud_status,
    externalUrl: undefined, // @todo
  };
  return transactionProcessSessionResponse;
};
