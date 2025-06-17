import { useAppBridge } from "@saleor/app-sdk/app-bridge";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIsMounted } from "usehooks-ts";
import { isInIframe } from "../lib/is-in-iframe";

const IndexPage: NextPage = () => {
  const { appBridgeState } = useAppBridge();
  const isMounted = useIsMounted();
  const { replace } = useRouter();

  useEffect(() => {
    if (isMounted() && appBridgeState?.ready) {
      replace("/configuration");
    }
  }, [isMounted, appBridgeState?.ready, replace]);

  if (isInIframe()) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <h1>Saleor Taxes</h1>
      <p>
        This is Saleor App that allows to use external service to handle taxes.
      </p>
      <p>Install the app in your Saleor instance and open it in Dashboard.</p>
    </div>
  );
};

export default IndexPage;
