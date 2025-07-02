import type * as trpcNext from "@trpc/server/adapters/next";
import { SALEOR_AUTHORIZATION_BEARER_HEADER, SALEOR_API_URL_HEADER } from "@saleor/app-sdk/const";
import { type inferAsyncReturnType } from "@trpc/server";

export const createTrpcContext = async ({ req }: trpcNext.CreateNextContextOptions) => {
  const token = req.headers[SALEOR_AUTHORIZATION_BEARER_HEADER];
  const saleorApiUrl = req.headers[SALEOR_API_URL_HEADER];

  return {
    token: Array.isArray(token) ? token[0] : token,
    saleorApiUrl: Array.isArray(saleorApiUrl) ? saleorApiUrl[0] : saleorApiUrl,
    appId: undefined as undefined | string,
    appUrl: req.headers["origin"],
  };
};

export type TrpcContext = inferAsyncReturnType<typeof createTrpcContext>;
