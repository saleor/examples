import { SaleorSyncWebhook } from "@saleor/app-sdk/handlers/next";
import { gql } from "urql";
import { ShippingListMethodsPayloadFragment } from "../../../../generated/graphql";
import { ENV_CONFIG } from "../../../env-config";
import { logger } from "../../../lib/logger";
import { CheckoutShippingMethodService } from "../../../checkout-shipping-method.service";
import { saleorApp } from "../../../saleor-app";
import { ShipStationApiClient } from "../../../modules/shipstation/api/shipstation-api-client";

const CheckoutLine = gql`
  fragment CheckoutLine on CheckoutLine {
    id
    variant {
      weight {
        unit
        value
      }
      product {
        packageSize: attribute(slug: "package-size") {
          values {
            slug
          }
        }
      }
    }
  }
`;

const ShippingListMethodsPayload = gql`
  ${CheckoutLine}
  fragment ShippingListMethodsPayload on ShippingListMethodsForCheckout {
    checkout {
      lines {
        ...CheckoutLine
      }
      shippingAddress {
        postalCode
        country {
          code
        }
        phone
      }
      deliveryMethod {
        ... on ShippingMethod {
          id
          name
        }
      }
    }
  }
`;

const ShippingListMethodsForCheckoutSubscription = gql`
  ${ShippingListMethodsPayload}
  subscription ShippingListMethodsForCheckout {
    event {
      ...ShippingListMethodsPayload
    }
  }
`;

export const shippingListMethodsForCheckoutWebhook =
  new SaleorSyncWebhook<ShippingListMethodsPayloadFragment>({
    name: "Shipping List Methods for Checkout",
    webhookPath: "api/webhooks/shipping-list-methods-for-checkout",
    event: "SHIPPING_LIST_METHODS_FOR_CHECKOUT",
    apl: saleorApp.apl,
    query: ShippingListMethodsForCheckoutSubscription,
  });

export default shippingListMethodsForCheckoutWebhook.createHandler(async (req, res, ctx) => {
  const { payload } = ctx;
  logger.info(payload, "Shipping List Methods for Checkout Webhook called with: ");

  const carrierCodes = ENV_CONFIG.CARRIER_CODES;
  const fromPostalCode = ENV_CONFIG.FROM_POSTAL_CODE;

  const apiClient = new ShipStationApiClient({
    apiKey: ENV_CONFIG.SHIPSTATION_API_KEY,
    apiSecret: ENV_CONFIG.SHIPSTATION_API_SECRET,
  });

  try {
    const checkout = payload.checkout;

    if (!checkout) {
      throw new Error("No checkout found in payload");
    }

    const shippingAddress = checkout.shippingAddress;

    if (!shippingAddress) {
      throw new Error("No shipping address found in checkout");
    }

    const lines = checkout.lines;
    const toCountryCode = shippingAddress.country.code;
    const toPostalCode = shippingAddress.postalCode;

    const checkoutService = new CheckoutShippingMethodService(apiClient);

    const saleorShippingMethods = await checkoutService.getShippingMethodsForCheckout({
      lines,
      toCountryCode,
      toPostalCode,
      carrierCodes,
      fromPostalCode,
    });

    logger.debug({ saleorShippingMethods }, "Responding to Saleor with shipping methods: ");

    return res.status(200).json(saleorShippingMethods);
  } catch (error) {
    logger.error(error, "Error fetching shipping methods");

    return res.status(500).json({ error: "Error fetching shipping methods" });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};
