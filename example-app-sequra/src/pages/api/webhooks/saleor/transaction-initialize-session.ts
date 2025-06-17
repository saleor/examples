import { SaleorSyncWebhook } from "@saleor/app-sdk/handlers/next";
import { type PageConfig } from "next";
import { uuidv7 } from "uuidv7";
import { saleorApp } from "@/saleor-app";
import {
  UntypedTransactionInitializeSessionDocument,
  type TransactionInitializeSessionEventFragment,
  TransactionFlowStrategyEnum,
  TransactionEventTypeEnum,
} from "generated/graphql";
import { TransactionInitializeSessionWebhookHandler } from "@/modules/webhooks/transaction-initialize-session";
import { getSyncWebhookHandler } from "@/backend-lib/api-route-utils";
import ValidateTransactionInitializeSessionResponse from "@/schemas/TransactionInitializeSession/TransactionInitializeSessionResponse.mjs";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export const transactionInitializeSessionSyncWebhook =
  new SaleorSyncWebhook<TransactionInitializeSessionEventFragment>({
    name: "TransactionInitializeSession",
    apl: saleorApp.apl,
    event: "TRANSACTION_INITIALIZE_SESSION",
    query: UntypedTransactionInitializeSessionDocument,
    webhookPath: "/api/webhooks/saleor/transaction-initialize-session",
  });

export default transactionInitializeSessionSyncWebhook.createHandler(
  getSyncWebhookHandler(
    "transactionInitializeSessionSyncWebhook",
    TransactionInitializeSessionWebhookHandler,
    ValidateTransactionInitializeSessionResponse,
    (payload, errorResponse) => {
      return {
        amount: 0,
        result:
          payload.action.actionType === TransactionFlowStrategyEnum.Authorization
            ? TransactionEventTypeEnum.AuthorizationFailure
            : TransactionEventTypeEnum.ChargeFailure,
        message: errorResponse.message,
        data: { errors: errorResponse.errors, sequraOrderUrl: "", sequraOrderId: "" },
        // @todo consider making pspReference optional https://github.com/saleor/saleor/issues/12490
        pspReference: uuidv7(),
      } as const;
    },
  ),
);
