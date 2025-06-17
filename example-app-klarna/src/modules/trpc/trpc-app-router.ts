import { paymentAppConfigurationRouter } from "../payment-app-configuration/payment-app-configuration.router";
import { router } from "./trpc-server";

export const appRouter = router({
  paymentAppConfigurationRouter,
  // CHANGEME: Add additioal routers here
});

export type AppRouter = typeof appRouter;
