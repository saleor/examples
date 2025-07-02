import { type NextApiRequest, type NextApiResponse } from "next";
import { print } from "graphql";
import { type components } from "generated/klarna-payments";
import { saleorApp } from "@/saleor-app";
import { createServerClient } from "@/lib/create-graphq-client";
import { getPaymentAppConfigurator } from "@/modules/payment-app-configuration/payment-app-configuration-factory";
import { paymentAppFullyConfiguredEntrySchema } from "@/modules/payment-app-configuration/config-entry";
import { getConfigurationForChannel } from "@/modules/payment-app-configuration/payment-app-configuration";
import {
  type KlarnaMetadata,
  getKlarnaApiClient,
  getLineItems,
  prepareRequestAddress,
  getEnvironmentFromUrl,
} from "@/modules/klarna/klarna-api";
import { createLogger } from "@/lib/logger";
import { KlarnaHttpClientError } from "@/errors";
import { invariant } from "@/lib/invariant";
import { obfuscateConfig } from "@/modules/app-configuration/utils";
import { getKlarnaIntegerAmountFromSaleor } from "@/modules/klarna/currencies";
import {
  GetTransactionByIdDocument,
  type GetTransactionByIdQuery,
  type GetTransactionByIdQueryVariables,
  TransactionEventReportDocument,
  TransactionEventTypeEnum,
  TransactionActionEnum,
} from "generated/graphql";

export default async function KlarnaAuthorizationWebhookHandler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const logger = createLogger({}, { msgPrefix: "[KlarnaAuthorizationWebhookHandler] " });
  const { transactionId, channelId, saleorApiUrl } = req.query;
  logger.debug({ transactionId, channelId, saleorApiUrl }, "Received event");

  if (
    typeof transactionId !== "string" ||
    typeof channelId !== "string" ||
    typeof saleorApiUrl !== "string"
  ) {
    logger.error({ transactionId, channelId, saleorApiUrl }, "Missing query params");
    return res.status(400).json("[BAD REQUEST]");
  }
  if (typeof req.body !== "object" || req.body === null) {
    logger.error({ transactionId, channelId, saleorApiUrl }, "Incorrect body");
    return res.status(400).json("[BAD REQUEST]");
  }

  const { authorization_token: authorizationToken, session_id: sessionId } = req.body as {
    authorization_token?: unknown;
    session_id?: unknown;
  };

  if (typeof authorizationToken !== "string" || typeof sessionId !== "string") {
    logger.error({ transactionId, channelId, saleorApiUrl }, "Invalid data");
    return res.status(400).json("[BAD REQUEST]");
  }

  const authData = await saleorApp.apl.get(saleorApiUrl);

  if (!authData) {
    logger.error({ transactionId, channelId, saleorApiUrl }, "Unauthorized");
    return res.status(401).json("[UNAUTHORIZED]");
  }

  const client = createServerClient(authData.saleorApiUrl, authData.token);
  const transaction = await client
    .query<GetTransactionByIdQuery, GetTransactionByIdQueryVariables>(
      print(GetTransactionByIdDocument),
      { transactionId },
    )
    .toPromise();

  const configurator = getPaymentAppConfigurator(client, saleorApiUrl);
  const appConfig = await configurator.getConfig();
  const klarnaConfig = paymentAppFullyConfiguredEntrySchema.parse(
    getConfigurationForChannel(appConfig, channelId),
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

  const sourceObject =
    transaction.data?.transaction?.checkout ?? transaction.data?.transaction?.order;

  if (!sourceObject) {
    logger.debug(transaction.data);
    logger.error({ transactionId, channelId, saleorApiUrl }, "Not found");
    return res.status(404).json("[NOT FOUND]");
  }

  const country = sourceObject.billingAddress?.country.code;
  invariant(country, "Missing country code");

  const email = sourceObject.userEmail;
  invariant(email, "Missing email");

  const metadata: KlarnaMetadata = {
    transactionId,
    channelId,
    ...(sourceObject.__typename === "Checkout" && { checkoutId: sourceObject.id }),
    ...(sourceObject.__typename === "Order" && { orderId: sourceObject.id }),
  };

  const createKlarnaOrderPayload: components["schemas"]["create_order_request"] = {
    purchase_country: country,
    purchase_currency: sourceObject.total.gross.currency,
    billing_address: prepareRequestAddress(sourceObject.billingAddress, email),
    shipping_address: prepareRequestAddress(sourceObject.shippingAddress, email),
    order_amount: getKlarnaIntegerAmountFromSaleor(
      sourceObject.total.gross.amount,
      sourceObject.total.gross.currency,
    ),
    order_tax_amount: getKlarnaIntegerAmountFromSaleor(
      sourceObject.total.tax.amount,
      sourceObject.total.tax.currency,
    ),
    order_lines: getLineItems(sourceObject),
    auto_capture: true,
    merchant_reference1: sourceObject.id,
    merchant_reference2: transactionId,
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

  const klarnaMerchantId = klarnaConfig.username.split("_")[0];
  const klarnaEnv = getEnvironmentFromUrl(klarnaConfig.apiUrl);

  const klarnaDashboardHost =
    klarnaEnv === "playground"
      ? "https://portal.playground.klarna.com"
      : "https://portal.klarna.com";
  const externalUrl =
    klarnaDashboardHost +
    `/orders/all/merchants/${klarnaMerchantId}/orders/${klarnaOrder.data.order_id}`;

  await client
    .mutation(TransactionEventReportDocument, {
      transactionId,
      amount: sourceObject.total.gross.amount,

      availableActions:
        klarnaOrder.data.fraud_status === "ACCEPTED"
          ? [TransactionActionEnum.Refund]
          : // @todo uncomment when cancel is implemented
            // : [TransactionActionEnum.Cancel],
            [],
      externalUrl,
      time: new Date().toISOString(),
      type:
        klarnaOrder.data.fraud_status === "ACCEPTED"
          ? TransactionEventTypeEnum.ChargeSuccess
          : TransactionEventTypeEnum.ChargeRequest,
      pspReference: klarnaOrder.data.order_id,
      message: klarnaOrder.data.fraud_status,
    })
    .toPromise();

  res.status(200).json("[OK]");
}
