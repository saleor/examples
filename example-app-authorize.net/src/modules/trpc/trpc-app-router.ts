import { router } from "./trpc-server";

export const appRouter = router({
  // no routers because we don't have client-side calls
});

export type AppRouter = typeof appRouter;
