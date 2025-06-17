import { z } from "zod";
import { env } from "@/lib/env.mjs";

export const authorizeEnvironmentSchema = z.enum(["sandbox", "production"]);

const authorizeConfigSchema = z.object({
  apiLoginId: z.string().min(1),
  publicClientKey: z.string().min(1),
  transactionKey: z.string().min(1),
  signatureKey: z.string().min(1),
  environment: authorizeEnvironmentSchema,
});

export type AuthorizeConfig = z.infer<typeof authorizeConfigSchema>;

export function getAuthorizeConfig(): AuthorizeConfig {
  return {
    apiLoginId: env.AUTHORIZE_API_LOGIN_ID,
    publicClientKey: env.AUTHORIZE_PUBLIC_CLIENT_KEY,
    transactionKey: env.AUTHORIZE_TRANSACTION_KEY,
    environment: env.AUTHORIZE_ENVIRONMENT,
    signatureKey: env.AUTHORIZE_SIGNATURE_KEY,
  };
}
