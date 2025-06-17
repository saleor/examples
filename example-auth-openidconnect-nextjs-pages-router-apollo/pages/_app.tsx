import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";

import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { SaleorAuthProvider, useAuthChange } from "@saleor/auth-sdk/react";

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_URL!;

const saleorAuthClient = createSaleorAuthClient({ saleorApiUrl });

const httpLink = createHttpLink({
  uri: saleorApiUrl,
  fetch: saleorAuthClient.fetchWithAuth,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  useAuthChange({
    saleorApiUrl,
    onSignedOut: () => apolloClient.resetStore(),
    onSignedIn: () => apolloClient.refetchQueries({ include: "all" }),
  });

  return (
    <SaleorAuthProvider client={saleorAuthClient}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SaleorAuthProvider>
  );
}
