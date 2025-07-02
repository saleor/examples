import { type AuthData } from "@saleor/app-sdk/APL";
import { type Client } from "urql";
import { type AuthorizeConfig } from "../authorize-net/authorize-net-config";

import { TransactionCancelationRequestedService } from "./transaction-cancelation-requested";
import { TransactionProcessSessionService } from "./transaction-process-session";
import { TransactionRefundRequestedService } from "./transaction-refund-requested";

import { PaymentGatewayInitializeSessionService } from "./payment-gateway-initialize-session";
import { TransactionInitializeSessionService } from "./transaction-initialize-session";
import { createServerClient } from "@/lib/create-graphq-client";
import { type PaymentGatewayInitializeSessionResponse } from "@/pages/api/webhooks/payment-gateway-initialize-session";
import { type TransactionCancelationRequestedResponse } from "@/schemas/TransactionCancelationRequested/TransactionCancelationRequestedResponse.mjs";
import { type TransactionInitializeSessionResponse } from "@/schemas/TransactionInitializeSession/TransactionInitializeSessionResponse.mjs";
import { type TransactionProcessSessionResponse } from "@/schemas/TransactionProcessSession/TransactionProcessSessionResponse.mjs";
import { type TransactionRefundRequestedResponse } from "@/schemas/TransactionRefundRequested/TransactionRefundRequestedResponse.mjs";
import {
  type PaymentGatewayInitializeSessionEventFragment,
  type TransactionCancelationRequestedEventFragment,
  type TransactionInitializeSessionEventFragment,
  type TransactionProcessSessionEventFragment,
  type TransactionRefundRequestedEventFragment,
} from "generated/graphql";

export interface PaymentsWebhooks {
  transactionInitializeSession: (
    payload: TransactionInitializeSessionEventFragment,
  ) => Promise<TransactionInitializeSessionResponse>;
  transactionProcessSession: (
    payload: TransactionProcessSessionEventFragment,
  ) => Promise<TransactionProcessSessionResponse>;
  transactionCancelationRequested: (
    payload: TransactionCancelationRequestedEventFragment,
  ) => Promise<TransactionCancelationRequestedResponse>;
}

export class AppWebhookManager implements PaymentsWebhooks {
  private apiClient: Client;

  constructor({ apiClient }: { apiClient: Client }) {
    this.apiClient = apiClient;
  }

  async transactionInitializeSession(
    payload: TransactionInitializeSessionEventFragment,
  ): Promise<TransactionInitializeSessionResponse> {
    const service = new TransactionInitializeSessionService();

    return service.execute(payload);
  }

  async transactionProcessSession(
    payload: TransactionProcessSessionEventFragment,
  ): Promise<TransactionProcessSessionResponse> {
    const service = new TransactionProcessSessionService();

    return service.execute(payload);
  }

  async transactionCancelationRequested(
    payload: TransactionCancelationRequestedEventFragment,
  ): Promise<TransactionCancelationRequestedResponse> {
    const service = new TransactionCancelationRequestedService();

    return service.execute(payload);
  }

  async transactionRefundRequested(
    payload: TransactionRefundRequestedEventFragment,
  ): Promise<TransactionRefundRequestedResponse> {
    const service = new TransactionRefundRequestedService({
      apiClient: this.apiClient,
    });

    return service.execute(payload);
  }

  async paymentGatewayInitializeSession(
    payload: PaymentGatewayInitializeSessionEventFragment,
  ): Promise<PaymentGatewayInitializeSessionResponse> {
    const service = new PaymentGatewayInitializeSessionService();

    const data = await service.execute(payload);

    return {
      data,
    };
  }
}

export async function createAppWebhookManager({
  authData,
}: {
  authData: AuthData;
  authorizeConfig: AuthorizeConfig;
}) {
  const apiClient = createServerClient(authData.saleorApiUrl, authData.token);
  const appWebhookManager = new AppWebhookManager({
    apiClient,
  });

  return appWebhookManager;
}
