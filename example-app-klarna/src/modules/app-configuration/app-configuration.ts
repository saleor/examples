import {
  type SettingsValue,
  type MetadataEntry,
  type SettingsManager,
} from "@saleor/app-sdk/settings-manager";
import merge from "lodash-es/merge";
import { toStringOrEmpty } from "../../lib/utils";
import { filterConfigValues, obfuscateValue } from "./utils";
import { logger as pinoLogger } from "@/lib/logger";

export interface GenericAppConfigurator<TConfig extends Record<string, unknown>> {
  setConfig(config: TConfig): Promise<void>;
  getConfig(): Promise<TConfig | undefined>;
}

// Taken from @saleor/app-sdk/src/settings-manager
export const serializeSettingsToMetadata = ({
  key,
  value,
  domain,
}: SettingsValue): MetadataEntry => {
  // domain specific metadata use convention key__domain, e.g. `secret_key__example.com`
  if (!domain) {
    return { key, value };
  }

  return {
    key: [key, domain].join("__"),
    value,
  };
};

export abstract class MetadataConfigurator<TConfig extends Record<string, unknown>>
  implements GenericAppConfigurator<TConfig>
{
  constructor(
    protected metadataManager: SettingsManager,
    protected saleorApiUrl: string,
    protected metadataKey: string,
  ) {}

  async getConfig(): Promise<TConfig | undefined> {
    const data = await this.metadataManager.get(this.metadataKey, this.saleorApiUrl);
    if (!data) {
      return undefined;
    }

    try {
      return JSON.parse(data) as TConfig;
    } catch (e) {
      throw new Error("Invalid metadata value, cant be parsed");
    }
  }

  async getRawConfig(
    prepareValue: (val: string) => string = (data) => data,
  ): Promise<MetadataEntry[]> {
    const data = await this.metadataManager.get(this.metadataKey, this.saleorApiUrl);

    return [
      // metadataManager strips out domain from key, we need to add it back
      serializeSettingsToMetadata({
        key: this.metadataKey,
        value: prepareValue(data ?? ""),
        domain: this.saleorApiUrl,
      }),
    ];
  }

  async setConfig(newConfig: Partial<TConfig>, replace = false) {
    const logger = pinoLogger.child({
      saleorApiUrl: this.saleorApiUrl,
      metadataKey: this.metadataKey,
    });
    const filteredNewConfig = filterConfigValues(newConfig);
    if (Object.keys(filteredNewConfig).length === 0 && !replace) {
      logger.debug("No config to safe in metadata");
      return;
    }

    const existingConfig = replace ? {} : await this.getConfig();

    return this.metadataManager.set({
      key: this.metadataKey,
      value: JSON.stringify(merge(existingConfig, filteredNewConfig)),
      domain: this.saleorApiUrl,
    });
  }

  async clearConfig() {
    return this.metadataManager.set({
      key: this.metadataKey,
      value: "",
      domain: this.saleorApiUrl,
    });
  }
}

export class PublicMetadataAppConfiguration<
  TConfig extends Record<string, unknown>,
> extends MetadataConfigurator<TConfig> {}

export class PrivateMetadataAppConfigurator<
  TConfig extends Record<string, unknown>,
> extends MetadataConfigurator<TConfig> {
  constructor(metadataManager: SettingsManager, saleorApiUrl: string, metadataKey: string) {
    super(metadataManager, saleorApiUrl, metadataKey);
  }

  obfuscateConfig(config: TConfig): TConfig {
    const entries = Object.entries(config).map(([key, value]) => [
      key,
      obfuscateValue(toStringOrEmpty(value)),
    ]);

    return Object.fromEntries(entries) as TConfig;
  }

  async getConfigObfuscated(): Promise<TConfig | undefined> {
    const config = await this.getConfig();
    if (!config) {
      return undefined;
    }
    return this.obfuscateConfig(config);
  }
}
