import { z } from "zod";
import {
  AcceptHostedGateway,
  acceptHostedTransactionInitializeRequestDataSchema,
} from "../authorize-net/gateways/accept-hosted-gateway";
import {
  ApplePayGateway,
  applePayTransactionInitializeDataSchema,
} from "../authorize-net/gateways/apple-pay-gateway";
import {
  PaypalGateway,
  paypalTransactionInitializeRequestDataSchema,
} from "../authorize-net/gateways/paypal-gateway";
import { type TransactionInitializeSessionEventFragment } from "generated/graphql";

import { BaseError, IncorrectWebhookPayloadDataError } from "@/errors";
import { type TransactionInitializeSessionResponse } from "@/schemas/TransactionInitializeSession/TransactionInitializeSessionResponse.mjs";

const TransactionProcessUnsupportedPaymentMethodError = BaseError.subclass(
  "TransactionProcessUnsupportedPaymentMethodError",
);

export function mapTransactionInitializeResponse(
  payload: TransactionInitializeSessionEventFragment,
): Pick<TransactionInitializeSessionResponse, "amount" | "result" | "data" | "pspReference"> {
  const amount = payload.transaction.authorizedAmount.amount;

  return {
    amount,
    result: "AUTHORIZATION_SUCCESS",
    data: {},
  };
}

const transactionInitializeDataSchema = z.union([
  applePayTransactionInitializeDataSchema,
  acceptHostedTransactionInitializeRequestDataSchema,
  paypalTransactionInitializeRequestDataSchema,
]);

const TransactionInitializePayloadDataError = IncorrectWebhookPayloadDataError.subclass(
  "TransactionInitializePayloadDataError",
);

export class TransactionInitializeSessionService {
  execute(
    payload: TransactionInitializeSessionEventFragment,
  ): Promise<TransactionInitializeSessionResponse> {
    const parseResult = transactionInitializeDataSchema.safeParse(payload.data);

    if (!parseResult.success) {
      throw new TransactionInitializePayloadDataError(
        "The `data` field in the TransactionInitializeSession webhook payload is invalid",
        {
          errors: parseResult.error.errors,
        },
      );
    }

    const paymentMethod = parseResult.data;

    switch (paymentMethod.type) {
      case "acceptHosted": {
        const gateway = new AcceptHostedGateway();

        return gateway.initializeTransaction(payload);
      }

      case "applePay": {
        const gateway = new ApplePayGateway();

        return gateway.initializeTransaction(payload);
      }

      case "paypal": {
        const gateway = new PaypalGateway();

        return gateway.initializeTransaction(payload);
      }

      default:
        throw new TransactionProcessUnsupportedPaymentMethodError(
          "Unsupported payment method type",
        );
    }
  }
}
