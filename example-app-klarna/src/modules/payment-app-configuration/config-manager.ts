import { uuidv7 } from "uuidv7";
import { type ConfigEntryUpdate } from "./input-schemas";
import { obfuscateConfigEntry } from "./utils";
import { type PaymentAppConfigurator } from "./payment-app-configuration";
import { type PaymentAppConfigEntry, type PaymentAppFormConfigEntry } from "./config-entry";
import { createLogger, redactLogObject } from "@/lib/logger";
import { BaseError } from "@/errors";

export const EntryNotFoundError = BaseError.subclass("EntryNotFoundError");

export const getAllConfigEntriesObfuscated = async (configurator: PaymentAppConfigurator) => {
  const logger = createLogger(
    { saleorApiUrl: configurator.saleorApiUrl },
    { msgPrefix: "[getAllConfigEntriesObfuscated] " },
  );

  const config = await configurator.getConfigObfuscated();
  logger.debug("Got obfuscated config");

  return config.configurations;
};

export const getAllConfigEntriesDecrypted = async (configurator: PaymentAppConfigurator) => {
  const logger = createLogger(
    { saleorApiUrl: configurator.saleorApiUrl },
    { msgPrefix: "[getAllConfigEntriesDecrypted] " },
  );

  const config = await configurator.getConfig();
  logger.debug("Got config");

  return config.configurations;
};

const getConfigEntries = async (
  configurationId: string,
  configurator: PaymentAppConfigurator,
  obfuscated = true,
) => {
  const logger = createLogger(
    { configurationId, saleorApiUrl: configurator.saleorApiUrl, obfuscated },
    { msgPrefix: "[getConfigEntries] " },
  );

  logger.debug("Fetching all config entries");
  const entries = await (obfuscated
    ? getAllConfigEntriesObfuscated(configurator)
    : getAllConfigEntriesDecrypted(configurator));
  logger.debug("Got entries");

  const entry = entries.find((entry) => entry.configurationId === configurationId);

  if (!entry) {
    logger.warn("Entry was not found");
    throw new EntryNotFoundError(`Entry with id ${configurationId} was not found`);
  }

  logger.debug({ entryName: entry.configurationName }, "Found entry");
  return entry;
};

export const getConfigEntryObfuscated = async (
  configurationId: string,
  configurator: PaymentAppConfigurator,
) => getConfigEntries(configurationId, configurator, true);

export const getConfigEntryDecrypted = async (
  configurationId: string,
  configurator: PaymentAppConfigurator,
) => getConfigEntries(configurationId, configurator, false);

export const addConfigEntry = async (
  newConfigEntry: PaymentAppFormConfigEntry,
  configurator: PaymentAppConfigurator,
) => {
  const logger = createLogger(
    { saleorApiUrl: configurator.saleorApiUrl },
    { msgPrefix: "[addConfigEntry] " },
  );

  const uuid = uuidv7();

  // TODO: Check if API key is valid in your provider SDK
  const config = {
    ...newConfigEntry,
    configurationId: uuid,
  } satisfies PaymentAppConfigEntry;

  logger.debug({ config: redactLogObject(config) }, "Adding new config entry");
  await configurator.setConfigEntry(config);
  logger.info({ configurationId: config.configurationId }, "Config entry added");

  return obfuscateConfigEntry(config);
};

export const updateConfigEntry = async (
  input: ConfigEntryUpdate,
  configurator: PaymentAppConfigurator,
) => {
  const logger = createLogger(
    { saleorApiUrl: configurator.saleorApiUrl },
    { msgPrefix: "[updateConfigEntry] " },
  );

  const { entry, configurationId } = input;
  logger.debug("Checking if config entry with provided ID exists");
  const existingEntry = await getConfigEntryDecrypted(configurationId, configurator);
  logger.debug({ existingEntry: redactLogObject(existingEntry) }, "Found entry");

  await configurator.setConfigEntry({
    ...entry,
    configurationId,
  });
  logger.info({ configurationId }, "Config entry updated");

  return obfuscateConfigEntry({
    ...existingEntry,
    ...entry,
  });
};

export const deleteConfigEntry = async (
  configurationId: string,
  configurator: PaymentAppConfigurator,
) => {
  const logger = createLogger(
    { configurationId, saleorApiUrl: configurator.saleorApiUrl },
    { msgPrefix: "[deleteConfigEntry] " },
  );

  logger.debug("Checking if config entry with provided ID exists");
  const existingEntry = await getConfigEntryDecrypted(configurationId, configurator);
  logger.debug({ existingEntry: redactLogObject(existingEntry) }, "Found entry");

  await configurator.deleteConfigEntry(configurationId);
  logger.info({ configurationId }, "Config entry deleted");
};
