import { type AppBridge } from "@saleor/app-sdk/app-bridge";
import { type TRPCClientErrorLike } from "@trpc/client";
import { type AppRouter } from "./trpc-app-router";
import { BaseTrpcError } from "@/errors";

interface HandlerInput {
  message?: string;
  title?: string;
  actionId: string;
  appBridge: AppBridge | undefined;
}

const getParsedError = <T extends TRPCClientErrorLike<AppRouter>>(error: T) => {
  if (error.data?.serialized) {
    return BaseTrpcError.parse(error.data.serialized);
  }
  return null;
};

export const getErrorHandler =
  (input: HandlerInput) =>
  <T extends TRPCClientErrorLike<AppRouter>>(error: T) => {
    if (input.appBridge) {
      const parsedError = getParsedError(error);
      void input.appBridge.dispatch({
        type: "notification",
        payload: {
          title: input.title || "Request failed",
          text: input.message || parsedError?.message || error.message,
          apiMessage: error.shape ? JSON.stringify(error.shape ?? {}, null, 2) : undefined,
          actionId: input.actionId,
          status: "error",
        },
      });
    }
  };
