import AuthorizeNet from "authorizenet";
import { CreateTransactionClient } from "../authorize-net/client/create-transaction";

import { authorizeTransaction } from "../authorize-net/authorize-transaction-builder";

import { transactionId } from "../authorize-net/transaction-id-utils";
import { type TransactionCancelationRequestedEventFragment } from "generated/graphql";

import { BaseError } from "@/errors";
import { invariant } from "@/lib/invariant";
import { createLogger } from "@/lib/logger";
import { type TransactionCancelationRequestedResponse } from "@/schemas/TransactionCancelationRequested/TransactionCancelationRequestedResponse.mjs";

const ApiContracts = AuthorizeNet.APIContracts;

export const TransactionCancelationRequestedError = BaseError.subclass(
  "TransactionCancelationRequestedError",
);

const TransactionCancelationAuthorizeTransactionIdError =
  TransactionCancelationRequestedError.subclass(
    "TransactionCancelationAuthorizeTransactionIdError",
  );

export class TransactionCancelationRequestedService {
  private logger = createLogger({
    name: "TransactionCancelationRequestedService",
  });

  private async buildTransactionFromPayload({
    authorizeTransactionId,
    saleorTransactionId,
  }: {
    authorizeTransactionId: string;
    saleorTransactionId: string;
  }): Promise<AuthorizeNet.APIContracts.TransactionRequestType> {
    const transactionRequest = authorizeTransaction.buildAuthorizeTransactionRequest({
      saleorTransactionId,
      authorizeTransactionId,
    });

    transactionRequest.setTransactionType(ApiContracts.TransactionTypeEnum.VOIDTRANSACTION);

    return transactionRequest;
  }

  async execute(
    payload: TransactionCancelationRequestedEventFragment,
  ): Promise<TransactionCancelationRequestedResponse> {
    this.logger.debug({ id: payload.transaction?.id }, "Canceling transaction");

    invariant(payload.transaction, "Transaction is missing");

    const authorizeTransactionId = transactionId.resolveAuthorizeTransactionIdFromTransaction(
      payload.transaction,
    );
    const saleorTransactionId = transactionId.saleorTransactionIdConverter.fromSaleorTransaction(
      payload.transaction,
    );

    if (!authorizeTransactionId) {
      throw new TransactionCancelationAuthorizeTransactionIdError(
        "The transaction payload of TransactionCancelationRequested is missing authorizeTransactionId",
      );
    }

    const transactionInput = await this.buildTransactionFromPayload({
      authorizeTransactionId,
      saleorTransactionId,
    });

    const createTransactionClient = new CreateTransactionClient();
    await createTransactionClient.createTransaction(transactionInput);

    this.logger.debug("Successfully voided the transaction");

    const amount = payload.transaction.authorizedAmount.amount;

    return {
      amount,
      pspReference: authorizeTransactionId,
      result: "CANCEL_SUCCESS",
    };
  }
}
