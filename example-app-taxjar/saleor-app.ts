import { SaleorApp } from "@saleor/app-sdk/saleor-app";
import { APL } from "@saleor/app-sdk/APL";
import { FileAPL } from "@saleor/app-sdk/APL/file";
import { UpstashAPL } from "@saleor/app-sdk/APL/upstash";

/**
 * By default auth data are stored in the `.auth-data.json` (FileAPL).
 * For multi-tenant applications and deployments please use UpstashAPL.
 *
 * To read more about storing auth data, read the
 * [APL documentation](https://github.com/saleor/saleor-app-sdk/blob/main/docs/apl.md)
 */

export let apl: APL;
switch (process.env.APL) {
  case "upstash":
    // Require `UPSTASH_URL` and `UPSTASH_TOKEN` environment variables
    apl = new UpstashAPL();
    break;
  default:
    apl = new FileAPL();
}

export const saleorApp = new SaleorApp({
  apl,
});

export const REQUIRED_SALEOR_VERSION = ">=3.18 <4";
