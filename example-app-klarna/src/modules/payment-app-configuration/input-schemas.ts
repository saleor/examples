import { z } from "zod";
import { paymentAppFormConfigEntrySchema } from "./config-entry";

export const mappingUpdate = z.object({
  channelId: z.string().min(1),
  configurationId: z.string().min(1).nullable(),
});

export const paymentConfigEntryUpdate = z.object({
  configurationId: z.string().min(1),
  entry: paymentAppFormConfigEntrySchema,
});

export const paymentConfigEntryDelete = z.object({ configurationId: z.string().min(1) });

export type MappingUpdate = z.infer<typeof mappingUpdate>;
export type ConfigEntryUpdate = z.infer<typeof paymentConfigEntryUpdate>;
export type ConfigEntryDelete = z.infer<typeof paymentConfigEntryDelete>;
