import { vi, describe, it, expect } from "vitest";
import { PaymentAppConfigurator } from "../payment-app-configuration";
import { type ChannelMapping, paymentAppConfigSchema, type PaymentAppConfig } from "../app-config";
import { type PaymentAppConfigEntry } from "../config-entry";
import { configEntryRequired, configEntryAll } from "./mocks";
import { testEnv } from "@/__tests__/test-env.mjs";
import { type BrandedEncryptedMetadataManager } from "@/modules/app-configuration/metadata-manager";
import { type PrivateMetadataAppConfigurator } from "@/modules/app-configuration/app-configuration";
import { OBFUSCATION_DOTS } from "@/modules/app-configuration/utils";

describe("PaymentAppConfigurator", () => {
  const metadataManagerMock = {} as BrandedEncryptedMetadataManager;
  const saleorApiUrlMock = testEnv.TEST_SALEOR_API_URL;
  const configuratorMock = {
    setConfig: vi.fn(async () => {}),
    getConfig: vi.fn(async () => undefined),
  } as unknown as PrivateMetadataAppConfigurator<any>;
  const appConfigurator = new PaymentAppConfigurator(metadataManagerMock, saleorApiUrlMock);
  appConfigurator["configurator"] = configuratorMock;

  describe("getConfig", () => {
    const defaultConfig = { configurations: [], channelToConfigurationId: {}, lastMigration: null };
    it("should call the configurator and return value that matches schema", async () => {
      const getConfig = vi.spyOn(configuratorMock, "getConfig").mockResolvedValue(defaultConfig);

      const config = await appConfigurator.getConfig();
      expect(getConfig).toHaveBeenCalled();
      expect(config).toEqual(defaultConfig);
    });

    it("if configurator returns undefined it should provide a default config", async () => {
      const getConfig = vi.spyOn(configuratorMock, "getConfig").mockResolvedValue(undefined);

      const config = await appConfigurator.getConfig();
      expect(getConfig).toHaveBeenCalled();
      expect(config).toEqual(defaultConfig);
    });
  });

  describe("getConfigObfuscated", () => {
    it("should obfuscate configurations and keep channelToConfigurationId as is", async () => {
      const mockConfig = {
        configurations: [configEntryRequired],
        channelToConfigurationId: { "channel-1": "mock-id" },
      } satisfies PaymentAppConfig;
      const getConfig = vi.spyOn(appConfigurator, "getConfig").mockResolvedValue(mockConfig);

      const obfuscatedConfig = await appConfigurator.getConfigObfuscated();

      expect(getConfig).toHaveBeenCalled();
      expect(obfuscatedConfig).toEqual({
        configurations: [
          {
            configurationId: "mock-id",
            configurationName: "test",
            apiUrl: "https://api.playground.klarna.com/",
            username: "username",
            password: `${OBFUSCATION_DOTS}word`,
          },
        ],
        channelToConfigurationId: mockConfig.channelToConfigurationId,
      } satisfies PaymentAppConfig);
    });
  });

  describe("setConfigEntry", () => {
    it("should update app config with new config entry added to list of config entries", async () => {
      const newConfigEntry: PaymentAppConfigEntry = {
        ...configEntryRequired,
        configurationId: "new-mock-id",
      };
      const existingConfig: PaymentAppConfig = {
        configurations: [configEntryRequired],
        channelToConfigurationId: {},
      };

      const getConfig = vi.spyOn(appConfigurator, "getConfig").mockResolvedValue(existingConfig);
      const setConfig = vi.spyOn(appConfigurator, "setConfig");

      await appConfigurator.setConfigEntry(newConfigEntry);

      expect(getConfig).toHaveBeenCalled();
      expect(setConfig).toHaveBeenCalledWith({
        configurations: [configEntryRequired, newConfigEntry],
      });
    });

    it("should update app config with update config entry changed in list of config entries", async () => {
      const updateConfigEntry: PaymentAppConfigEntry = {
        ...configEntryAll,
        configurationId: "new-mock-id",
      };
      const existingConfig: PaymentAppConfig = {
        configurations: [
          configEntryRequired,
          { ...configEntryRequired, configurationId: "new-mock-id" },
        ],
        channelToConfigurationId: {},
      };

      const getConfig = vi.spyOn(appConfigurator, "getConfig").mockResolvedValue(existingConfig);
      const setConfig = vi.spyOn(appConfigurator, "setConfig");

      await appConfigurator.setConfigEntry(updateConfigEntry);

      expect(getConfig).toHaveBeenCalled();
      expect(setConfig).toHaveBeenCalledWith({
        configurations: [configEntryRequired, updateConfigEntry],
      });
    });
  });

  describe("deleteConfigEntry", () => {
    it("should call setConfig without the deleted configurationId", async () => {
      const existingConfig: PaymentAppConfig = {
        configurations: [configEntryRequired],
        channelToConfigurationId: {},
      };

      const getConfig = vi.spyOn(appConfigurator, "getConfig").mockResolvedValue(existingConfig);
      const setConfig = vi.spyOn(appConfigurator, "setConfig");

      await appConfigurator.deleteConfigEntry(configEntryRequired.configurationId);

      expect(getConfig).toHaveBeenCalled();
      expect(setConfig).toHaveBeenCalledWith(
        { channelToConfigurationId: {}, configurations: [] },
        true,
      );
    });
  });

  describe("setMapping", () => {
    it("should call setConfig with new mapping", async () => {
      const newMapping: ChannelMapping = { "channel-2": "new-mock-id" };
      const existingConfig: PaymentAppConfig = { configurations: [], channelToConfigurationId: {} };

      const getConfig = vi.spyOn(appConfigurator, "getConfig").mockResolvedValue(existingConfig);
      const setConfig = vi.spyOn(appConfigurator, "setConfig");

      await appConfigurator.setMapping(newMapping);

      expect(getConfig).toHaveBeenCalled();
      expect(setConfig).toHaveBeenCalledWith({
        channelToConfigurationId: newMapping,
      });
    });

    it("should call setConfig with merged mappings", async () => {
      const existingMapping: ChannelMapping = { "channel-1": "old-mock-id" };
      const newMapping: ChannelMapping = { "channel-2": "new-mock-id" };
      const existingConfig: PaymentAppConfig = {
        configurations: [],
        channelToConfigurationId: { ...existingMapping },
      };

      const getConfig = vi.spyOn(appConfigurator, "getConfig").mockResolvedValue(existingConfig);
      const setConfig = vi.spyOn(appConfigurator, "setConfig");

      await appConfigurator.setMapping(newMapping);

      expect(getConfig).toHaveBeenCalled();
      expect(setConfig).toHaveBeenCalledWith({
        channelToConfigurationId: { ...existingMapping, ...newMapping },
      });
    });
  });

  describe("deleteMapping", () => {
    it("should call setConfig without the deleted channelId", async () => {
      const existingMapping: ChannelMapping = { "channel-1": "existing-mock-id" };
      const existingConfig: PaymentAppConfig = {
        configurations: [],
        channelToConfigurationId: existingMapping,
      };

      const getConfig = vi.spyOn(appConfigurator, "getConfig").mockResolvedValue(existingConfig);
      const setConfig = vi.spyOn(appConfigurator, "setConfig");

      await appConfigurator.deleteMapping("channel-1");

      expect(getConfig).toHaveBeenCalled();
      expect(setConfig).toHaveBeenCalledWith({ channelToConfigurationId: {} });
    });
  });

  describe("setConfig", () => {
    it("should call setConfig on configurator", async () => {
      const newConfig: Partial<PaymentAppConfig> = {
        configurations: [],
        channelToConfigurationId: {},
      };
      const setConfig = vi.spyOn(configuratorMock, "setConfig");

      await appConfigurator.setConfig(newConfig);

      expect(setConfig).toHaveBeenCalledWith(newConfig, false);
    });

    it("should call setConfig with replace = true", async () => {
      const newConfig: Partial<PaymentAppConfig> = {
        configurations: [],
        channelToConfigurationId: {},
      };
      const setConfig = vi.spyOn(configuratorMock, "setConfig");

      await appConfigurator.setConfig(newConfig, true);

      expect(setConfig).toHaveBeenCalledWith(newConfig, true);
    });
  });

  describe("clearConfig", () => {
    it("should call setConfig on configurator with replace parameter set to true", async () => {
      const defaultConfig = paymentAppConfigSchema.parse(undefined);
      const setConfig = vi.spyOn(configuratorMock, "setConfig");

      await appConfigurator.clearConfig();

      expect(setConfig).toHaveBeenCalledWith(defaultConfig, true);
    });
  });
});
