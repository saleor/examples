import { NextPage } from "next";
import { useAppBridge } from "@saleor/app-sdk/app-bridge";
import { useEffect } from "react";
import { useIsMounted } from "usehooks-ts";
import { useRouter } from "next/router";
import { Box, Text } from "@saleor/macaw-ui";
import { isInIframe } from "../lib/is-in-iframe";

const IndexPage: NextPage = () => {
  const { appBridgeState } = useAppBridge();
  const isMounted = useIsMounted();
  const { replace } = useRouter();

  useEffect(() => {
    if (isMounted() && appBridgeState?.ready) {
      replace("/configuration");
    }
  }, [isMounted, appBridgeState?.ready]);

  if (isInIframe()) {
    return null;
  }

  return (
    <Box>
      <Text as={"h1"} size={11}>
        Saleor Slack App
      </Text>
      <Text as={"p"}>This is Saleor App that allows invoices generation</Text>
      <Text as={"p"}>
        Install app in your Saleor instance and open in with Dashboard{" "}
        <a href={"https://github.com/saleor/example-slack-app"}>or check it on GitHub</a>
      </Text>
    </Box>
  );
};

export default IndexPage;
