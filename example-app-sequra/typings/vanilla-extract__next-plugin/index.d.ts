declare module "@vanilla-extract/next-plugin" {
  declare const createVanillaExtractPlugin: () => (
    config: import("next").NextConfig,
  ) => import("next").NextConfig;
  export { createVanillaExtractPlugin };
}
