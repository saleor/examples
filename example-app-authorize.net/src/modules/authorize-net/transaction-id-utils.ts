import { type GetTransactionDetailsResponse } from "./client/transaction-details-client";
import { invariant } from "@/lib/invariant";
import { type TransactionFragment } from "generated/graphql";

/**
 * We need to pass the saleorTransactionId to Authorize.net transaction so that we can
 * later (in the Authorize → Saleor webhook) match the Authorize.net transaction with the Saleor transaction.
 *
 * The logical way to do it would be by using the `refId` field, but it's limited to 20 characters. Saleor transaction id is longer than that.
 * Thus, why we use the `order.description` field, which is limited to 255 characters.
 *
 * `transactionIdConverter` makes sure the format of the string is the same on both sides.
 */

export const base64WithoutPaddingConverter = {
  btoa(str: string): string {
    const base64 = btoa(str);
    // authorize.net doesn't allow storing `=` but thankfully it's just a padding so we can strip it and readd when decoding
    const base64WithoutPadding = base64.includes("=")
      ? base64.slice(0, base64.indexOf("="))
      : base64;
    return base64WithoutPadding;
  },
  atob(str: string): string {
    const modulo4 = str.length % 4;
    const howManyPaddingChars = modulo4 ? 4 - modulo4 : 0;
    invariant(
      howManyPaddingChars !== 3,
      `Padding is never 3 characters; something's wrong: ${str}`,
    );
    return atob(str + "=".repeat(howManyPaddingChars));
  },
};

/**
 * @description authorize.net doesn't allow storing `=` but thankfully it's just a padding so we can strip it and readd when decoding
 */
const saleorTransactionIdConverter = {
  fromSaleorTransaction(saleorTransaction: TransactionFragment) {
    return base64WithoutPaddingConverter.btoa(saleorTransaction.id);
  },
  fromAuthorizeNetTransaction(authorizeTransaction: GetTransactionDetailsResponse) {
    const orderDescription = authorizeTransaction.transaction.order?.description;
    invariant(orderDescription, "Missing order description in transaction");

    return base64WithoutPaddingConverter.atob(orderDescription);
  },
};

function resolveAuthorizeTransactionIdFromTransaction(transaction: TransactionFragment) {
  return transaction.pspReference;
}

export const transactionId = {
  saleorTransactionIdConverter,
  resolveAuthorizeTransactionIdFromTransaction,
};
