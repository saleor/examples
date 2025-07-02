/* eslint-disable @typescript-eslint/unbound-method */
import { describe, it, expect, vi } from "vitest";
import { OBFUSCATION_DOTS } from "../app-configuration/utils";
import {
  addConfigEntry,
  updateConfigEntry,
  EntryNotFoundError,
  deleteConfigEntry,
  getConfigEntryObfuscated,
  getAllConfigEntriesObfuscated,
} from "./config-manager";
import { configEntryAll } from "./__tests__/mocks";
import { obfuscateConfigEntry } from "./utils";
import { type ConfigEntryUpdate } from "./input-schemas";
import { type PaymentAppConfigurator } from "./payment-app-configuration";
import { type PaymentAppFormConfigEntry } from "./config-entry";
import { testEnv } from "@/__tests__/test-env.mjs";

const mockConfigurator = {
  getConfig: vi.fn(async () => ({ configurations: [configEntryAll] })),
  getConfigObfuscated: vi.fn(async () => ({
    configurations: [obfuscateConfigEntry(configEntryAll)],
  })),
  setConfigEntry: vi.fn(async () => {}),
  saleorApiUrl: testEnv.TEST_SALEOR_API_URL,
  deleteConfigEntry: vi.fn(async () => {}),
} as unknown as PaymentAppConfigurator;

describe("getAllConfigEntriesObfuscated", () => {
  it("calls configurator and returns data", async () => {
    const entries = await getAllConfigEntriesObfuscated(mockConfigurator);

    expect(entries).toEqual([obfuscateConfigEntry(configEntryAll)]);
    expect(mockConfigurator.getConfigObfuscated).toHaveBeenCalledTimes(1);
  });
});

describe("findConfigEntry", () => {
  it("calls getAllConfigEntriesObfuscated and finds entry with provided ID", async () => {
    const entry = await getConfigEntryObfuscated(configEntryAll.configurationId, mockConfigurator);

    expect(entry).toEqual(obfuscateConfigEntry(configEntryAll));
    expect(mockConfigurator.getConfigObfuscated).toHaveBeenCalledTimes(1);
  });
});

describe("addConfigEntry", () => {
  it("generates random id for new config entry, saves config entry in configurator, returns new config entry which has obfuscated fields", async () => {
    const input: PaymentAppFormConfigEntry = {
      configurationName: "new-config",
      password: "new-key",
      username: "client-key",
      apiUrl: "https://api.playground.klarna.com/",
    };
    const result = await addConfigEntry(input, mockConfigurator);

    expect(result).toStrictEqual({
      apiUrl: "https://api.playground.klarna.com/",
      configurationName: input.configurationName,
      password: `${OBFUSCATION_DOTS}key`,
      configurationId: expect.any(String),
      username: expect.any(String),
    });
    expect(mockConfigurator.setConfigEntry).toHaveBeenCalledTimes(1);
  });
});

describe("updateConfigEntry", () => {
  it("checks if entry exists, updates entry in configurator", async () => {
    const input = {
      configurationId: configEntryAll.configurationId,
      entry: {
        configurationName: "new-name",
        password: "updated-password",
        username: configEntryAll.username,
      },
    } satisfies ConfigEntryUpdate;

    const result = await updateConfigEntry(input, mockConfigurator);

    expect(result).toEqual(
      obfuscateConfigEntry({
        ...configEntryAll,
        configurationName: "new-name",
      }),
    );
    expect(mockConfigurator.setConfigEntry).toHaveBeenCalledWith({
      ...input.entry,
      configurationId: input.configurationId,
    });
  });

  it("throws an error if config entry is not found", async () => {
    const input = {
      configurationId: "non-existing-id",
      entry: {
        configurationName: configEntryAll.configurationName,
        password: "updated-key",
      },
    } satisfies ConfigEntryUpdate;

    await expect(updateConfigEntry(input, mockConfigurator)).rejects.toThrow(EntryNotFoundError);
  });
});

describe("deleteConfigEntry", () => {
  it("checks if entry exists, deletes entry in configurator", async () => {
    const result = await deleteConfigEntry(configEntryAll.configurationId, mockConfigurator);

    expect(result).toBeUndefined();
    expect(mockConfigurator.getConfig).toHaveBeenCalledOnce();
    expect(mockConfigurator.deleteConfigEntry).toHaveBeenCalledWith(configEntryAll.configurationId);
  });

  it("throws an error if config entry is not found", async () => {
    await expect(deleteConfigEntry("non-existing-id", mockConfigurator)).rejects.toThrow(
      EntryNotFoundError,
    );
  });
});
