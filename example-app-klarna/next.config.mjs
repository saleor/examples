// @ts-check
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
const withVanillaExtract = createVanillaExtractPlugin();
import { withSentryConfig } from "@sentry/nextjs";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/lib/env.mjs"));

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  /** @param { import("webpack").Configuration } config */
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};

const isSentryEnabled = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

const vanillaExtractConfig = withVanillaExtract(config);

export default isSentryEnabled
  ? withSentryConfig(vanillaExtractConfig, { silent: true }, { hideSourceMaps: true })
  : vanillaExtractConfig;
