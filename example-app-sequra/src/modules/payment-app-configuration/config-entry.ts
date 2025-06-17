import { z } from "zod";
import { deobfuscateValues } from "../app-configuration/utils";

export const DANGEROUS_paymentAppConfigEntryHiddenSchema = z.object({});

export const paymentAppConfigEntryInternalSchema = z.object({
  configurationId: z.string().min(1),
});

export const paymentAppConfigEntryEncryptedSchema = z.object({
  password: z.string({ required_error: "Password is required" }).min(1).nullable(),
  assetsKey: z.string({ required_error: "Assets key is required" }).min(1).nullable(),
});

export const paymentAppConfigEntryPublicSchema = z.object({
  configurationName: z.string().min(1),
  username: z.string().min(1).nullish(),
  apiUrl: z.string().url().min(1).nullish(),
  merchantId: z.string().min(1).nullish(),
});

export const paymentAppConfigEntrySchema = paymentAppConfigEntryInternalSchema
  .merge(paymentAppConfigEntryEncryptedSchema)
  .merge(paymentAppConfigEntryPublicSchema)
  .merge(DANGEROUS_paymentAppConfigEntryHiddenSchema);

// Entire config available to user
export const paymentAppUserVisibleConfigEntrySchema = paymentAppConfigEntryPublicSchema
  .merge(paymentAppConfigEntryInternalSchema)
  .merge(paymentAppConfigEntryEncryptedSchema)
  .strict();

// Fully configured app - all fields are required
// Zod doesn't have a utility for marking fields as non-nullable, we need to use unwrap
export const paymentAppFullyConfiguredEntrySchema = z
  .object({
    configurationName: paymentAppConfigEntryPublicSchema.shape.configurationName,
    configurationId: paymentAppConfigEntryInternalSchema.shape.configurationId,
    password: paymentAppConfigEntryEncryptedSchema.shape.password.unwrap(),
    username: paymentAppConfigEntryPublicSchema.shape.username.unwrap().unwrap(),
    merchantId: paymentAppConfigEntryPublicSchema.shape.merchantId.unwrap().unwrap(),
    apiUrl: paymentAppConfigEntryPublicSchema.shape.apiUrl.unwrap().unwrap(),
  })
  .required();

// Schema used as input validation for saving config entires
export const paymentAppFormConfigEntrySchema = paymentAppConfigEntryEncryptedSchema
  .merge(paymentAppConfigEntryPublicSchema)
  .strict()
  .default({
    configurationName: "",
    username: null,
    password: null,
    apiUrl: null,
    merchantId: null,
    assetsKey: null,
  });

/** Schema used in front-end forms
 * Replaces obfuscated values with null */
export const paymentAppEncryptedFormSchema = paymentAppConfigEntryEncryptedSchema.transform(
  (values) => deobfuscateValues(values),
);

// Schema used for front-end forms
export const paymentAppCombinedFormSchema = z.intersection(
  paymentAppEncryptedFormSchema,
  paymentAppConfigEntryPublicSchema,
);

export type PaymentAppHiddenConfig = z.infer<typeof DANGEROUS_paymentAppConfigEntryHiddenSchema>;
export type PaymentAppInternalConfig = z.infer<typeof paymentAppConfigEntryInternalSchema>;
export type PaymentAppEncryptedConfig = z.infer<typeof paymentAppConfigEntryEncryptedSchema>;
export type PaymentAppPublicConfig = z.infer<typeof paymentAppConfigEntryPublicSchema>;

export type PaymentAppConfigEntry = z.infer<typeof paymentAppConfigEntrySchema>;
export type PaymentAppConfigEntryFullyConfigured = z.infer<
  typeof paymentAppFullyConfiguredEntrySchema
>;
export type PaymentAppUserVisibleConfigEntry = z.infer<
  typeof paymentAppUserVisibleConfigEntrySchema
>;
export type PaymentAppFormConfigEntry = z.infer<typeof paymentAppFormConfigEntrySchema>;
