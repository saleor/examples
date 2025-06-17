import { type TRPCError, initTRPC } from "@trpc/server";
import { TRPC_ERROR_CODES_BY_KEY, type TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";
import { type TrpcContext } from "./trpc-context";
import { BaseTrpcError } from "@/errors";
import { isProduction } from "@/lib/isEnv";

const getErrorCode = (error: TRPCError): TRPC_ERROR_CODE_KEY => {
  const cause = error.cause;
  if (cause && cause instanceof BaseTrpcError) {
    return cause.trpcCode || "INTERNAL_SERVER_ERROR";
  }
  return error.code;
};

const getSerialized = (error: TRPCError) => {
  const cause = error.cause;
  if (cause && cause instanceof BaseTrpcError) {
    const serializedError = BaseTrpcError.serialize(cause);
    if (isProduction()) {
      serializedError.stack = "[HIDDEN]";
    }
    return serializedError;
  }
};

const t = initTRPC.context<TrpcContext>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      code: TRPC_ERROR_CODES_BY_KEY[getErrorCode(error)],
      data: {
        ...shape.data,
        code: getErrorCode(error),
        serialized: getSerialized(error),
        stack: isProduction() ? null : error.stack,
      },
    };
  },
});

export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;
