import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { cacheExchange, createClient, fetchExchange } from "urql";

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_URL!;

export const saleorAuthClient = createSaleorAuthClient({ saleorApiUrl });

export const makeUrqlClient = () => {
  return createClient({
    url: saleorApiUrl,
    fetch: (input, init) => saleorAuthClient.fetchWithAuth(input, init),
    exchanges: [cacheExchange, fetchExchange],
  });
};
