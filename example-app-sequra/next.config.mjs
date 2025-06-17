// @ts-check
/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
const withVanillaExtract = createVanillaExtractPlugin();

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/lib/env.mjs"));

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: "standalone",
};

const vanillaExtractConfig = withVanillaExtract(config);

export default vanillaExtractConfig;
