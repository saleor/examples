import { APL } from "@saleor/app-sdk/APL";
import { FileAPL } from "@saleor/app-sdk/APL/file";
import { UpstashAPL } from "@saleor/app-sdk/APL/upstash";
import { SaleorApp } from "@saleor/app-sdk/saleor-app";

const aplType = process.env.APL ?? "file";

let apl: APL;

switch (aplType) {
  case "upstash":
    apl = new UpstashAPL();

    break;
  case "file":
    apl = new FileAPL();

    break;
  default: {
    throw new Error("Invalid APL config, ");
  }
}
export const saleorApp = new SaleorApp({
  apl,
});

export const REQUIRED_SALEOR_VERSION = ">=3.10 <4";
