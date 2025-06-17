import { useAppBridge } from "@saleor/app-sdk/app-bridge";
import { Box, Button, Input, Text } from "@saleor/macaw-ui/next";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { PricingSection } from "../pricing-section";

const AddToSaleorForm = () => (
  <Box
    as={"form"}
    display={"flex"}
    alignItems={"center"}
    gap={4}
    onSubmit={(event) => {
      event.preventDefault();

      const saleorUrl = new FormData(event.currentTarget as HTMLFormElement).get("saleor-url");
      const manifestUrl = new URL("/api/manifest", window.location.origin);
      const redirectUrl = new URL(
        `/dashboard/apps/install?manifestUrl=${manifestUrl}`,
        saleorUrl as string
      ).href;

      window.open(redirectUrl, "_blank");
    }}
  >
    <Input type="url" required label="Saleor URL" name="saleor-url" />
    <Button type="submit">Add to Saleor</Button>
  </Box>
);

/**
 * This is page publicly accessible from your app.
 * You should probably remove it.
 */
const IndexPage: NextPage = () => {
  const { appBridgeState } = useAppBridge();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLocalHost = global.location.href.includes("localhost");

  return (
    <Box padding={8}>
      <Text variant={"hero"}>Quantity based pricing and checkout app example</Text>
      {appBridgeState?.ready && mounted && <PricingSection />}

      {mounted && !isLocalHost && !appBridgeState?.ready && (
        <>
          <Text marginBottom={4} as={"p"}>
            Install this app in your Dashboard and get extra powers!
          </Text>
          <AddToSaleorForm />
        </>
      )}
    </Box>
  );
};

export default IndexPage;
