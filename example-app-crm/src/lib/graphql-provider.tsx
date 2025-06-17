import { useAppBridge } from "@saleor/app-sdk/app-bridge";
import { createGraphQLClient } from "./create-graphql-client";
import { PropsWithChildren } from "react";
import { Provider } from "urql";

export function GraphQLProvider(props: PropsWithChildren<{}>) {
  const { appBridgeState } = useAppBridge();
  const saleorApiUrl = appBridgeState?.saleorApiUrl!;

  if (!appBridgeState?.saleorApiUrl) {
    return <div {...props}></div>;
  }

  const client = createGraphQLClient({
    saleorApiUrl: saleorApiUrl,
    token: appBridgeState?.token,
  });

  return <Provider value={client} {...props} />;
}
