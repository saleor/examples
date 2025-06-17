import { describe, it, expect } from "vitest";

import { TransactionInitializeSessionWebhookHandler } from "./transaction-initialize-session";
import {
  createMockTransactionInitializeSessionEvent,
  createMockTransactionInitializeSessionSourceObjectCheckout,
  createMockTransactionInitializeSessionSourceObjectOrder,
} from "./__tests__/utils";
import { setupRecording } from "@/__tests__/polly";
import { testEnv } from "@/__tests__/test-env.mjs";

import { LanguageCodeEnum, TransactionFlowStrategyEnum } from "generated/graphql";
import { filledFakeMatadataConfig } from "@/modules/payment-app-configuration/__tests__/utils";
import { getFakePaymentAppConfigurator } from "@/modules/payment-app-configuration/__tests__/payment-app-configuration-factory";

describe("TransactionInitializeSessionWebhookHandler", () => {
  setupRecording({});
  describe.each([
    "https://api.playground.klarna.com/",
    // 429 Too Many Requests
    // "https://api-na.playground.klarna.com/",
    // "https://api-oc.playground.klarna.com/",
  ])("%p", (apiUrl) => {
    describe.each([
      {
        name: "Checkout",
        getSourceObject: createMockTransactionInitializeSessionSourceObjectCheckout,
      },
      { name: "Order", getSourceObject: createMockTransactionInitializeSessionSourceObjectOrder },
    ])("$name", ({ getSourceObject }) => {
      it("should work", async () => {
        const configurator = getFakePaymentAppConfigurator(
          {
            ...filledFakeMatadataConfig,
            configurations: [
              {
                ...filledFakeMatadataConfig.configurations[0],
                apiUrl,
              },
            ],
          },
          testEnv.TEST_SALEOR_API_URL,
        );
        const privateMetadata = await configurator.getRawConfig();

        const event = await createMockTransactionInitializeSessionEvent({
          data: {
            merchantUrls: {
              success: "https://example.com/success",
              cancel: "https://example.com/cancel",
              back: "https://example.com/back",
              failure: "https://example.com/failure",
              error: "https://example.com/error",
            },
          },
          action: {
            amount: 99.99 + 123.0,
            currency: "SEK",
            actionType: TransactionFlowStrategyEnum.Authorization,
          },
          issuingPrincipal: null,
          sourceObject: getSourceObject({
            languageCode: LanguageCodeEnum.En,
            total: {
              gross: {
                amount: 99.99 + 123.0,
                currency: "SEK",
              },
            },
            billingAddress: {
              country: {
                code: "SE",
              },
            },
          }),
          recipient: { privateMetadata },
        });
        const initializeResult = await TransactionInitializeSessionWebhookHandler(event, {
          saleorApiUrl: testEnv.TEST_SALEOR_API_URL,
          baseUrl: testEnv.APP_API_BASE_URL,
        });
        expect(initializeResult.data?.klarnaHppResponse).toMatchObject({
          redirectUrl: expect.any(String),
        });
        expect(initializeResult.result).toBe("AUTHORIZATION_ACTION_REQUIRED");
        expect(initializeResult.data).toMatchSnapshot();
      });

      it.todo("should work with partial payment", async () => {
        const configurator = getFakePaymentAppConfigurator(
          {
            ...filledFakeMatadataConfig,
            configurations: [
              {
                ...filledFakeMatadataConfig.configurations[0],
                apiUrl,
              },
            ],
          },
          testEnv.TEST_SALEOR_API_URL,
        );
        const privateMetadata = await configurator.getRawConfig();

        // total is 30
        // shipping is 10
        // line is 2 * 10
        // but we request payment for just 20
        const event = await createMockTransactionInitializeSessionEvent({
          data: {
            merchantUrls: {
              success: "https://example.com/success",
              cancel: "https://example.com/cancel",
              back: "https://example.com/back",
              failure: "https://example.com/failure",
              error: "https://example.com/error",
            },
          },
          action: {
            amount: 20,
            currency: "SEK",
            actionType: TransactionFlowStrategyEnum.Authorization,
          },
          issuingPrincipal: null,
          sourceObject: getSourceObject({
            languageCode: LanguageCodeEnum.En,
            shippingPrice: {
              gross: {
                amount: 10,
                currency: "SEK",
              },
              net: {
                amount: 8.13,
                currency: "SEK",
              },
              tax: {
                amount: 1.87,
                currency: "SEK",
              },
            },
            total: {
              gross: {
                amount: 30,
                currency: "SEK",
              },
            },
            lines: [
              {
                totalPrice: {
                  gross: {
                    amount: 20,
                    currency: "SEK",
                  },
                  net: {
                    amount: 16.26,
                    currency: "SEK",
                  },
                  tax: {
                    amount: 3.74,
                    currency: "SEK",
                  },
                },
                unitPrice: {
                  gross: {
                    amount: 10,
                    currency: "SEK",
                  },
                  net: {
                    amount: 8.13,
                    currency: "SEK",
                  },
                  tax: {
                    amount: 1.87,
                    currency: "SEK",
                  },
                },
                quantity: 2,
              },
            ],
            billingAddress: {
              country: {
                code: "SE",
              },
            },
          }),
          recipient: { privateMetadata },
        });
        const initializeResult = await TransactionInitializeSessionWebhookHandler(event, {
          saleorApiUrl: testEnv.TEST_SALEOR_API_URL,
          baseUrl: testEnv.APP_API_BASE_URL,
        });
        expect(initializeResult.data?.klarnaHppResponse).toMatchObject({
          redirectUrl: expect.any(String),
        });
        expect(initializeResult.result).toBe("AUTHORIZATION_ACTION_REQUIRED");
        expect(initializeResult.data).toMatchSnapshot();
      });
    });
  });
});
