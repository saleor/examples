import merge from "lodash-es/merge";
import { getFilledMetadata } from "@/modules/payment-app-configuration/__tests__/utils";
import { type JSONValue } from "@/types";
import {
  LanguageCodeEnum,
  TransactionFlowStrategyEnum,
  type OrderLine,
  type OrderOrCheckoutLines_Checkout_Fragment,
  type OrderOrCheckoutLines_Order_Fragment,
  type OrderOrCheckoutSourceObject_Checkout_Fragment,
  type OrderOrCheckoutSourceObject_Order_Fragment,
  type PaymentGatewayInitializeSessionEventFragment,
  type PaymentGatewayRecipientFragment,
  type TransactionInitializeSessionEventFragment,
  type TransactionProcessSessionEventFragment,
} from "generated/graphql";

// prevent "Type instantiation is excessively deep and possibly infinite" error
type MaxNesting = 15;
type DeepPartial<T, Nesting extends unknown[] = []> = Nesting["length"] extends MaxNesting
  ? T
  : T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P], [...Nesting, unknown]>;
    }
  : T;
type CreateMockFn<T> = (overrides?: DeepPartial<T> | null | undefined) => T;
type CreateMockAsyncFn<T> = (overrides?: DeepPartial<T> | null | undefined) => Promise<T>;

export const createMockApp: CreateMockAsyncFn<PaymentGatewayRecipientFragment> = async (
  overrides,
) => {
  const privateMetadata = await getFilledMetadata();
  return merge(
    {
      __typename: "App",
      id: "app-id",
      privateMetadata,
      metadata: {} as PaymentGatewayRecipientFragment["metadata"],
    } as const,
    overrides,
  );
};

export const createMockPaymentGatewayInitializeSessionEvent: CreateMockAsyncFn<
  PaymentGatewayInitializeSessionEventFragment
> = async (overrides) => {
  return merge(
    {
      __typename: "PaymentGatewayInitializeSession",
      sourceObject: {
        __typename: "Checkout",
        id: "c29tZS1jaGVja291dC1pZA==",
        languageCode: LanguageCodeEnum.PlPl,
        channel: { id: "1", slug: "default-channel" },
        total: {
          gross: {
            amount: 123.45,
            currency: "PLN",
          },
        },
        billingAddress: {
          country: {
            code: "PL",
          },
        },
      },
      recipient: await createMockApp(overrides?.recipient),
      data: undefined,
      issuingPrincipal: null,
    } as const,
    overrides,
  );
};

export const createMockCheckoutLine: CreateMockFn<
  OrderOrCheckoutLines_Checkout_Fragment["lines"][number]
> = () => {
  return merge({
    __typename: "CheckoutLine",
    id: "1",
    quantity: 1,
    totalPrice: {
      gross: {
        currency: "PLN",
        amount: 99.99,
      },
      net: {
        currency: "PLN",
        amount: 81.29,
      },
      tax: {
        currency: "PLN",
        amount: 18.7,
      },
    },
    unitPrice: {
      gross: {
        currency: "PLN",
        amount: 99.99,
      },
      net: {
        currency: "PLN",
        amount: 81.29,
      },
      tax: {
        currency: "PLN",
        amount: 18.7,
      },
    },
    checkoutVariant: {
      name: "product variant",
      product: {
        name: "product",
      },
    },
  });
};

export const createMockOrderLine: CreateMockFn<
  OrderOrCheckoutLines_Order_Fragment["lines"][number]
> = () => {
  return merge({
    __typename: "OrderLine",
    id: "1",
    quantity: 1,
    taxRate: 23,
    totalPrice: {
      gross: {
        currency: "PLN",
        amount: 99.99,
      },
      net: {
        currency: "PLN",
        amount: 81.29,
      },
      tax: {
        currency: "PLN",
        amount: 18.7,
      },
    },
    orderVariant: {
      name: "product variant",
      product: {
        name: "product",
      },
    },
  });
};

export const createMockTransactionInitializeSessionSourceObjectCheckout: CreateMockFn<
  OrderOrCheckoutSourceObject_Checkout_Fragment
