import { print } from "graphql";
import { uuidv7 } from "uuidv7";
import { invariant } from "@/lib/invariant";
import { createLogger } from "@/lib/logger";
import {
  getEnvironmentFromUrl,
  getKlarnaApiClient,
  getLineItems,
} from "@/modules/klarna/klarna-api";
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
import { getKlarnaIntegerAmountFromSaleor } from "@/modules/klarna/currencies";

export const TransactionRefundRequestedWebhookHandler = async (
  event: TransactionRefundRequestedEventFragment,
  { saleorApiUrl }: { saleorApiUrl: string; baseUrl: string },
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
  invariant(transaction.sourceObject, "Missing event.transaction.sourceObject!");

  const { privateMetadata } = app;

  const configurator = getWebhookPaymentAppConfigurator({ privateMetadata }, saleorApiUrl);
  const appConfig = await configurator.getConfig();
  const klarnaConfig = paymentAppFullyConfiguredEntrySchema.parse(
    getConfigurationForChannel(appConfig, transaction.sourceObject.channel.id),
  );

  const authData = await saleorApp.apl.get(saleorApiUrl);
  if (!authData) {
    logger.error(
      {
        transactionId: transaction.id,
        channelId: transaction.sourceObject.channel.id,
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
        channelId: transaction.sourceObject.channel.id,
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
        channelId: transaction.sourceObject.channel.id,
        saleorApiUrl,
      },
      "More than one charge success event found",
    );
    throw new Error("More than one charge success event found");
  }
  const chargeSuccessEvent = chargeSuccessEvents[0]!;

  const klarnaClient = getKlarnaApiClient({
    klarnaApiUrl: klarnaConfig.apiUrl,
    username: klarnaConfig.username,
    password: klarnaConfig.password,
  });

  const refundOrder = klarnaClient
    .path("/ordermanagement/v1/orders/{order_id}/refunds")
    .method("post")
    .create();

  const refundAmount =
    event.grantedRefund?.amount.amount ?? event.action.amount ?? transaction.chargedAmount.amount;
  const refundCurrency = event.grantedRefund?.amount.currency ?? transaction.chargedAmount.currency;
  const allRefundReasons = [
    event.grantedRefund?.reason,
    ...(event.grantedRefund?.lines?.map((l) => l.reason) ?? []),
  ].filter(Boolean);
  const lineItems = event.grantedRefund
    ? getLineItems({
        deliveryMethod: event.grantedRefund.shippingCostsIncluded
          ? transaction.sourceObject.deliveryMethod
          : undefined,
        shippingPrice: event.transaction?.sourceObject?.shippingPrice,
        lines: event.grantedRefund.lines?.map((l) => l.orderLine) ?? [],
      })
    : undefined;

  const klarnaRefundResponse = await refundOrder({
    order_id: chargeSuccessEvent.pspReference,
    refunded_amount: getKlarnaIntegerAmountFromSaleor(refundAmount, refundCurrency),
    description: allRefundReasons.join("\n") ?? undefined,
    order_lines: lineItems,
    reference: event.grantedRefund?.id ?? event.transaction?.sourceObject?.id,
  });

  const klarnaMerchantId = klarnaConfig.username.split("_")[0];
  const klarnaEnv = getEnvironmentFromUrl(klarnaConfig.apiUrl);

  const klarnaDashboardHost =
    klarnaEnv === "playground"
      ? "https://portal.playground.klarna.com"
      : "https://portal.klarna.com";
  const externalUrl =
    klarnaDashboardHost +
    `/orders/all/merchants/${klarnaMerchantId}/orders/${chargeSuccessEvent.pspReference}`;

  const transactionRefundRequestedResponse: TransactionRefundRequestedResponse = {
    pspReference: klarnaRefundResponse.headers.get("Refund-Id") ?? uuidv7(),
    result: "REFUND_SUCCESS",
    amount: refundAmount,
    externalUrl,
  };
  return transactionRefundRequestedResponse;
};
