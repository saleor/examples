import { cacheExchange, createClient, fetchExchange } from "urql";
import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const saleorApiUrl = "https://storefront1.saleor.cloud/graphql/";

// Saleor Client
export const saleorAuthClient = createSaleorAuthClient({ saleorApiUrl });

// Apollo Client
const httpLink = createHttpLink({
  uri: saleorApiUrl,
  fetch: (input, init) => saleorAuthClient.fetchWithAuth(input as NodeJS.fetch.RequestInfo, init),
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// urql Client Factory for revalidation during logout
export const makeUrqlClient = () =>
  createClient({
    url: saleorApiUrl,
    fetch: (input, init) => saleorAuthClient.fetchWithAuth(input as NodeJS.fetch.RequestInfo, init),
    exchanges: [cacheExchange, fetchExchange],
  });
