import { channelsRouter } from "../channels/channels.router";
import { router } from "./trpc-server";
import { sendgridConfigurationRouter } from "../sendgrid/configuration/sendgrid-configuration.router";
import { appConfigurationRouter } from "../app-configuration/app-configuration.router";

export const appRouter = router({
  app: appConfigurationRouter,
  channels: channelsRouter,
  sendgridConfiguration: sendgridConfigurationRouter,
});

export type AppRouter = typeof appRouter;
