import { print } from "graphql";
import { uuidv7 } from "uuidv7";
import { invariant } from "@/lib/invariant";
import { createLogger } from "@/lib/logger";

import { paymentAppFullyConfiguredEntrySchema } from "@/modules/payment-app-configuration/config-entry";
import { getConfigurationForChannel } from "@/modules/payment-app-configuration/payment-app-configuration";
import { getWebhookPaymentAppConfigurator } from "@/modules/payment-app-configuration/payment-app-configuration-factory";
import { type TransactionRefundRequestedResponse } from "@/schemas/TransactionRefundRequesed/TransactionRefundRequestedResponse.mjs";
import {
  GetTransactionByIdDocument,
  type GetTransactionByIdQuery,
  type GetTransactionByIdQueryVariables,
  TransactionActionEnum,
  type TransactionRefundRequestedEventFragment,
  TransactionEventTypeEnum,
} from "generated/graphql";
import { createServerClient } from "@/lib/create-graphq-client";
import { saleorApp } from "@/saleor-app";
import { getSequraApiClient } from "@/modules/sequra/sequra-api";
import { env } from "@/lib/env.mjs";
import { buildSequraCreateOrderPayload } from "@/modules/sequra/sequra-payloads";
import type { OrderUpdateRequest } from "@/schemas/Sequra/OrderUpdateRequest.mjs";

export const TransactionRefundRequestedWebhookHandler = async (
  event: TransactionRefundRequestedEventFragment,
  { saleorApiUrl, baseUrl }: { saleorApiUrl: string; baseUrl: string },
): Promise<TransactionRefundRequestedResponse> => {
  const { recipient: app, action, transaction } = event ?? {};
  const logger = createLogger({}, { msgPrefix: "[TransactionRefundRequestedWebhookHandler] " });
  logger.info("Processing refund request", { action: action, transaction });

  invariant(app, "Missing event.recipient!");
  invariant(
    event.action.actionType === TransactionActionEnum.Refund,
    `Incorrect action.actionType: ${event.action.actionType}`,
  );
  invariant(transaction, "Missing transaction in event body!");
  invariant(transaction.pspReference, "Missing event.transaction.pspReference!");

  const sourceObject = transaction.checkout ?? transaction.order;
  invariant(sourceObject, "Missing event.checkout and event.order!");

  const checkoutId =
    sourceObject.__typename === "Checkout" ? sourceObject.id : sourceObject.checkoutId;
  console.log({ sourceObject: sourceObject, checkoutId });
  invariant(checkoutId, "Missing checkoutId in sourceObject");

  const { privateMetadata } = app;

  const configurator = getWebhookPaymentAppConfigurator({ privateMetadata }, saleorApiUrl);
  const appConfig = await configurator.getConfig();
  const sequraConfig = paymentAppFullyConfiguredEntrySchema.parse(
    getConfigurationForChannel(appConfig, sourceObject.channel.id),
  );

  const authData = await saleorApp.apl.get(saleorApiUrl);
  if (!authData) {
    logger.error(
      {
        transactionId: transaction.id,
        channelId: sourceObject.channel.id,
        saleorApiUrl,
      },
      "Unauthorized",
    );
    throw new Error("Unauthorized");
  }

  const client = createServerClient(authData.saleorApiUrl, authData.token);
  const transactionWithDetails = await client
    .query<GetTransactionByIdQuery, GetTransactionByIdQueryVariables>(
      print(GetTransactionByIdDocument),
      { transactionId: transaction.id },
    )
    .toPromise();

  const chargeSuccessEvents = transactionWithDetails.data?.transaction?.events.filter(
    (e) => e.type === TransactionEventTypeEnum.ChargeSuccess,
  );

  if (!chargeSuccessEvents?.length) {
    logger.error(
      {
        transactionId: transaction.id,
        channelId: sourceObject.channel.id,
        saleorApiUrl,
      },
      "No charge success event found",
    );
    throw new Error("No charge success event found");
  }
  if (chargeSuccessEvents.length !== 1) {
    logger.error(
      {
        transactionId: transaction.id,
        channelId: sourceObject.channel.id,
        saleorApiUrl,
      },
      "More than one charge success event found",
    );
    throw new Error("More than one charge success event found");
  }

  const refundAmount =
    event.grantedRefund?.amount.amount ?? event.action.amount ?? transaction.chargedAmount.amount;
  const refundCurrency = event.grantedRefund?.amount.currency ?? transaction.chargedAmount.currency;

  const sequraClient = getSequraApiClient({
    sequraApiUrl: sequraConfig.apiUrl,
    username: sequraConfig.username,
    password: sequraConfig.password,
    merchantRef: sequraConfig.merchantId,
  });

  const appBaseUrl = env.APP_API_BASE_URL ?? baseUrl;
  const { order } = buildSequraCreateOrderPayload({
    sourceObject: sourceObject,
    // returnUrl is the url to which the customer will be redirected after completing the payment
    // in this case, we don't need to redirect the customer anywhere because it's the refund flow
    // so we can leave it empty
    returnUrl: "",
    appBaseUrl,
    saleorApiUrl,
    merchantId: sequraConfig.merchantId,
    transactionId: transaction.id,
    currency: refundCurrency,
    amount: refundAmount,

    // customerIpAddress is used when creating the payment flow
    // not used in the refund flow
    customerIpAddress: "",
    meta: {
      saleorVersion: event.version,
    },
  });

  const payload: OrderUpdateRequest = {
    order: {
      merchant: {
        id: order.merchant.id,
      },
      platform: order.platform,
      merchant_reference: {
        order_ref_1: checkoutId,
        order_ref_2: transaction.id,
      },
      cancellation_reason: "customer_cancel",
      customer: order.customer,
      delivery_address: order.delivery_address,
      delivery_method: order.delivery_method,
      invoice_address: order.invoice_address,
      trackings: [],

      // empty `unshipped cart` and `shipped cart` mean that we are refunding the whole order
      unshipped_cart: {
        currency: refundCurrency,
        order_total_with_tax: 0,
        items: [],
      },
      shipped_cart: {
        currency: refundCurrency,
        order_total_with_tax: 0,
        items: [],
      },
    },
  };

  await sequraClient.refundOrder({
    orderRef: checkoutId,
    payload,
    cancellationReason: "customer_cancel",
  });

  console.log({ refundAmount });

  const transactionRefundRequestedResponse: TransactionRefundRequestedResponse = {
    pspReference: uuidv7(),
    result: "REFUND_SUCCESS",
    amount: refundAmount,
    externalUrl: undefined,
  };
  return transactionRefundRequestedResponse;
};