> = () => {
  return merge({
    __typename: "Checkout",
    id: "c29tZS1jaGVja291dC1pZA==",
    channel: { id: "1", slug: "default-channel" },
    languageCode: LanguageCodeEnum.PlPl,
    total: {
      gross: {
        amount: 99.99 + 123.0,
        currency: "PLN",
      },
    },
    deliveryMethod: {
      __typename: "ShippingMethod",
      id: "some-shipping-id",
      name: "some-shipping-name",
    },
    shippingPrice: {
      gross: {
        currency: "PLN",
        amount: 123.0,
      },
      net: {
        currency: "PLN",
        amount: 100.0,
      },
      tax: {
        currency: "PLN",
        amount: 23.0,
      },
    },
    billingAddress: {
      firstName: "John",
      lastName: "Smith",
      phone: "+48123456789",
      city: "Washington",
      code: "",
      streetAddress1: "1600 Ave NW",
      streetAddress2: "",
      postalCode: "20500",
      countryArea: "DC",
      country: {
        code: "US",
      },
      companyName: "",
    },
    shippingAddress: {
      firstName: "Jan",
      lastName: "Kowalski",
      phone: "+48123456789",
      city: "New York",
      code: "",
      streetAddress1: "3111 Broadway",
      streetAddress2: "",
      postalCode: "10027",
      countryArea: "NY",
      country: {
        code: "US",
      },
      companyName: "",
    },
    userEmail: "test@saleor.io",
    lines: [createMockCheckoutLine()],
  });
};

export const createMockTransactionInitializeSessionSourceObjectOrder: CreateMockFn<
  OrderOrCheckoutSourceObject_Order_Fragment
> = (overrides) => {
  return merge(
    {
      __typename: "Order",
      id: "c29tZS1jaGVja291dC1pZA==",
      channel: { id: "1", slug: "default-channel" },
      languageCodeEnum: LanguageCodeEnum.PlPl,
      total: {
        gross: {
          amount: 99.99 + 123.0,
          currency: "PLN",
        },
      },
      deliveryMethod: {
        __typename: "ShippingMethod",
        id: "some-shipping-id",
        name: "some-shipping-name",
      },
      shippingPrice: {
        gross: {
          currency: "PLN",
          amount: 123.0,
        },
        net: {
          currency: "PLN",
          amount: 100.0,
        },
        tax: {
          currency: "PLN",
          amount: 23.0,
        },
      },
      billingAddress: {
        firstName: "John",
        lastName: "Smith",
        phone: "+48123456789",
        city: "Washington",
        code: "",
        streetAddress1: "1600 Ave NW",
        streetAddress2: "",
        postalCode: "20500",
        countryArea: "DC",
        country: {
          code: "US",
        },
        companyName: "",
      },
      shippingAddress: {
        firstName: "Jan",
        lastName: "Kowalski",
        phone: "+48123456789",
        city: "New York",
        code: "",
        streetAddress1: "3111 Broadway",
        streetAddress2: "",
        postalCode: "10027",
        countryArea: "NY",
        country: {
          code: "US",
        },
        companyName: "",
      },
      userEmail: "test@saleor.io",
      lines: [createMockOrderLine(overrides?.lines?.[0] as OrderLine | undefined)],
    },
    overrides,
  );
};

export const createMockTransactionInitializeSessionEvent: CreateMockAsyncFn<
  TransactionInitializeSessionEventFragment
> = async (overrides) => {
  return merge(
    {
      __typename: "TransactionInitializeSession",
      action: {
        __typename: "TransactionAction",
        amount: 99.99 + 123.0,
        currency: "PLN",
        actionType: TransactionFlowStrategyEnum.Charge,
      },
      merchantReference: "123123123",
      sourceObject: createMockTransactionInitializeSessionSourceObjectCheckout(),
      recipient: await createMockApp(overrides?.recipient),
      transaction: {
        __typename: "TransactionItem",
        id: "555555",
      },
      data: {} as JSONValue,
      issuingPrincipal: null,
    } as const,
    overrides,
  );
};

export const createMockTransactionProcessSessionEvent: CreateMockAsyncFn<
  TransactionProcessSessionEventFragment
> = async () => {
  return merge({
    __typename: "TransactionProcessSession",
    action: {
      __typename: "TransactionAction",
      amount: 99.99 + 123.0,
      currency: "PLN",
      actionType: TransactionFlowStrategyEnum.Charge,
    },
    merchantReference: "123123123",
    sourceObject: createMockTransactionInitializeSessionSourceObjectCheckout(),
    recipient: await createMockApp(),
    transaction: {
      __typename: "TransactionItem",
      id: "555555",
    },
    data: {} as JSONValue,
  } as const);
};
