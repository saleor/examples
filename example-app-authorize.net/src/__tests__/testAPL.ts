import {
  type AplConfiguredResult,
  type AplReadyResult,
  type APL,
  type AuthData,
} from "@saleor/app-sdk/APL";
import { testEnv } from "@/__tests__/test-env.mjs";

export class TestAPL implements APL {
  async get(saleorApiUrl: string): Promise<AuthData | undefined> {
    if (testEnv.TEST_SALEOR_API_URL !== saleorApiUrl) {
      return;
    }

    return {
      saleorApiUrl: testEnv.TEST_SALEOR_API_URL,
      domain: new URL(testEnv.TEST_SALEOR_API_URL).hostname,
      jwks: "",
      appId: testEnv.TEST_SALEOR_APP_ID,
      token: testEnv.TEST_SALEOR_APP_TOKEN,
    };
  }

  async set(authData: AuthData) {
    console.warn("Attempted to save APL authData in test", authData);
  }

  async delete() {
    console.warn("Attempted to delete APL authData in test");
  }

  async getDomain(): Promise<string | undefined> {
    return new URL(testEnv.TEST_SALEOR_API_URL).hostname;
  }

  async isReady(): Promise<AplReadyResult> {
    return {
      ready: true,
    };
  }

  async getAll() {
    return [
      {
        saleorApiUrl: testEnv.TEST_SALEOR_API_URL,
        domain: new URL(testEnv.TEST_SALEOR_API_URL).hostname,
        jwks: "",
        appId: testEnv.TEST_SALEOR_APP_ID,
        token: testEnv.TEST_SALEOR_APP_TOKEN,
      },
    ];
  }

  async isConfigured(): Promise<AplConfiguredResult> {
    return {
      configured: true,
    };
  }
}
