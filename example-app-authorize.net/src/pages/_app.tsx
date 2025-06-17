import "../styles/global.css";
import "@saleor/macaw-ui/next/style";

import { AppBridgeProvider } from "@saleor/app-sdk/app-bridge";
import { RoutePropagator } from "@saleor/app-sdk/app-bridge/next";
import { ThemeProvider } from "@saleor/macaw-ui/next";
import { type AppProps } from "next/app";

import { ThemeSynchronizer } from "../modules/ui/theme-synchronizer";
import { NoSSRWrapper } from "../modules/ui/no-ssr-wrapper";

import { appBridgeInstance } from "@/app-bridge-instance";

function NextApp({ Component, pageProps }: AppProps) {
  return (
    <NoSSRWrapper>
      <AppBridgeProvider appBridgeInstance={appBridgeInstance}>
        <ThemeProvider>
          <ThemeSynchronizer />
          <RoutePropagator />
          <Component {...pageProps} />
        </ThemeProvider>
      </AppBridgeProvider>
    </NoSSRWrapper>
  );
}

export default NextApp;
