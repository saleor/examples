import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info", // LOG_LEVEL is not imported from env-config to avoid dependency for testing purposes
  transport: {
    target: "pino-pretty",
  },
});

export const createLogger = (name: string) => logger.child({ name });
