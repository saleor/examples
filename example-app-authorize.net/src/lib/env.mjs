// @ts-check
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  isServer: typeof window === "undefined" || process.env.NODE_ENV === "test",
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    ENV: z.enum(["development", "test", "staging", "production"]).default("development"),
    SECRET_KEY: z.string().min(8, { message: "Cannot be too short" }),
    // SENTRY_DSN: z.string().min(1).optional(),
    APL: z.enum(["saleor-cloud", "upstash", "file"]).optional().default("file"),
    CI: z.coerce.boolean().optional().default(false),
    APP_DEBUG: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
      .optional()
      .default("error"),
    VERCEL_URL: z.string().optional(),
    APP_API_BASE_URL: z.string().optional(),
    PORT: z.coerce.number().optional(),
    UPSTASH_URL: z.string().optional(),
    UPSTASH_TOKEN: z.string().optional(),
    REST_APL_ENDPOINT: z.string().optional(),
    REST_APL_TOKEN: z.string().optional(),
    AUTHORIZE_API_LOGIN_ID: z
      .string()
      .min(1)
      .describe("API Login ID. You can find it in Account → API Credentials & Keys."),
    AUTHORIZE_TRANSACTION_KEY: z
      .string()
      .min(1)
      .describe(
        "Transaction key needed to authenticate Authorize.net SDK. You can generate it in Account → API Credentials & Keys.",
      ),
    AUTHORIZE_SIGNATURE_KEY: z
      .string()
      .min(1)
      .describe(
        "Signature Key needed to verify webhooks. You can generate it in Account → API Credentials & Keys.",
      ),
    AUTHORIZE_PUBLIC_CLIENT_KEY: z
      .string()
      .min(1)
      .describe("Public client key. You can generate it in Account -> Manage Public Client Key"),
    AUTHORIZE_ENVIRONMENT: z.enum(["sandbox", "production"]),
    AUTHORIZE_PAYMENT_FORM_URL: z
      .string()
      .min(1)
      .describe(
        "Payment form URL. This is the address your front-end UI is running on. Make sure it is on https. Otherwise the Accept Hosted form will not work.",
      ),
  },

  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    // NEXT_PUBLIC_SENTRY_DSN: z.optional(z.string().min(1)),
  },

  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    ENV: process.env.ENV,
    // SENTRY_DSN: process.env.SENTRY_DSN,
    // NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    SECRET_KEY: process.env.SECRET_KEY,
    APL: process.env.APL,
    CI: process.env.CI,
    APP_DEBUG: process.env.APP_DEBUG,
    VERCEL_URL: process.env.VERCEL_URL,
    APP_API_BASE_URL: process.env.APP_API_BASE_URL,
    PORT: process.env.PORT,
    UPSTASH_URL: process.env.UPSTASH_URL,
    UPSTASH_TOKEN: process.env.UPSTASH_TOKEN,
    REST_APL_ENDPOINT: process.env.REST_APL_ENDPOINT,
    REST_APL_TOKEN: process.env.REST_APL_TOKEN,
    AUTHORIZE_API_LOGIN_ID: process.env.AUTHORIZE_API_LOGIN_ID,
    AUTHORIZE_TRANSACTION_KEY: process.env.AUTHORIZE_TRANSACTION_KEY,
    AUTHORIZE_SIGNATURE_KEY: process.env.AUTHORIZE_SIGNATURE_KEY,
    AUTHORIZE_PUBLIC_CLIENT_KEY: process.env.AUTHORIZE_PUBLIC_CLIENT_KEY,
    AUTHORIZE_ENVIRONMENT: process.env.AUTHORIZE_ENVIRONMENT,
    AUTHORIZE_PAYMENT_FORM_URL: process.env.AUTHORIZE_PAYMENT_FORM_URL,
  },
});
