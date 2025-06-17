import { SALEOR_API_URL_HEADER } from "@saleor/app-sdk/const";
import {
  NextWebhookApiHandler,
  SaleorAsyncWebhook,
} from "@saleor/app-sdk/handlers/next";
import { createGraphQLClient } from "../../../lib/create-graphql-client";
import { gql } from "urql";
import {
  InvoiceRequestedPayloadFragment,
  OrderPayloadFragment,
} from "../../../../generated/graphql";
import { AddressV2Shape } from "../../../modules/app-configuration/schema-v2/app-config-schema.v2";
import { GetAppConfigurationV2Service } from "../../../modules/app-configuration/schema-v2/get-app-configuration.v2.service";
import { InvoiceCreateNotifier } from "../../../modules/invoices/invoice-create-notifier/invoice-create-notifier";
import { hashInvoiceFilename } from "../../../modules/invoices/invoice-file-name/hash-invoice-filename";
import { resolveTempPdfFileLocation } from "../../../modules/invoices/invoice-file-name/resolve-temp-pdf-file-location";
import { MicroinvoiceInvoiceGenerator } from "../../../modules/invoices/invoice-generator/microinvoice/microinvoice-invoice-generator";
import {
  InvoiceNumberGenerationStrategy,
  InvoiceNumberGenerator,
} from "../../../modules/invoices/invoice-number-generator/invoice-number-generator";
import { SaleorInvoiceUploader } from "../../../modules/invoices/invoice-uploader/saleor-invoice-uploader";
import { ShopInfoFetcher } from "../../../modules/shop-info/shop-info-fetcher";
import { shopInfoQueryToAddressShape } from "../../../modules/shop-info/shop-info-query-to-address-shape";
import { saleorApp } from "../../../saleor-app";

import { createLogger } from "../../../logger";
import { loggerContext, wrapWithLoggerContext } from "../../../logger-context";
import { AppConfigV2 } from "../../../modules/app-configuration/schema-v2/app-config";

const OrderPayload = gql`
  fragment Address on Address {
    id
    country {
      country
      code
    }
    companyName
    cityArea
    countryArea
    streetAddress1
    streetAddress2
    postalCode
    phone
    firstName
    lastName
    city
  }

  fragment Money on Money {
    amount
    currency
  }

  fragment TaxedMoney on TaxedMoney {
    currency
    gross {
      ...Money
    }
    net {
      ...Money
    }
    tax {
      ...Money
    }
  }

  fragment OrderPayload on Order {
    shippingPrice {
      ...TaxedMoney
    }
    shippingMethodName
    number

    id
    billingAddress {
      ...Address
    }
    created
    fulfillments {
      created
    }
    status
    number
    total {
      ...TaxedMoney
    }
    channel {
      slug
    }
    lines {
      productName
      variantName
      quantity
      totalPrice {
        ...TaxedMoney
      }
    }
    shippingPrice {
      ...TaxedMoney
    }
    shippingMethodName
  }
`;

export const InvoiceCreatedPayloadFragment = gql`
  ${OrderPayload}

  fragment InvoiceRequestedPayload on InvoiceRequested {
    invoice {
      id
    }
    order {
      ... on Order {
        ...OrderPayload
      }
    }
  }
`;

const InvoiceRequestedSubscription = gql`
  ${InvoiceCreatedPayloadFragment}

  subscription InvoiceRequested {
    event {
      ...InvoiceRequestedPayload
    }
  }
`;

const logger = createLogger("InvoiceRequestedAsyncWebhook");

export const invoiceRequestedWebhook =
  new SaleorAsyncWebhook<InvoiceRequestedPayloadFragment>({
    name: "Invoice requested",
    webhookPath: "api/webhooks/invoice-requested",
    event: "INVOICE_REQUESTED",
    apl: saleorApp.apl,
    query: InvoiceRequestedSubscription,
    onError(error, req, res) {
      const saleorApiUrl = req.headers[SALEOR_API_URL_HEADER] as string;

      logger.error("Error during webhook handling", { error, saleorApiUrl });
    },
  });

const invoiceNumberGenerator = new InvoiceNumberGenerator();

/**
 * TODO
 * Refactor - extract smaller pieces
 * Test
 * More logs
 * Extract service
 */
export const handler: NextWebhookApiHandler<
  InvoiceRequestedPayloadFragment
> = async (req, res, context) => {
  const { authData, payload, baseUrl } = context;

  loggerContext.set("saleorApiUrl", authData.saleorApiUrl);

  const order = payload.order;

  logger.info({ orderId: order.id }, "Received event INVOICE_REQUESTED");
  logger.debug(order, "Order from payload:");

  const orderId = order.id;
  /**
   * TODO -> should generate from generation date or order date?
   */
  const invoiceName = invoiceNumberGenerator.generateFromOrder(
    order as OrderPayloadFragment,
    InvoiceNumberGenerationStrategy.localizedDate("en-US"), // todo connect locale -> where from?
  );

  logger.debug({ invoiceName }, "Generated invoice name");

  try {
    const client = createGraphQLClient({
      saleorApiUrl: authData.saleorApiUrl,
      token: authData.token,
    });

    const hashedInvoiceName = hashInvoiceFilename(invoiceName, orderId);

    logger.debug({ hashedInvoiceName });

    const hashedInvoiceFileName = `${hashedInvoiceName}.pdf`;
    const tempPdfLocation = await resolveTempPdfFileLocation(
      hashedInvoiceFileName,
    );

    logger.debug(
      { tempPdfLocation },
      "Resolved PDF location for temporary files",
    );

    let appConfigV2 =
      (await new GetAppConfigurationV2Service({
        saleorApiUrl: authData.saleorApiUrl,
        apiClient: client,
      }).getConfiguration()) ?? new AppConfigV2();

    const address: AddressV2Shape | null =
      appConfigV2.getChannelsOverrides()[order.channel.slug] ??
      (await new ShopInfoFetcher(client)
        .fetchShopInfo()
        .then(shopInfoQueryToAddressShape));

    if (!address) {
      // todo disable webhook
      return res.status(200).end("App not configured");
    }

    await new MicroinvoiceInvoiceGenerator()
      .generate({
        order,
        invoiceNumber: invoiceName,
        filename: tempPdfLocation,
        companyAddressData: address,
      })
      .catch((err) => {
        logger.error(err, "Error generating invoice");

        return res.status(500).json({
          error: "Error generating invoice",
        });
      });

    const uploader = new SaleorInvoiceUploader(client);

    const uploadedFileUrl = await uploader.upload(
      tempPdfLocation,
      `${invoiceName}.pdf`,
    );

    logger.info("Uploaded file to storage, will notify Saleor now");
    logger.debug({ uploadedFileUrl });

    await new InvoiceCreateNotifier(client).notifyInvoiceCreated(
      orderId,
      invoiceName,
      uploadedFileUrl,
    );
  } catch (e) {
    logger.error(e);

    return res.status(500).json({
      error: (e as any)?.message ?? "Error",
    });
  }

  logger.info("Success");

  return res.status(200).end();
};

export default wrapWithLoggerContext(
  invoiceRequestedWebhook.createHandler(handler),
  loggerContext,
);

export const config = {
  api: {
    bodyParser: false,
  },
};
