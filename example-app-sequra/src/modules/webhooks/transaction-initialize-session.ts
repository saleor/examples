import { env } from "@/lib/env.mjs";
import { invariant } from "@/lib/invariant";
import { createLogger } from "@/lib/logger";
import { paymentAppFullyConfiguredEntrySchema } from "@/modules/payment-app-configuration/config-entry";
import { getConfigurationForChannel } from "@/modules/payment-app-configuration/payment-app-configuration";
import { getWebhookPaymentAppConfigurator } from "@/modules/payment-app-configuration/payment-app-configuration-factory";
import { getSequraApiClient } from "@/modules/sequra/sequra-api";
import { buildSequraCreateOrderPayload } from "@/modules/sequra/sequra-payloads";
import ValidateTransactionInitializeSessionRequestData from "@/schemas/TransactionInitializeSession/TransactionInitializeSessionRequestData.mjs";
import { type TransactionInitializeSessionResponse } from "@/schemas/TransactionInitializeSession/TransactionInitializeSessionResponse.mjs";
import {
  TransactionFlowStrategyEnum,
  type TransactionInitializeSessionEventFragment,
} from "generated/graphql";

export const TransactionInitializeSessionWebhookHandler = async (
  event: TransactionInitializeSessionEventFragment,
  { saleorApiUrl, baseUrl }: { saleorApiUrl: string; baseUrl: string },
): Promise<TransactionInitializeSessionResponse> => {
  const appBaseUrl = env.APP_API_BASE_URL ?? baseUrl;

  const logger = createLogger(
    { saleorApiUrl },
    { msgPrefix: "[TransactionInitializeSessionWebhookHandler] " },
  );
  const { transaction, action, sourceObject, merchantReference, issuingPrincipal } = event;
  const { id, __typename, channel } = sourceObject;
  const logData = {
    transaction,
    action,
    sourceObject: { id, channel, __typename },
    merchantReference,
    issuingPrincipal,
  };
  logger.debug(logData, "Received event");

  const app = event.recipient;
  invariant(app, "Missing event.recipient!");

  const { privateMetadata } = app;

  const configurator = getWebhookPaymentAppConfigurator({ privateMetadata }, saleorApiUrl);
  const appConfig = await configurator.getConfig();
  const sequraConfig = paymentAppFullyConfiguredEntrySchema.parse(
    getConfigurationForChannel(appConfig, event.sourceObject.channel.id),
  );

  invariant(event.data, "Missing data");
  const isDataValid = ValidateTransactionInitializeSessionRequestData(event.data);

  if (!isDataValid) {
    logger.error(ValidateTransactionInitializeSessionRequestData.errors, "Invalid data");
    throw new Error("Invalid data provided");
  }
  const returnUrl = event.data.returnUrl;

  const sequraClient = getSequraApiClient({
    sequraApiUrl: sequraConfig.apiUrl,
    username: sequraConfig.username,
    password: sequraConfig.password,
    merchantRef: sequraConfig.merchantId,
  });

  const createSequraOrderPayload = buildSequraCreateOrderPayload({
    sourceObject,
    returnUrl,
    appBaseUrl,
    saleorApiUrl,
    merchantId: sequraConfig.merchantId,
    transactionId: event.transaction.id,
    currency: event.action.currency,
    amount: event.action.amount,
    customerIpAddress: event.customerIpAddress ?? "",
    meta: {
      saleorVersion: event.version,
    },
  });

  logger.debug({ ...createSequraOrderPayload }, "createSequraSession payload");

  const sequraOrderUrl = await sequraClient.createOrder(createSequraOrderPayload);
  logger.debug({ sequraOrderUrl }, "createOrder result");
  const sequraOrderId = sequraClient.getOrderUuidFromUrl(sequraOrderUrl);

  const transactionInitializeSessionResponse: TransactionInitializeSessionResponse = {
    data: {
      sequraOrderUrl,
      sequraOrderId,
    },
    pspReference: sequraOrderId,
    result:
      event.action.actionType === TransactionFlowStrategyEnum.Authorization
        ? "AUTHORIZATION_ACTION_REQUIRED"
        : "CHARGE_ACTION_REQUIRED",
    actions: ["REFUND"],
    amount: action.amount,
    message: "",
    externalUrl: undefined, // @todo,
  };
  return transactionInitializeSessionResponse;
};
