import {
  type PaymentAppConfigEntry,
  type PaymentAppConfigEntryFullyConfigured,
} from "../config-entry";

export const configEntryRequired: PaymentAppConfigEntry = {
  configurationName: "test",
  configurationId: "mock-id",
  password: "password",
  apiUrl: "https://api.playground.klarna.com/",
  username: "username",
};

export const configEntryAll: PaymentAppConfigEntryFullyConfigured = {
  configurationName: "test",
  configurationId: "mock-id",
  password: "password",
  apiUrl: "https://api.playground.klarna.com/",
  username: "username",
};
