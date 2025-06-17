import { obfuscateConfig } from "../app-configuration/utils";
import {
  type PaymentAppConfigEntry,
  type PaymentAppEncryptedConfig,
  type PaymentAppUserVisibleConfigEntry,
  paymentAppUserVisibleConfigEntrySchema,
} from "./config-entry";

export const obfuscateConfigEntry = (
  entry: PaymentAppConfigEntry,
): PaymentAppUserVisibleConfigEntry => {
  const { apiUrl, username, password, assetsKey, configurationName, configurationId, merchantId } =
    entry;

  const configValuesToObfuscate = {
    password,
    assetsKey,
  } satisfies PaymentAppEncryptedConfig;

  return paymentAppUserVisibleConfigEntrySchema.parse({
    apiUrl,
    username,
    configurationId,
    configurationName,
    merchantId,
    ...obfuscateConfig(configValuesToObfuscate),
  } satisfies PaymentAppUserVisibleConfigEntry);
};
