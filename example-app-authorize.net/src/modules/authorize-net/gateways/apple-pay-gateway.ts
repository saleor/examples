import AuthorizeNet from "authorizenet";
import { z } from "zod";
import { authorizeTransaction } from "../authorize-transaction-builder";
import { CreateTransactionClient } from "../client/create-transaction";
import { gatewayUtils } from "./gateway-utils";
import { IncorrectWebhookPayloadDataError } from "@/errors";
import { createLogger } from "@/lib/logger";
import { type PaymentGateway } from "@/modules/webhooks/payment-gateway-initialize-session";
import { type TransactionInitializeSessionResponse } from "@/schemas/TransactionInitializeSession/TransactionInitializeSessionResponse.mjs";
import {
  type PaymentGatewayInitializeSessionEventFragment,
  type TransactionInitializeSessionEventFragment,
} from "generated/graphql";

const ApiContracts = AuthorizeNet.APIContracts;

// feel free to migrate it to JSON schema
export const applePayPaymentGatewayResponseDataSchema = z.object({});

type ApplePayPaymentGatewayData = z.infer<typeof applePayPaymentGatewayResponseDataSchema>;

export const applePayTransactionInitializeDataSchema = gatewayUtils.createGatewayDataSchema(
  "applePay",
  z.object({
    dataDescriptor: z.string(),
    dataValue: z.string(),
  }),
);

const AuthorizeApplePayTransactionInitializePayloadDataError =
  IncorrectWebhookPayloadDataError.subclass(
    "AuthorizeApplePayTransactionInitializePayloadDataError",
  );

export class ApplePayGateway implements PaymentGateway {
  logger = createLogger({
    name: "ApplePayGateway",
  });

  async initializePaymentGateway(
    _payload: PaymentGatewayInitializeSessionEventFragment,
  ): Promise<ApplePayPaymentGatewayData> {
    // todo: put everything that client needs to initialize apple pay here
    return {};
  }

  private buildTransactionRequest(
    payload: TransactionInitializeSessionEventFragment,
  ): AuthorizeNet.APIContracts.TransactionRequestType {
    // todo: add apple pay logic here
    const transactionRequest =
      authorizeTransaction.buildTransactionFromTransactionInitializePayload(payload);

    //https://developer.authorize.net/api/reference/index.html#mobile-in-app-transactions-create-an-apple-pay-transaction
    const opaqueData = new ApiContracts.OpaqueDataType();

    const parseResult = applePayTransactionInitializeDataSchema.safeParse(payload.data);

    if (!parseResult.success) {
      throw new AuthorizeApplePayTransactionInitializePayloadDataError(
        "The ApplePay gateway requires different shape of the `data` field in the TransactionInitializeSession webhook payload",
        {
          errors: parseResult.error.errors,
        },
      );
    }

    const {
      data: { dataDescriptor, dataValue },
    } = parseResult.data;

    opaqueData.setDataDescriptor(dataDescriptor);
    opaqueData.setDataValue(dataValue);

    const payment = new ApiContracts.PaymentType();
    payment.setOpaqueData(opaqueData);

    transactionRequest.setPayment(payment);

    return transactionRequest;
  }

  async initializeTransaction(
    payload: TransactionInitializeSessionEventFragment,
  ): Promise<TransactionInitializeSessionResponse> {
    const transactionRequest = this.buildTransactionRequest(payload);

    const createTransactionClient = new CreateTransactionClient();
    const response = await createTransactionClient.createTransaction(transactionRequest);

    return {
      amount: payload.action.amount,
      pspReference: response.transactionResponse.transId,
      data: {},
      time: new Date().toISOString(),
      actions: ["CHARGE", "REFUND"],
      result: "AUTHORIZATION_SUCCESS",
    };
  }
}
