import AuthorizeNet from "authorizenet";
import { transactionId } from "./transaction-id-utils";
import { invariant } from "@/lib/invariant";
import {
  type AddressFragment,
  type OrderOrCheckoutFragment,
  type TransactionInitializeSessionEventFragment,
} from "generated/graphql";

const ApiContracts = AuthorizeNet.APIContracts;

function concatAddressLines(address: AddressFragment) {
  return [address.streetAddress1, address.streetAddress2]
    .map((a) => a.trim())
    .filter(Boolean)
    .join(" ");
}

/**
 *
 * @description This function is used to build a "synchronized" Authorize.net transaction.
 * Synchronization means that it has a reference to the original transaction (if there was a prior transaction), as well as to the Saleor transaction.
 */
function buildAuthorizeTransactionRequest({
  saleorTransactionId,
  authorizeTransactionId,
}: {
  saleorTransactionId: string;
  authorizeTransactionId: string | undefined;
}) {
  const transactionRequest = new ApiContracts.TransactionRequestType();

  if (authorizeTransactionId) {
    // refTransId is the transaction ID of the original transaction being referenced.
    transactionRequest.setRefTransId(authorizeTransactionId);
  }

  const order = new ApiContracts.OrderType();
  order.setDescription(saleorTransactionId);

  transactionRequest.setOrder(order);

  return transactionRequest;
}

function buildTransactionFromTransactionInitializePayload(
  payload: TransactionInitializeSessionEventFragment,
): AuthorizeNet.APIContracts.TransactionRequestType {
  const authorizeTransactionId = transactionId.resolveAuthorizeTransactionIdFromTransaction(
    payload.transaction,
  );
  const saleorTransactionId = transactionId.saleorTransactionIdConverter.fromSaleorTransaction(
    payload.transaction,
  );

  const transactionRequest = buildAuthorizeTransactionRequest({
    authorizeTransactionId,
    saleorTransactionId,
  });

  transactionRequest.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHONLYTRANSACTION);
  transactionRequest.setAmount(payload.action.amount);
  transactionRequest.setCurrencyCode(payload.action.currency);

  const lineItems = authorizeTransaction.buildLineItemsFromOrderOrCheckout(payload.sourceObject);
  transactionRequest.setLineItems(lineItems);

  invariant(payload.sourceObject.billingAddress, "Billing address is missing from payload.");
  const billTo = authorizeTransaction.buildBillTo(payload.sourceObject.billingAddress);
  transactionRequest.setBillTo(billTo);

  invariant(payload.sourceObject.shippingAddress, "Shipping address is missing from payload.");
  const shipTo = authorizeTransaction.buildShipTo(payload.sourceObject.shippingAddress);
  transactionRequest.setShipTo(shipTo);

  const poNumber = authorizeTransaction.buildPoNumber(payload.sourceObject);
  transactionRequest.setPoNumber(poNumber);

  return transactionRequest;
}

export const authorizeTransaction = {
  buildLineItemsFromOrderOrCheckout(
    fragment: OrderOrCheckoutFragment,
  ): AuthorizeNet.APIContracts.ArrayOfLineItem {
    const lineItems = fragment.lines.map((line) => {
      const lineItem = new ApiContracts.LineItemType();
      // todo: refactoring idea: create our own type-safe factories of AuthorizeNet types that respect the db field requirements, e.g. max length
      lineItem.setItemId(line.id.slice(0, 31)); // Authorize.net only allows 31 characters for this field.

      if (line.__typename === "CheckoutLine") {
        lineItem.setName(line.checkoutVariant.product.name.slice(0, 31)); // Authorize.net only allows 31 characters for this field.
      }

      if (line.__typename === "OrderLine") {
        invariant(line.orderVariant, "Order variant is missing from order line.");
        lineItem.setName(line.orderVariant.product.name.slice(0, 31)); // Authorize.net only allows 31 characters for this field.
      }

      lineItem.setQuantity(line.quantity);
      lineItem.setUnitPrice(line.totalPrice.gross.amount);

      return lineItem;
    });

    const arrayOfLineItems = new ApiContracts.ArrayOfLineItem();
    arrayOfLineItems.setLineItem(lineItems);

    return arrayOfLineItems;
  },

  buildBillTo(fragment: AddressFragment) {
    const billTo = new ApiContracts.CustomerAddressType();

    billTo.setFirstName(fragment.firstName);
    billTo.setLastName(fragment.lastName);
    billTo.setAddress(concatAddressLines(fragment));
    billTo.setCity(fragment.city);
    billTo.setState(fragment.countryArea);
    billTo.setZip(fragment.postalCode);
    billTo.setCountry(fragment.country.code);
    billTo.setPhoneNumber(fragment.phone);

    return billTo;
  },

  buildShipTo(fragment: AddressFragment) {
    const shipTo = new ApiContracts.CustomerAddressType();

    shipTo.setFirstName(fragment.firstName);
    shipTo.setLastName(fragment.lastName);
    shipTo.setAddress(concatAddressLines(fragment));
    shipTo.setCity(fragment.city);
    shipTo.setState(fragment.countryArea);
    shipTo.setZip(fragment.postalCode);
    shipTo.setCountry(fragment.country.code);

    return shipTo;
  },

  buildPoNumber(fragment: OrderOrCheckoutFragment) {
    if (fragment.__typename === "Checkout") {
      return "";
    }

    return fragment.number;
  },

  buildAuthorizeTransactionRequest,
  buildTransactionFromTransactionInitializePayload,
};
