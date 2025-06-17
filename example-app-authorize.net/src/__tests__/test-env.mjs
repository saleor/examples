import { z } from "zod";

const testEnvSchema = z.object({
  // Saleor
  TEST_SALEOR_API_URL: z.string().url(),
  TEST_SALEOR_APP_TOKEN: z.string(),
  TEST_SALEOR_APP_ID: z.string(),
  TEST_SALEOR_JWKS: z.string(),
  // Payment App
  TEST_PAYMENT_APP_API_KEY: z.string(),
  TEST_PAYMENT_APP_API_KEY_ID: z.string(),
  TEST_PAYMENT_APP_CLIENT_KEY: z.string(),
  // Polly.js
  POLLY_MODE: z.enum(["record", "record_missing", "replay"]).optional().default("replay"),
});

const processEnv = {
  // Saleor
  TEST_SALEOR_API_URL: process.env.TEST_SALEOR_API_URL,
  TEST_SALEOR_APP_TOKEN: process.env.TEST_SALEOR_APP_TOKEN,
  TEST_SALEOR_APP_ID: process.env.TEST_SALEOR_APP_ID,
  TEST_SALEOR_JWKS: process.env.TEST_SALEOR_JWKS,
  // Payment App
  TEST_PAYMENT_APP_API_KEY: process.env.TEST_PAYMENT_APP_API_KEY,
  TEST_PAYMENT_APP_API_KEY_ID: process.env.TEST_PAYMENT_APP_API_KEY_ID,
  TEST_PAYMENT_APP_CLIENT_KEY: process.env.TEST_PAYMENT_APP_CLIENT_KEY,
  // Polly.js
  POLLY_MODE: process.env.POLLY_MODE,
};

/* c8 ignore start */
/** @type z.infer<testEnvSchema>
 *  @ts-ignore - can't type this properly in jsdoc */
// eslint-disable-next-line import/no-mutable-exports
let testEnv = process.env;

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const parsed = testEnvSchema.safeParse(processEnv);

  if (parsed.success === false) {
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  testEnv = parsed.data;
}
/* c8 ignore stop */

export { testEnv };
