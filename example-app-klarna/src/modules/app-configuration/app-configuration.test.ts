import { type MetadataEntry } from "@saleor/app-sdk/settings-manager";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  PrivateMetadataAppConfigurator,
  PublicMetadataAppConfiguration,
  serializeSettingsToMetadata,
} from "./app-configuration";
import {
  createWebhookPrivateSettingsManager,
  createWebhookPublicSettingsManager,
} from "./metadata-manager";
import { obfuscateValue, filterConfigValues, OBFUSCATION_DOTS } from "./utils";
import { testEnv } from "@/__tests__/test-env.mjs";

describe("obfuscateValue", () => {
  it("obfuscates fully short values", () => {
    expect(obfuscateValue("123")).toEqual(OBFUSCATION_DOTS);
    expect(obfuscateValue("")).toEqual(OBFUSCATION_DOTS);
    expect(obfuscateValue("1234")).toEqual(OBFUSCATION_DOTS);
  });

  it("leaves 4 charts of obfuscated value visible", () => {
    expect(obfuscateValue("12345")).toBe(`${OBFUSCATION_DOTS}5`);
    expect(obfuscateValue("123456")).toBe(`${OBFUSCATION_DOTS}56`);
    expect(obfuscateValue("1234567")).toBe(`${OBFUSCATION_DOTS}567`);
    expect(obfuscateValue("12345678")).toBe(`${OBFUSCATION_DOTS}5678`);
    expect(obfuscateValue("123456789")).toBe(`${OBFUSCATION_DOTS}6789`);
  });
});

describe("filterConfigValues", () => {
  it("filters out null and undefined values", () => {
    expect(filterConfigValues({ a: 1, b: null, c: undefined })).toEqual({ a: 1 });
  });
});

describe("PublicMetadataAppConfigurator", () => {
  const onUpdate = vi.fn((update: MetadataEntry[]) => Promise.resolve(update));

  beforeEach(() => {
    onUpdate.mockClear();
  });

  const KEY = "some-metadata";

  const getMetadata = (value?: unknown) => {
    return serializeSettingsToMetadata({
      key: KEY,
      domain: testEnv.TEST_SALEOR_API_URL,
      value: value ? JSON.stringify(value) : "",
    });
  };
  const defaultMetadata = { a: "a" };

  const managerEmpty = new PublicMetadataAppConfiguration(
    createWebhookPublicSettingsManager([], onUpdate),
    testEnv.TEST_SALEOR_API_URL,
    KEY,
  );

  // make tests easier
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let manager: PublicMetadataAppConfiguration<any>;
  beforeEach(() => {
    manager = new PublicMetadataAppConfiguration(
      createWebhookPublicSettingsManager([getMetadata(defaultMetadata)], onUpdate),
      testEnv.TEST_SALEOR_API_URL,
      "some-metadata",
    );
  });

  it("gets metadata from metadataManager and parses it", async () => {
    await expect(manager.getConfig()).resolves.toEqual(defaultMetadata);
    await expect(managerEmpty.getConfig()).resolves.toBeUndefined();
  });

  it("gets metadata in raw config form", async () => {
    await expect(manager.getRawConfig()).resolves.toEqual([getMetadata(defaultMetadata)]);
    await expect(managerEmpty.getRawConfig()).resolves.toEqual([getMetadata()]);
  });

  describe("setConfig", () => {
    it("skips saving metadata if there is nothing new", async () => {
      await manager.setConfig({});
      expect(onUpdate).not.toHaveBeenCalled();
    });

    it("replaces metadata if param is passed", async () => {
      await manager.setConfig({}, true);
      expect(onUpdate).toHaveBeenCalledWith([
        serializeSettingsToMetadata({
          key: "some-metadata",
          value: JSON.stringify({}),
          domain: testEnv.TEST_SALEOR_API_URL,
        }),
      ]);

      await manager.setConfig({ b: "b" }, true);
      expect(onUpdate).toHaveBeenCalledWith([getMetadata({ b: "b" })]);
    });

    it("saves only settings that have values", async () => {
      await managerEmpty.setConfig({ a: null, b: "b", c: undefined });
      expect(onUpdate).toHaveBeenCalledWith([getMetadata({ b: "b" })]);
    });

    it("merges new settings with existing ones", async () => {
      await manager.setConfig({ b: "b" });
      expect(onUpdate).toHaveBeenCalledWith([getMetadata({ a: "a", b: "b" })]);
    });
  });

  it("clears metadata", async () => {
    await manager.clearConfig();
    expect(onUpdate).toHaveBeenCalledWith([
      serializeSettingsToMetadata({
        key: "some-metadata",
        value: "",
        domain: testEnv.TEST_SALEOR_API_URL,
      }),
    ]);
  });
});

describe("PrivateMetadataAppConfigurator", () => {
  const metadataConfigurator = new PrivateMetadataAppConfigurator(
    createWebhookPublicSettingsManager([
      serializeSettingsToMetadata({
        key: "some-metadata",
        value: JSON.stringify({ a: "123456", b: "1234" }),
        domain: testEnv.TEST_SALEOR_API_URL,
      }),
    ]),
    testEnv.TEST_SALEOR_API_URL,
    "some-metadata",
  );

  it("can obfuscate provided config object", () => {
    expect(metadataConfigurator.obfuscateConfig({ a: "12345" })).toEqual({
      a: `${OBFUSCATION_DOTS}5`,
    });
  });

  it("returns empty config when none is set", async () => {
    const emptyMetadataConfigurator = new PrivateMetadataAppConfigurator(
      createWebhookPrivateSettingsManager([]),
      testEnv.TEST_SALEOR_API_URL,
      "some-metadata",
    );
    await expect(emptyMetadataConfigurator.getConfigObfuscated()).resolves.toBeUndefined();
  });

  it("can obfuscate its own config", async () => {
    await expect(metadataConfigurator.getConfigObfuscated()).resolves.toEqual({
      a: `${OBFUSCATION_DOTS}56`,
      b: OBFUSCATION_DOTS,
    });
  });
});
