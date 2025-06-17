"use client";
import { Client, Provider } from "urql";

import { SaleorAuthProvider, useAuthChange } from "@saleor/auth-sdk/react";
import { saleorApiUrl, saleorAuthClient, makeUrqlClient } from "@/lib";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [urqlClient, setUrqlClient] = useState<Client>(makeUrqlClient());

  useAuthChange({
    saleorApiUrl,
    onSignedOut: () => setUrqlClient(makeUrqlClient()),
    onSignedIn: () => setUrqlClient(makeUrqlClient()),
  });

  return (
    <SaleorAuthProvider client={saleorAuthClient}>
      <Provider value={urqlClient}>{children}</Provider>
    </SaleorAuthProvider>
  );
}
