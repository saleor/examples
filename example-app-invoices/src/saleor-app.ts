import { APL } from "@saleor/app-sdk/APL";
import { FileAPL } from "@saleor/app-sdk/APL/file";
import { SaleorCloudAPL } from "@saleor/app-sdk/APL/saleor-cloud";
import { UpstashAPL } from "@saleor/app-sdk/APL/upstash";
import { SaleorApp } from "@saleor/app-sdk/saleor-app";

const aplType = process.env.APL ?? "file";

let apl: APL;

switch (aplType) {
  case "upstash":
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      throw new Error("Upstash APL is not configured - missing env variables. Check saleor-app.ts");
    }

    apl = new UpstashAPL({
      restURL: process.env.UPSTASH_REDIS_REST_URL,
      restToken: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    break;
  case "file":
    apl = new FileAPL();

    break;
  case "rest": {
    if (!process.env.REST_APL_ENDPOINT || !process.env.REST_APL_TOKEN) {
      throw new Error("Rest APL is not configured - missing env variables. Check saleor-app.ts");
    }

    apl = new SaleorCloudAPL({
      resourceUrl: process.env.REST_APL_ENDPOINT,
      token: process.env.REST_APL_TOKEN,
    });

    break;
  }
  default: {
    throw new Error("Invalid APL config, ");
  }
}
export const saleorApp = new SaleorApp({
  apl,
});

export const REQUIRED_SALEOR_VERSION = ">=3.10 <4";
