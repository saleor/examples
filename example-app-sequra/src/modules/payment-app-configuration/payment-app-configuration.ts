import { encrypt, type MetadataEntry } from "@saleor/app-sdk/settings-manager";
import {
  type GenericAppConfigurator,
  PrivateMetadataAppConfigurator,
} from "../app-configuration/app-configuration";
import { type BrandedEncryptedMetadataManager } from "../app-configuration/metadata-manager";
import { type PaymentAppConfig, paymentAppConfigSchema, type ChannelMapping } from "./app-config";
import { type PaymentAppConfigEntry } from "./config-entry";
import { obfuscateConfigEntry } from "./utils";
import { env } from "@/lib/env.mjs";
import { BaseError } from "@/errors";
import { createLogger } from "@/lib/logger";

export const privateMetadataKey = "payment-app-config-private";
export const hiddenMetadataKey = "payment-app-config-hidden";
export const publicMetadataKey = "payment-app-config-public";

export const AppNotConfiguredError = BaseError.subclass("AppNotConfiguredError");

export class PaymentAppConfigurator implements GenericAppConfigurator<PaymentAppConfig> {
  private configurator: PrivateMetadataAppConfigurator<PaymentAppConfig>;
  public saleorApiUrl: string;

  constructor(privateMetadataManager: BrandedEncryptedMetadataManager, saleorApiUrl: string) {
    this.configurator = new PrivateMetadataAppConfigurator(
      privateMetadataManager,
      saleorApiUrl,
      privateMetadataKey,
    );
    this.saleorApiUrl = saleorApiUrl;
  }

  async getConfig(): Promise<PaymentAppConfig> {
    const config = await this.configurator.getConfig();
    return paymentAppConfigSchema.parse(config);
  }

  async getConfigObfuscated() {
    const { configurations, channelToConfigurationId } = await this.getConfig();

    return {
      configurations: configurations.map((entry) => obfuscateConfigEntry(entry)),
      channelToConfigurationId,
    };
  }

  async getRawConfig(): Promise<MetadataEntry[]> {
    const encryptFn = (data: string) => encrypt(data, env.SECRET_KEY);

    return this.configurator.getRawConfig(encryptFn);
  }

  async getConfigEntry(configurationId: string): Promise<PaymentAppConfigEntry | null | undefined> {
    const config = await this.configurator.getConfig();
    return config?.configurations.find((entry) => entry.configurationId === configurationId);
  }

  /** Adds new config entry or updates existing one */
  async setConfigEntry(newConfiguration: PaymentAppConfigEntry) {
    const { configurations } = await this.getConfig();

    const existingEntryIndex = configurations.findIndex(
      (entry) => entry.configurationId === newConfiguration.configurationId,
    );

    if (existingEntryIndex !== -1) {
      const existingEntry = configurations[existingEntryIndex];
      const mergedEntry = {
        ...existingEntry,
        ...newConfiguration,
      };

      const newConfigurations = configurations.slice(0);
      newConfigurations[existingEntryIndex] = mergedEntry;
      return this.setConfig({ configurations: newConfigurations });
    }

    return this.setConfig({
      configurations: [...configurations, newConfiguration],
    });
  }

  async deleteConfigEntry(configurationId: string) {
    const oldConfig = await this.getConfig();
    const newConfigurations = oldConfig.configurations.filter(
      (entry) => entry.configurationId !== configurationId,
    );
    const newMappings = Object.fromEntries(
      Object.entries(oldConfig.channelToConfigurationId).filter(
        ([, configId]) => configId !== configurationId,
      ),
    );
    await this.setConfig(
      { ...oldConfig, configurations: newConfigurations, channelToConfigurationId: newMappings },
      true,
    );
  }

  /** Adds new mappings or updates exsting ones */
  async setMapping(newMapping: ChannelMapping) {
    const { channelToConfigurationId } = await this.getConfig();
    return this.setConfig({
      channelToConfigurationId: { ...channelToConfigurationId, ...newMapping },
    });
  }

  async deleteMapping(channelId: string) {
    const { channelToConfigurationId } = await this.getConfig();
    const newMapping = { ...channelToConfigurationId };
    delete newMapping[channelId];
    return this.setConfig({ channelToConfigurationId: newMapping });
  }

  /** Method that directly updates the config in MetadataConfigurator.
   *  You should probably use setConfigEntry or setMapping instead */
  async setConfig(newConfig: Partial<PaymentAppConfig>, replace = false) {
    return this.configurator.setConfig(newConfig, replace);
  }

  async clearConfig() {
    const defaultConfig = paymentAppConfigSchema.parse(undefined);
    return this.setConfig(defaultConfig, true);
  }
}

export const getConfigurationForChannel = (
  appConfig: PaymentAppConfig,
  channelId?: string | undefined | null,
) => {
  const logger = createLogger({ channelId }, { msgPrefix: "[getConfigurationForChannel] " });
  if (!channelId) {
    logger.warn("Missing channelId");
    return null;
  }

  const configurationId = appConfig.channelToConfigurationId[channelId];
  if (!configurationId) {
    logger.warn(`Missing mapping for channelId ${channelId}`);
    return null;
  }

  const perChannelConfig = appConfig.configurations.find(
    (config) => config.configurationId === configurationId,
  );
  if (!perChannelConfig) {
    logger.warn({ configurationId }, "Missing configuration for configurationId");
    return null;
  }
  return perChannelConfig;
};
