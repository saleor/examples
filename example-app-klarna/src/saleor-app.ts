import { SaleorApp } from "@saleor/app-sdk/saleor-app";
import { FileAPL } from "@saleor/app-sdk/APL/file";
import { UpstashAPL } from "@saleor/app-sdk/APL/upstash";
import { invariant } from "./lib/invariant";
import { env } from "./lib/env.mjs";
import { isTest } from "./lib/isEnv";

/**
 * By default auth data are stored in the `.auth-data.json` (FileAPL).
 * For multi-tenant applications and deployments please use UpstashAPL.
 *
 * To read more about storing auth data, read the
 * [APL documentation](https://github.com/saleor/saleor-app-sdk/blob/main/docs/apl.md)
 */
const getApl = async () => {
  if (isTest()) {
    const { TestAPL } = await import("./__tests__/testAPL");
    return new TestAPL();
  }
  /* c8 ignore start */
  switch (env.APL) {
    case "upstash":
      invariant(env.UPSTASH_URL, "Missing UPSTASH_URL env variable!");
      invariant(env.UPSTASH_TOKEN, "Missing UPSTASH_TOKEN env variable!");
      return new UpstashAPL({
        restURL: env.UPSTASH_URL,
        restToken: env.UPSTASH_TOKEN,
      });
    default:
      return new FileAPL();
  }
  /* c8 ignore stop */
};

const apl = await getApl();

export const saleorApp = new SaleorApp({
  apl,
});
