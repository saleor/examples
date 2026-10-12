import { authExchange } from "@urql/exchange-auth";
import { cacheExchange, createClient as urqlCreateClient, fetchExchange } from "urql";

export const createClient = (url: string, token?: string) =>
  urqlCreateClient({
    url,
    exchanges: [
      cacheExchange,
      authExchange(async (utils) => ({
        addAuthToOperation(operation) {
          return token ? utils.appendHeaders(operation, { "Authorization-Bearer": token }) : operation;
        },
        didAuthError(error) {
          return error.graphQLErrors.some((e) => e.extensions?.code === "FORBIDDEN");
        },
        async refreshAuth() {},
      })),
      fetchExchange,
    ],
  });
