import { type Client } from "urql";
import { BaseError } from "@/errors";
import { createLogger } from "@/lib/logger";
import {
  UpdatePrivateMetadataDocument,
  type UpdatePrivateMetadata,
  type UpdatePrivateMetadataMutationVariables,
} from "generated/graphql";

const TransactionMetadataMutationError = BaseError.subclass("TransactionMetadataMutationError");

export const TRANSACTION_METADATA_KEY = "authorizeTransactionId";

export class TransactionMetadataManager {
  private apiClient: Client;
  private transactionMetadataKey = TRANSACTION_METADATA_KEY;
  private logger = createLogger({
    name: "TransactionMetadataManager",
  });

  constructor({ apiClient }: { apiClient: Client }) {
    this.apiClient = apiClient;
  }

  async saveTransactionId({
    saleorTransactionId,
    authorizeTransactionId,
  }: {
    saleorTransactionId: string;
    authorizeTransactionId: string;
  }): Promise<void> {
    const input: UpdatePrivateMetadataMutationVariables["input"] = [
      {
        key: this.transactionMetadataKey,
        value: authorizeTransactionId,
      },
    ];

    const { error } = await this.apiClient
      .mutation<UpdatePrivateMetadata>(UpdatePrivateMetadataDocument, {
        id: saleorTransactionId,
        input,
      } as UpdatePrivateMetadataMutationVariables)
      .toPromise();

    if (error) {
      throw new TransactionMetadataMutationError("Unable to update transaction metadata", {
        cause: error,
      });
    }

    this.logger.debug("Transaction metadata saved");
  }
}
