import { TRPCClientError, httpBatchLink, loggerLink, type TRPCClientErrorLike } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";

import { SALEOR_API_URL_HEADER, SALEOR_AUTHORIZATION_BEARER_HEADER } from "@saleor/app-sdk/const";
import { type AppRouter } from "./trpc-app-router";
import { getErrorHandler } from "./utils";
import { BaseTrpcError, JwtInvalidError, JwtTokenExpiredError } from "@/errors";
import { appBridgeInstance } from "@/app-bridge-instance";

const genericErrorHandler = (err: unknown) => {
  getErrorHandler({
    actionId: "generic-error",
    appBridge: appBridgeInstance,
  })(err as TRPCClientErrorLike<AppRouter>);
};

export const trpcClient = createTRPCNext<AppRouter>({
  config() {
    return {
      abortOnUnmount: true,
      links: [
        loggerLink({
          logger: (data) => {
            if (data.direction === "down" && data.result instanceof TRPCClientError) {
              const serialized = data.result.data?.serialized;
              const error = BaseTrpcError.parse(serialized);

              if (error instanceof JwtTokenExpiredError) {
                console.error("JWT Token expired. Please refresh the page.");
              }

              if (error instanceof JwtInvalidError) {
                console.error("JWT Token is invalid. Please refresh the page.");
              }
            }
          },
        }),
        httpBatchLink({
          url: "/api/trpc",
          headers() {
            return {
              /**
               * Attach headers from app to client requests, so tRPC can add them to context
               */
              [SALEOR_AUTHORIZATION_BEARER_HEADER]: appBridgeInstance?.getState().token,
              [SALEOR_API_URL_HEADER]: appBridgeInstance?.getState().saleorApiUrl,
            };
          },
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          mutations: {
            onError: genericErrorHandler,
            retry: false,
          },
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            onError: genericErrorHandler,
            retry: false,
          },
        },
      },
    };
  },
  ssr: false,
});
