import { encrypt, type MetadataEntry } from "@saleor/app-sdk/settings-manager";
import {
  type BrandedEncryptedMetadataManager,
  type BrandedMetadataManager,
  createWebhookPrivateSettingsManager,
} from "../../app-configuration/metadata-manager";
import { serializeSettingsToMetadata } from "../../app-configuration/app-configuration";
import { PaymentAppConfigurator, privateMetadataKey } from "../payment-app-configuration";
import { type PaymentAppConfig } from "../app-config";
import { env } from "@/lib/env.mjs";

export type MetadataManagerOverride = {
  private?: (metadata: MetadataEntry[]) => BrandedEncryptedMetadataManager;
  public?: (metadata: MetadataEntry[]) => BrandedMetadataManager;
};

export const getFakePaymentAppConfigurator = (
  config: PaymentAppConfig,
  saleorApiUrl: string,
  metadataManager?: MetadataManagerOverride,
) => {
  const privateConfigEntries: MetadataEntry[] = [
    serializeSettingsToMetadata({
      key: privateMetadataKey,
      value: encrypt(JSON.stringify(config), env.SECRET_KEY),
      domain: saleorApiUrl,
    }),
  ];

  const getPrivateSettingsManager = () => {
    if (metadataManager?.private) {
      return metadataManager.private(privateConfigEntries);
    }
    return createWebhookPrivateSettingsManager(privateConfigEntries);
  };

  return new PaymentAppConfigurator(getPrivateSettingsManager(), saleorApiUrl);
};
