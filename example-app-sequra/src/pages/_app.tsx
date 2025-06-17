import "../styles/global.css";
import "@saleor/macaw-ui/next/style";

import { AppBridgeProvider, useAppBridge } from "@saleor/app-sdk/app-bridge";
import { RoutePropagator } from "@saleor/app-sdk/app-bridge/next";
import { ThemeProvider } from "@saleor/macaw-ui/next";
import { type AppProps } from "next/app";

import { Provider } from "urql";
import { type ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // note: it's imported only in dev mode
import Head from "next/head";
import { ThemeSynchronizer } from "../modules/ui/theme-synchronizer";
import { NoSSRWrapper } from "../modules/ui/no-ssr-wrapper";

import { appBridgeInstance } from "@/app-bridge-instance";
import { trpcClient } from "@/modules/trpc/trpc-client";
import { createClient } from "@/lib/create-graphq-client";

const UrqlProvider = ({ children }: { children: ReactNode }) => {
  const { appBridgeState } = useAppBridge();
  if (!appBridgeState?.saleorApiUrl) {
    return <>{children}</>;
  }

  const client = createClient(appBridgeState?.saleorApiUrl, async () =>
    appBridgeState?.token ? { token: appBridgeState.token } : null,
  );
  return <Provider value={client}>{children}</Provider>;
};

function NextApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Saleor App Payment Sequra</title>
        <link rel="icon" href="/favicon-32x32.png" type="image/png" />
        <meta name="theme-color" content="#635BFF" />
        <link rel="apple-touch-icon" sizes="48x48" href="/icons/icon-48x48.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="96x96" href="/icons/icon-96x96.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="256x256" href="/icons/icon-256x256.png" />
        <link rel="apple-touch-icon" sizes="384x384" href="/icons/icon-384x384.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512x512.png" />
      </Head>
      <NoSSRWrapper>
        <AppBridgeProvider appBridgeInstance={appBridgeInstance}>
          <UrqlProvider>
            <ThemeProvider>
              <ThemeSynchronizer />
              <RoutePropagator />
              <Component {...pageProps} />
              <ReactQueryDevtools position="top-right" />
            </ThemeProvider>
          </UrqlProvider>
        </AppBridgeProvider>
      </NoSSRWrapper>
    </>
  );
}

export default trpcClient.withTRPC(NextApp);
