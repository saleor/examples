"use client";

import { makeUrqlClient, saleorAuthClient } from "@/lib/urql-client";
import { SaleorAuthProvider, useAuthChange } from "@saleor/auth-sdk/react";
import { useState } from "react";
import { Client, Provider } from "urql";

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_URL!;

export const Providers = ({ children }: { children: React.ReactNode }) => {
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
};
