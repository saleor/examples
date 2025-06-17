"use client";

import { SaleorAuthProvider, useAuthChange } from "@saleor/auth-sdk/react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient, saleorApiUrl, saleorAuthClient } from "@/lib";

export default function Layout({ children }: { children: React.ReactNode }) {
  useAuthChange({
    saleorApiUrl,
    onSignedOut: () => apolloClient.resetStore(),
    onSignedIn: () => {
      apolloClient.refetchQueries({ include: "all" });
    },
  });

  return (
    <SaleorAuthProvider client={saleorAuthClient}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </SaleorAuthProvider>
  );
}
