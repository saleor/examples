import Pkg from "../../../package.json";
import { getNormalizedLocale } from "@/backend-lib/api-route-utils";
import { invariant } from "@/lib/invariant";
import { getSequraIntegerAmountFromSaleor } from "@/modules/sequra/currencies";
import {
  getLineItems,
  prepareRequestAddress,
  type SequraMetadata,
} from "@/modules/sequra/sequra-api";
import type { OrderCreateRequest } from "@/schemas/Sequra/OrderCreateRequest.mjs";
import {
  type CheckoutSourceObjectFragment,
  type OrderSourceObjectFragment,
} from "generated/graphql";

export function buildSequraCreateOrderPayload({
  sourceObject,
  returnUrl,
  appBaseUrl,
  saleorApiUrl,
  merchantId,
  customerIpAddress,
  transactionId,
  currency,
  amount,
  meta,
}: {
  sourceObject: { __typename: "Checkout" | "Order" } & (
    | OrderSourceObjectFragment
    | CheckoutSourceObjectFragment
  );
  returnUrl: string;
  appBaseUrl: string;
  saleorApiUrl: string;
  merchantId: string;
  customerIpAddress: string;
  transactionId: string;
  currency: string;
  amount: number;
  meta: {
    saleorVersion?: null | undefined | string;
  };
}) {
  const locale = getNormalizedLocale(sourceObject);

  const country = sourceObject.billingAddress?.country.code;
  invariant(country, "Missing country code");

  const channelId = sourceObject.channel.id;

  const metadata: SequraMetadata = {
    transactionId,
    channelId,
    ...(sourceObject.__typename === "Checkout" && { checkoutId: sourceObject.id }),
    ...(sourceObject.__typename === "Order" && { orderId: sourceObject.id }),
  };

  const notifyUrl = new URL(appBaseUrl);
  notifyUrl.pathname = "/api/webhooks/sequra/notify";
  notifyUrl.searchParams.set("transactionId", transactionId);
  notifyUrl.searchParams.set("channelId", channelId);
  notifyUrl.searchParams.set("saleorApiUrl", saleorApiUrl);
  notifyUrl.searchParams.set("returnUrl", returnUrl);

  // When SeQura approves the order, the shopper's browser will make a POST to this URL without arguments.
  // *Not used* when the integration is using IPN.
  // *Not used* when approved_callback is present.
  // Currently we don't use it
  // const approvedUrl = new URL(appBaseUrl);
  // approvedUrl.pathname = "/api/webhooks/sequra/approved";
  // approvedUrl.searchParams.set("transactionId", transactionId);
  // approvedUrl.searchParams.set("channelId", channelId);
  // approvedUrl.searchParams.set("saleorApiUrl", saleorApiUrl);
  // approvedUrl.searchParams.set("returnUrl", returnUrl);

  // SeQura will make a POST to this URL when an event happens for that order after confirmation.
  // Currently, we don't use it
  // const eventsWebhookUrl = new URL(appBaseUrl);
  // eventsWebhookUrl.pathname = "/api/webhooks/sequra/events-webhook";
  // eventsWebhookUrl.searchParams.set("transactionId", transactionId);
  // eventsWebhookUrl.searchParams.set("channelId", channelId);
  // eventsWebhookUrl.searchParams.set("saleorApiUrl", saleorApiUrl);
  // eventsWebhookUrl.searchParams.set("returnUrl", returnUrl);

  const uname = [
    process.platform,
    process.arch,
    process.release.name,
    process.version,
    process.release.lts,
  ]
    .filter(Boolean)
    .join(" ");

  const email = sourceObject.userEmail;
  const createSequraOrderPayload = {
    order: {
      state: "",
      merchant_reference: {
        order_ref_1: sourceObject.id,
        order_ref_2: transactionId,
      },
      merchant: {
        id: merchantId,
        notify_url: notifyUrl.toString(),
        notification_parameters: metadata,
        // approved_url: approvedUrl.toString(),
        // events_webhook: {
        //   url: eventsWebhookUrl.toString(),
        //   parameters: metadata,
        // },
        return_url: returnUrl,
      },
      cart: {
        currency: currency,
        gift: false,
        order_total_with_tax: getSequraIntegerAmountFromSaleor(amount, currency),
        cart_ref: sourceObject.id,
        created_at: sourceObject.createdAt,
        updated_at: sourceObject.updatedAt,
        items: getLineItems(sourceObject),
      },
      delivery_method: {
        name:
          sourceObject.deliveryMethod?.__typename === "ShippingMethod"
            ? sourceObject.deliveryMethod.name
            : "Delivery",
      },
      delivery_address: prepareRequestAddress(sourceObject.shippingAddress, email),
      invoice_address: prepareRequestAddress(sourceObject.billingAddress, email),
      customer: {
        given_names: sourceObject.billingAddress?.firstName ?? "",
        surnames: sourceObject.billingAddress?.lastName ?? "",
        email: sourceObject.userEmail ?? "",
        logged_in: sourceObject.user ? true : false,
        language_code: locale.split("_")[0],
        ip_number: customerIpAddress || "",
        user_agent: "todo",
        ref: sourceObject.user?.id,
      },
      gui: {
        layout: "desktop",
      },
      platform: {
        name: "saleor",
        version: meta.saleorVersion || "unknown",
        plugin_version: Pkg.version,
        uname,
        db_name: "unknown",
        db_version: "unknown",
      },
    },
  } satisfies OrderCreateRequest;
  return createSequraOrderPayload;
}
