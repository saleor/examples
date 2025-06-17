import { ExternalProvider, SaleorExternalAuth } from "@saleor/auth-sdk";
import { createSaleorExternalAuthHandler } from "@saleor/auth-sdk/next";

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_URL;
if (!saleorApiUrl) throw new Error("NEXT_PUBLIC_SALEOR_URL is not set");

export const externalAuth = new SaleorExternalAuth(saleorApiUrl, ExternalProvider.OpenIDConnect);
export default createSaleorExternalAuthHandler(externalAuth);
