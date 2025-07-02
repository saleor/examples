import { z } from "zod";
import { protectedClientProcedure } from "../trpc/protected-client-procedure";
import { router } from "../trpc/trpc-server";
import { channelMappingSchema, paymentAppConfigEntriesSchema } from "./app-config";
import { mappingUpdate, paymentConfigEntryDelete, paymentConfigEntryUpdate } from "./input-schemas";
import { getMappingFromAppConfig, setMappingInAppConfig } from "./mapping-manager";
import { getPaymentAppConfigurator } from "./payment-app-configuration-factory";
import {
  paymentAppConfigEntrySchema,
  paymentAppFormConfigEntrySchema,
  paymentAppUserVisibleConfigEntrySchema,
} from "./config-entry";
import {
  addConfigEntry,
  deleteConfigEntry,
  getAllConfigEntriesObfuscated,
  getConfigEntryObfuscated,
  updateConfigEntry,
} from "./config-manager";
import { redactLogValue } from "@/lib/logger";
import { invariant } from "@/lib/invariant";

export const paymentAppConfigurationRouter = router({
  mapping: router({
    getAll: protectedClientProcedure.output(channelMappingSchema).query(async ({ ctx }) => {
      ctx.logger.info("appConfigurationRouter.mapping.getAll called");
      const configurator = getPaymentAppConfigurator(ctx.apiClient, ctx.saleorApiUrl);
      return getMappingFromAppConfig(ctx.apiClient, configurator);
    }),
    update: protectedClientProcedure
      .input(mappingUpdate)
      .output(channelMappingSchema)
      .mutation(async ({ input, ctx }) => {
        const { configurationId, channelId } = input;
        ctx.logger.info(
          { configurationId, channelId },
          "appConfigurationRouter.mapping.update called",
        );

        const configurator = getPaymentAppConfigurator(ctx.apiClient, ctx.saleorApiUrl);
        return setMappingInAppConfig(input, configurator);
      }),
  }),
  paymentConfig: router({
    get: protectedClientProcedure
      .input(z.object({ configurationId: z.string() }))
      .output(paymentAppConfigEntrySchema)
      .query(async ({ input, ctx }) => {
        const { configurationId } = input;
        ctx.logger.info({ configurationId }, "appConfigurationRouter.paymentConfig.getAll called");

        const configurator = getPaymentAppConfigurator(ctx.apiClient, ctx.saleorApiUrl);
        return getConfigEntryObfuscated(input.configurationId, configurator);
      }),
    getAll: protectedClientProcedure
      .output(paymentAppConfigEntriesSchema)
      .query(async ({ ctx }) => {
        ctx.logger.info("appConfigurationRouter.paymentConfig.getAll called");
        const configurator = getPaymentAppConfigurator(ctx.apiClient, ctx.saleorApiUrl);
        return getAllConfigEntriesObfuscated(configurator);
      }),
    add: protectedClientProcedure
      .input(paymentAppFormConfigEntrySchema)
      .mutation(async ({ input, ctx }) => {
        const { configurationName, username, password } = input;
        ctx.logger.info("appConfigurationRouter.paymentConfig.add called");
        ctx.logger.debug(
          { configurationName, username, password: redactLogValue(password) },
          "appConfigurationRouter.paymentConfig.add input",
        );

        const configurator = getPaymentAppConfigurator(ctx.apiClient, ctx.saleorApiUrl);
        return addConfigEntry(input, configurator);
      }),
    update: protectedClientProcedure
      .input(paymentConfigEntryUpdate)
      .output(paymentAppUserVisibleConfigEntrySchema)
      .mutation(async ({ input, ctx }) => {
        const { configurationId, entry } = input;
        const { configurationName, username, password } = entry;
        ctx.logger.info("appConfigurationRouter.paymentConfig.update called");
        ctx.logger.debug(
          {
            configurationId,
            entry: {
              username,
              password,
              configurationName,
            },
          },
          "appConfigurationRouter.paymentConfig.update input",
        );
        invariant(ctx.appUrl, "Missing app URL");

        const configurator = getPaymentAppConfigurator(ctx.apiClient, ctx.saleorApiUrl);
        return updateConfigEntry(input, configurator);
      }),
    delete: protectedClientProcedure
      .input(paymentConfigEntryDelete)
      .mutation(async ({ input, ctx }) => {
        const { configurationId } = input;
        ctx.logger.info({ configurationId }, "appConfigurationRouter.paymentConfig.delete called");

        const configurator = getPaymentAppConfigurator(ctx.apiClient, ctx.saleorApiUrl);
        return deleteConfigEntry(configurationId, configurator);
      }),
  }),
});
