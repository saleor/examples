import { type Client } from "urql";
import { TransactionDetailsClient } from "../client/transaction-details-client";
import { transactionId } from "../transaction-id-utils";
import { type AuthorizeNetEvent } from "./authorize-net-webhook-client";
import { type EventPayload } from "./authorize-net-webhook-handler";
import {
  TransactionEventReportDocument,
  TransactionEventTypeEnum,
  type TransactionEventReportMutation,
  type TransactionEventReportMutationVariables,
} from "generated/graphql";
import { createLogger } from "@/lib/logger";
import { BaseError } from "@/errors";

const TransactionEventReportMutationError = BaseError.subclass(
  "TransactionEventReportMutationError",
);

const TransactionEventReportUnsupportedTypeError = BaseError.subclass(
  "TransactionEventReportUnsupportedTypeError",
);

/**
 * @description This class is used to synchronize Authorize.net transactions with Saleor transactions
 */
export class TransactionEventReporter {
  private client: Client;
  private logger = createLogger({
    name: "TransactionEventReporter",
  });

  constructor({ client }: { client: Client }) {
    this.client = client;
  }

  private mapEventType(authorizeTransactionType: AuthorizeNetEvent): TransactionEventTypeEnum {
    this.logger.debug({ authorizeTransactionType }, "Mapping Authorize transaction event type");
    switch (authorizeTransactionType) {
      case "net.authorize.payment.priorAuthCapture.created":
        return TransactionEventTypeEnum.ChargeSuccess;
      case "net.authorize.payment.void.created":
        return TransactionEventTypeEnum.ChargeFailure;
      default:
        throw new TransactionEventReportUnsupportedTypeError(
          `${authorizeTransactionType} is not a supported transaction event type`,
        );
    }
  }

  private async transactionEventReport(variables: TransactionEventReportMutationVariables) {
    const { data, error: mutationError } = await this.client
      .mutation<TransactionEventReportMutation>(TransactionEventReportDocument, variables)
      .toPromise();

    if (mutationError) {
      this.logger.warn(
        "The app was unable to map the Authorize.net webhook to a Saleor transaction. If the transaction wasn't created by the app and is meant to be synchronized, please make sure it follows the requirements described in the README.",
      );
      throw new TransactionEventReportMutationError(
        "Error while mapping the transaction in the authorize webhook handler.",
        { cause: mutationError.message },
      );
    }

    this.logger.trace({ data }, "Transaction event response");
  }

  private getAuthorizeTransaction({ id }: { id: string }) {
    const transactionDetailsClient = new TransactionDetailsClient();
    return transactionDetailsClient.getTransactionDetails({ transactionId: id });
  }

  async reportEvent(eventPayload: EventPayload) {
    const id = eventPayload.payload.id;
    const authorizeTransaction = await this.getAuthorizeTransaction({ id });

    const saleorTransactionId =
      transactionId.saleorTransactionIdConverter.fromAuthorizeNetTransaction(authorizeTransaction);
    const authorizeTransactionId = authorizeTransaction.transaction.transId;

    const type = this.mapEventType(eventPayload.eventType);

    const eventReportPayload = {
      amount: authorizeTransaction.transaction.authAmount,
      availableActions: [],
      pspReference: authorizeTransactionId,
      time: eventPayload.eventDate,
      transactionId: saleorTransactionId,
      type,
    };

    this.logger.debug({ eventReportPayload }, "Reporting transaction event");

    await this.transactionEventReport(eventReportPayload);

    this.logger.info("Successfully synchronized Saleor transaction with Authorize transaction");
  }
}
