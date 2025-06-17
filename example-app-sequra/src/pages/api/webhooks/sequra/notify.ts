// SeQura will make an IPN POST to this URL when the order is approved.
// The shop should use this signal to confirm the order.

import { print } from "graphql";
import { type NextApiRequest, type NextApiResponse } from "next";
import { createLogger } from "@/lib/logger";
import ValidateNotifyWebhookPayload from "@/schemas/Sequra/NotifyWebhookPayload.mjs";
import { saleorApp } from "@/saleor-app";
import { createServerClient } from "@/lib/create-graphq-client";
import { getPaymentAppConfigurator } from "@/modules/payment-app-configuration/payment-app-configuration-factory";
import { paymentAppFullyConfiguredEntrySchema } from "@/modules/payment-app-configuration/config-entry";
import { getConfigurationForChannel } from "@/modules/payment-app-configuration/payment-app-configuration";
import { getSequraApiClient } from "@/modules/sequra/sequra-api";
import {
  type GetTransactionByIdQuery,
  type GetTransactionByIdQueryVariables,
  GetTransactionByIdDocument,
  type TransactionEventReport,
  TransactionEventReportDocument,
  type TransactionEventReportMutationVariables,
  TransactionEventTypeEnum,
  TransactionActionEnum,
} from "generated/graphql";
import { env } from "@/lib/env.mjs";
import { buildSequraCreateOrderPayload } from "@/modules/sequra/sequra-payloads";

export default async function SequraNotifyWebhookHandler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const appBaseUrl = env.APP_API_BASE_URL ?? "";
  const logger = createLogger({}, { msgPrefix: "[SequraNotifyWebhookHandler] " });
  const { transactionId, channelId, saleorApiUrl, returnUrl } = req.query;
  logger.debug({ transactionId, channelId, saleorApiUrl, returnUrl }, "Received event");
  if (
    typeof transactionId !== "string" ||
    typeof channelId !== "string" ||
    typeof saleorApiUrl !== "string" ||
    typeof returnUrl !== "string"
  ) {
    logger.error({ transactionId, channelId, saleorApiUrl, returnUrl }, "Missing query params");
    return res.status(400).json("[BAD REQUEST]");
  }
  const body = req.body as unknown;

  const parsedBody = ValidateNotifyWebhookPayload(body);

  if (!parsedBody) {
    logger.error(ValidateNotifyWebhookPayload.errors, "Invalid body");
    return res.status(500).json("[INVALID BODY]");
  }

  const authData = await saleorApp.apl.get(saleorApiUrl);
  if (!authData) {
    logger.error({ transactionId, channelId, saleorApiUrl, returnUrl }, "Unauthorized");
    return res.status(401).json("[UNAUTHORIZED]");
  }
  const client = createServerClient(authData.saleorApiUrl, authData.token);
  const configurator = getPaymentAppConfigurator(client, saleorApiUrl);
  const appConfig = await configurator.getConfig();
  const sequraConfig = paymentAppFullyConfiguredEntrySchema.parse(
    getConfigurationForChannel(appConfig, channelId),
  );

  const sequraClient = getSequraApiClient({
    sequraApiUrl: sequraConfig.apiUrl,
    username: sequraConfig.username,
    password: sequraConfig.password,
    merchantRef: sequraConfig.merchantId,
  });

  const transactionResponse = await client
    .query<GetTransactionByIdQuery, GetTransactionByIdQueryVariables>(
      print(GetTransactionByIdDocument),
      { transactionId },
    )
    .toPromise();

  if (transactionResponse.error) {
    logger.error(transactionResponse.error, "Error fetching transaction");
    return res.status(500).json("[ERROR FETCHING TRANSACTION]");
  }
  if (!transactionResponse.data?.transaction) {
    logger.error({ transactionId, channelId, saleorApiUrl, returnUrl }, "Invalid transaction");
    return res.status(500).json("[INVALID TRANSACTION]");
  }

  const sourceObject =
    transactionResponse.data.transaction.checkout || transactionResponse.data.transaction.order;

  if (!sourceObject) {
    logger.error({ transactionId, channelId, saleorApiUrl, returnUrl }, "Missing source object");
    return res.status(500).json("[MISSING SOURCE OBJECT]");
  }

  const createSequraOrderPayload = buildSequraCreateOrderPayload({
    sourceObject,
    returnUrl,
    appBaseUrl,
    saleorApiUrl,
    merchantId: sequraConfig.merchantId,
    transactionId: transactionResponse.data.transaction.id,
    currency: sourceObject.total.gross.currency,
    amount: sourceObject.total.gross.amount,

    // customerIpAddress is used when creating the payment flow
    // not used in the async webhook
    customerIpAddress: "",
    meta: {
      saleorVersion: transactionResponse.data.shop.version,
    },
  });

  logger.debug({ ...createSequraOrderPayload }, "createSequraSession payload");

  if (body.sq_state === "approved") {
    await sequraClient.confirmOrder(body.order_ref, createSequraOrderPayload);

    const eventReportResponse = await client
      .mutation<TransactionEventReport, TransactionEventReportMutationVariables>(
        print(TransactionEventReportDocument),
        {
          amount: sourceObject.total.gross.amount,
          transactionId: transactionResponse.data.transaction.id,
          type: TransactionEventTypeEnum.ChargeSuccess,
          pspReference: body.order_ref,
          externalUrl: "",
          time: new Date().toISOString(),
          availableActions: [TransactionActionEnum.Refund],
        },
      )
      .toPromise();

    if (eventReportResponse.error) {
      logger.error(eventReportResponse.error, "Error reporting event");
      return res.status(500).json("[ERROR REPORTING EVENT]");
    }

    res.status(200).json("[OK]");
  } else if (body.sq_state === "needs_review") {
    // TODO: Handle needs_review state
    res.status(200).json("[OK]");
  }
}
