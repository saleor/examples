import { AppBridge, AppBridgeProvider } from "@saleor/app-sdk/app-bridge";
import { ThemeProvider } from "@saleor/macaw-ui";
import "@saleor/macaw-ui/style";
import { AppProps } from "next/app";
import { ThemeSynchronizer } from "../hooks/theme-synchronizer";
import React from "react";
import { NoSSRWrapper } from "../lib/no-ssr-wrapper";

/**
 * Ensure instance is a singleton due to React 18 problems with double hooks execution in dev mode
 */
export const appBridgeInstance =
  typeof window !== "undefined" ? new AppBridge() : undefined;

function SaleorApp({ Component, pageProps }: AppProps) {
  // @ts-ignore Component can we extended with layout
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <NoSSRWrapper>
      <AppBridgeProvider appBridgeInstance={appBridgeInstance}>
        <ThemeProvider>
          <ThemeSynchronizer />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </AppBridgeProvider>
    </NoSSRWrapper>
  );
}

export default SaleorApp;
