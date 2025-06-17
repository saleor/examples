import { JsonSchemaError, SequraHttpClientError, SequraOrderSolictationError } from "@/errors";
import { invariant } from "@/lib/invariant";
import { unpackPromise } from "@/lib/utils";
import { getSequraIntegerAmountFromSaleor } from "@/modules/sequra/currencies";
import { type OrderCreateRequest } from "@/schemas/Sequra/OrderCreateRequest.mjs";
import { type OrderUpdateRequest } from "@/schemas/Sequra/OrderUpdateRequest.mjs";
import ValidatePaymentMethodGetForOrderResponse, {
  type PaymentMethodGetForOrderResponse,
} from "@/schemas/Sequra/PaymentMethodGetForOrderResponse.mjs";
import {
  type TransactionInitializeSessionAddressFragment,
  type OrderOrCheckoutLinesFragment,
} from "generated/graphql";

export const getEnvironmentFromUrl = (url: string) => {
  return url.includes("sandbox.") ? "sandbox" : "production";
};

export type SequraMetadata = {
  transactionId: string;
  channelId: string;
  checkoutId?: string;
  orderId?: string;
};

export const getSequraApiClient = ({
  sequraApiUrl,
  username,
  password,
  merchantRef,
}: {
  sequraApiUrl: string;
  username: string;
  password: string;
  merchantRef: string;
}) => new SequraApiClient({ sequraApiUrl, username, password, merchantRef });

export class SequraApiClient {
  #apiUrl: string;
  #username: string;
  #password: string;
  #merchantRef: string;

  constructor({
    sequraApiUrl,
    username,
    password,
    merchantRef,
  }: {
    sequraApiUrl: string;
    username: string;
    password: string;
    merchantRef: string;
  }) {
    this.#apiUrl = sequraApiUrl;
    this.#username = username;
    this.#password = password;
    this.#merchantRef = merchantRef;
  }

  private getEndpoint(path: string) {
    const url = new URL(path, this.#apiUrl);
    return url.toString();
  }

  private getHeaders() {
    return {
      Authorization: `Basic ${btoa(`${this.#username}:${this.#password}`)}`,
    };
  }

  private async request(path: string, options: RequestInit) {
    const url = this.getEndpoint(path);
    console.log({ url });
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new SequraHttpClientError(`Request failed with status ${response.status}`, {
        props: {
          statusCode: response.status,
          name: response.statusText,
          response,
        },
      });
    }

    return response;
  }

  private async updateOrder(orderRef: string, payload: OrderUpdateRequest): Promise<Response> {
    // https://sandbox.sequrapi.com/merchants/merchant-ref/orders/order-ref
    const path = `/merchants/${this.#merchantRef}/orders/${orderRef}`;
    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    } satisfies RequestInit;

    const [responseError, responseSuccess] = await unpackPromise(this.request(path, options));

    if (responseError instanceof SequraHttpClientError && responseError.statusCode === 409) {
      // https://docs.sequrapi.com/checkout/order_start_solicitation.html#errors
      const json = await responseError.response.json();
      if (
        typeof json === "object" &&
        json !== null &&
        "errors" in json &&
        Array.isArray(json.errors)
      ) {
        console.dir(json, { depth: 999 });
        throw new SequraOrderSolictationError("Order update failed", {
          errors: json.errors,
        });
      }
    } else if (responseError instanceof SequraHttpClientError) {
      console.log(
        responseError.statusCode,
        responseError.name,
        responseError.message,
        responseError.response.statusText,
        await responseError.response.text(),
      );
    }
    if (responseError) {
      throw responseError;
    }

    return responseSuccess;
  }

