import { SaleorAsyncWebhook } from "@saleor/app-sdk/handlers/next";
import { gql } from "urql";
import { OrderCreatedWebhookPayloadFragment } from "../../../../generated/graphql";
import { saleorApp } from "../../../saleor-app";

const OrderCreatedWebhookPayload = gql`
  fragment OrderCreatedWebhookPayload on OrderCreated {
    order {
      metadata {
        key
        value
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

const OrderCreatedGraphqlSubscription = gql`
  ${OrderCreatedWebhookPayload}
  subscription OrderCreated {
    event {
      ...OrderCreatedWebhookPayload
    }
  }
`;

export const orderCreatedWebhook = new SaleorAsyncWebhook<OrderCreatedWebhookPayloadFragment>({
  name: "Order Created in Saleor",
  webhookPath: "api/webhooks/order-created",
  event: "ORDER_CREATED",
  apl: saleorApp.apl,
  query: OrderCreatedGraphqlSubscription,
});

export default orderCreatedWebhook.createHandler((req, res, ctx) => {
  const { payload } = ctx;
  console.log("Order created with: ", payload);

  // https://www.shipstation.com/docs/api/orders/create-update-order/

  // To get the chosen Shipstation shipping method, decode the shipping method ID - eg app:saleor.app:usps_priority_mail_international
  // the last part of the shipping method ID can be used to create the Order in the API and later used for creating the label

  // send selected shipping method on order to your shipping provider API

  res.status(200).end();
});

export const config = {
  api: {
    bodyParser: false,
  },
};
