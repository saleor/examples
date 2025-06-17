import '@/styles/globals.css'
import type { AppProps } from "next/app";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { SaleorAuthProvider, useAuthChange } from "@saleor/auth-sdk/react";

const saleorApiUrl = "https://demo.saleor.io/graphql/";

// Saleor Client
const saleorAuthClient = createSaleorAuthClient({ saleorApiUrl });

// Apollo Client
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
    onSignedIn: () => {
      apolloClient.refetchQueries({ include: "all" });
    },
  });

  return (
    <SaleorAuthProvider client={saleorAuthClient}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SaleorAuthProvider>
  );
}