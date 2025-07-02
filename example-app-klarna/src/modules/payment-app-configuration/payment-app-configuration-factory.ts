import { type Client } from "urql";
import { type MetadataEntry } from "@saleor/app-sdk/settings-manager";
import {
  createPrivateSettingsManager,
  createWebhookPrivateSettingsManager,
} from "../app-configuration/metadata-manager";
import { PaymentAppConfigurator } from "./payment-app-configuration";

export const getPaymentAppConfigurator = (client: Client, saleorApiUrl: string) => {
  return new PaymentAppConfigurator(createPrivateSettingsManager(client), saleorApiUrl);
};

export const getWebhookPaymentAppConfigurator = (
  data: { privateMetadata: readonly Readonly<MetadataEntry>[] },
  saleorApiUrl: string,
) => {
  return new PaymentAppConfigurator(
    createWebhookPrivateSettingsManager(data.privateMetadata as MetadataEntry[]),
    saleorApiUrl,
  );
};
