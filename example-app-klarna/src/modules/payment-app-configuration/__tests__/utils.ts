import { type PaymentAppConfig } from "../app-config";
import {
  getFakePaymentAppConfigurator,
  type MetadataManagerOverride,
} from "./payment-app-configuration-factory";
import { testEnv } from "@/__tests__/test-env.mjs";

export const filledFakeMatadataConfig = {
  configurations: [
    {
      username: testEnv.TEST_KLARNA_USERNAME,
      password: testEnv.TEST_KLARNA_PASSWORD,
      apiUrl: testEnv.TEST_KLARNA_API_URL,
      configurationId: "mock-id",
      configurationName: "test",
    },
  ],
  channelToConfigurationId: {
    "1": "mock-id",
  },
} satisfies PaymentAppConfig;

export const getFilledFakeMetadataConfigurator = (override?: MetadataManagerOverride) => {
  return getFakePaymentAppConfigurator(
    filledFakeMatadataConfig,
    testEnv.TEST_SALEOR_API_URL,
    override,
  );
};

export const getFilledMetadata = (override?: MetadataManagerOverride) => {
  const configurator = getFilledFakeMetadataConfigurator(override);
  return configurator.getRawConfig();
};