  getOrderUuidFromUrl(orderUrl: string): string {
    // https://sandbox.sequrapi.com/orders/bae1b86f-4417-4a98-a336-c90b3745e089
    const url = new URL(orderUrl, this.#apiUrl);
    const pathname = url.pathname;
    const match = pathname.match(/\/orders\/(.*)(?:\/|$)/);
    if (!match?.[1]) {
      throw new SequraHttpClientError("Invalid order URL provided");
    }
    return match[1];
  }

  async createOrder(data: OrderCreateRequest) {
    const path = "/orders";
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const [responseError, responseSuccess] = await unpackPromise(this.request(path, options));

    if (responseError instanceof SequraHttpClientError && responseError.statusCode === 409) {
      // https://docs.sequrapi.com/checkout/order_start_solicitation.html#errors
      const json = await responseError.response.json();
      if (
        typeof json === "object" &&
        json !== null &&
        "errors" in json &&
        Array.isArray(json.errors)
      ) {
        throw new SequraOrderSolictationError("Order solictation failed", {
          errors: json.errors,
        });
      }
    } else if (responseError instanceof SequraHttpClientError) {
      console.log(await responseError.response.text());
    }
    if (responseError) {
      throw responseError;
    }

    const url = responseSuccess.headers.get("Location");
    if (!url || !URL.canParse(url)) {
      throw new SequraHttpClientError(`Invalid Location header: ${url}`, {
        props: {
          statusCode: responseSuccess.status,
          name: responseSuccess.statusText,
        },
      });
    }

    return url;
  }

  async getPaymentMethodsForOrder(orderUuid: string): Promise<PaymentMethodGetForOrderResponse> {
    const path = `/orders/${orderUuid}/payment_methods`;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await this.request(path, options);
    const json = await response.json();
    if (ValidatePaymentMethodGetForOrderResponse(json)) {
      return json;
    } else {
      throw new JsonSchemaError(`Invalid response for /orders/${orderUuid}/payment_methods`, {
        errors: ValidatePaymentMethodGetForOrderResponse.errors ?? [],
      });
    }
  }

  async getOrderForm(orderUuid: string) {
    const path = `/orders/${orderUuid}/form_v2`;
    const options = {
      method: "GET",
      headers: {
        Accept: "text/html",
      },
    };

    const response = await this.request(path, options);
    const text = await response.text();
    return text;
  }

  async confirmOrder(orderUuid: string, payload: OrderCreateRequest): Promise<void> {
    const path = `/orders/${orderUuid}`;
    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload, order: { ...payload.order, state: "confirmed" } }),
    } satisfies RequestInit;

    const [responseError, responseSuccess] = await unpackPromise(this.request(path, options));

    if (responseError instanceof SequraHttpClientError && responseError.statusCode === 409) {
      // https://docs.sequrapi.com/checkout/order_start_solicitation.html#errors
      const json = await responseError.response.json();
      if (
        typeof json === "object" &&
        json !== null &&
        "errors" in json &&
        Array.isArray(json.errors)
      ) {
        throw new SequraOrderSolictationError("Order confirmation failed", {
          errors: json.errors,
        });
      }
    } else if (responseError instanceof SequraHttpClientError) {
      console.log(await responseError.response.text());
    }
    if (responseError) {
      throw responseError;
    }
    console.dir(responseSuccess, { depth: 999 });
  }

  async refundOrder({
    orderRef,
    payload,
    cancellationReason,
  }: {
    orderRef: string;
    payload: OrderUpdateRequest;
    cancellationReason: OrderUpdateRequest["order"]["cancellation_reason"];
  }): Promise<void> {
    console.log({
      ...payload,
      order: {
        ...payload.order,
        cancellation_reason: cancellationReason,
      },
    });
    await this.updateOrder(orderRef, {
      ...payload,
      order: {
        ...payload.order,
        cancellation_reason: cancellationReason,
      },
    });
  }

  async fulfillOrder({
    orderRef,
    payload,
  }: {
    orderRef: string;
    payload: OrderUpdateRequest;
  }): Promise<void> {
    console.log({
      ...payload,
      order: {
        ...payload.order,
      },
    });
    await this.updateOrder(orderRef, {
      ...payload,
      order: {
        ...payload.order,
      },
    });
  }
}

export const getLineItems = ({
  lines,
  shippingPrice,
  deliveryMethod,
}: {
  lines: OrderOrCheckoutLinesFragment["lines"];
  shippingPrice?: OrderOrCheckoutLinesFragment["shippingPrice"];
  deliveryMethod?: OrderOrCheckoutLinesFragment["deliveryMethod"];
}): OrderCreateRequest["order"]["cart"]["items"] => {
  const shippingLineItem: OrderCreateRequest["order"]["cart"]["items"][number] | null =
    shippingPrice && deliveryMethod?.__typename === "ShippingMethod"
      ? {
          type: "handling",
          reference: deliveryMethod.id,
          name: deliveryMethod.name,
          total_with_tax: getSequraIntegerAmountFromSaleor(
            shippingPrice.gross.amount,
            shippingPrice.gross.currency,
          ),
        }
      : null;

  // @todo separate discounts
  const lineItems = lines.map((line) => {
    const variant =
      line.__typename === "CheckoutLine"
        ? line.checkoutVariant
        : line.__typename === "OrderLine"
        ? line.orderVariant
        : /* c8 ignore next */
          null;

    invariant(variant, `Unknown line type: ${line.__typename || "<undefined>"}`);

    const sequraLineItem: OrderCreateRequest["order"]["cart"]["items"][number] = {
      type: "product",
      reference: variant.sku || variant.id,
      name: [variant.product.name, variant.name].filter(Boolean).join(" - "),
      price_with_tax: getSequraIntegerAmountFromSaleor(
        line.unitPrice.gross.amount,
        line.unitPrice.gross.currency,
      ),
      quantity: line.quantity,
      total_with_tax: getSequraIntegerAmountFromSaleor(
        line.totalPrice.gross.amount,
        line.totalPrice.gross.currency,
      ),
      product_id: variant.id,
      downloadable: false,
    };
    return sequraLineItem;
  });

  return [...lineItems, shippingLineItem].filter(Boolean);
};

export const prepareRequestAddress = (
  address: undefined | null | TransactionInitializeSessionAddressFragment,
  _email: undefined | null | string,
):
  | undefined
  | OrderCreateRequest["order"]["delivery_address"]
  | OrderCreateRequest["order"]["invoice_address"] => {
  if (!address) {
    return undefined;
  }

  return {
    given_names: address.firstName,
    surnames: address.lastName,
    company: address.companyName,
    address_line_1: address.streetAddress1,
    address_line_2: address.streetAddress2,
    postal_code: address.postalCode,
    city: address.city,
    country_code: address.country.code,
    state: address.countryArea,
    phone: address.phone || "",
  };
};
