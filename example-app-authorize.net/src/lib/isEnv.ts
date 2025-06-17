/* eslint-disable node/no-process-env */
export const isTest = () => process.env.NODE_ENV === "test";
export const isDevelopment = () => process.env.NODE_ENV === "development";
export const isProduction = () => process.env.NODE_ENV === "production";
