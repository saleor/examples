import { type NextPage } from "next";
import { useAppBridge } from "@saleor/app-sdk/app-bridge";
import { Button } from "@saleor/macaw-ui/next";
import { type MouseEventHandler, useEffect, useState } from "react";

const AddToSaleorForm = () => (
  <form
    style={{
      display: "flex",
      gap: "2rem",
    }}
    method="post"
    onSubmit={(event) => {
      event.preventDefault();

      const saleorUrl = new FormData(event.currentTarget).get("saleor-url");
      const manifestUrl = new URL("/api/manifest", window.location.origin).toString();
      const redirectUrl = new URL(
        `/dashboard/apps/install?manifestUrl=${manifestUrl}`,
        saleorUrl as string,
      ).toString();

      window.open(redirectUrl, "_blank");
    }}
  >
    <label>
      Saleor URL
      <input type="url" required name="saleor-url" />
    </label>
    <Button type="submit">Add to Saleor</Button>
  </form>
);

/**
 * This is page publicly accessible from your app.
 * You should probably remove it.
 */
const IndexPage: NextPage = () => {
  const { appBridgeState, appBridge } = useAppBridge();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    /**
     * In iframe, link can't be opened in new tab, so Dashboard must be a proxy
     */
    if (appBridgeState?.ready) {
      e.preventDefault();

      void appBridge?.dispatch({
        type: "redirect",
        payload: {
          newContext: true,
          actionId: "redirect-to-external-resource",
          to: e.currentTarget.href,
        },
      });
    }

    /**
     * Otherwise, assume app is accessed outside of Dashboard, so href attribute on <a> will work
     */
  };

  return (
    <div>
      <h1>Welcome to Payment App 💰</h1>
      <p>This is a boilerplate you can start with, to create an app connected to Saleor</p>
      <h2>Resources</h2>
      <ul>
        <li>
          <a
            onClick={handleLinkClick}
            target="_blank"
            rel="noreferrer"
            href="https://github.com/saleor/app-examples"
          >
            App Examples repository
          </a>
        </li>
        <li>
          <a
            onClick={handleLinkClick}
            target="_blank"
            rel="noreferrer"
            href="https://github.com/saleor/saleor-app-sdk"
          >
            Saleor App SDK
          </a>
        </li>
        <li>
          <a
            onClick={handleLinkClick}
            target="_blank"
            href="https://docs.saleor.io/docs/3.x/developer/extending/apps/key-concepts"
            rel="noreferrer"
          >
            Apps documentation
          </a>
        </li>
        <li>
          <a
            onClick={handleLinkClick}
            target="_blank"
            href="https://github.com/saleor/saleor-cli"
            rel="noreferrer"
          >
            Saleor CLI
          </a>
        </li>
      </ul>

      <pre>{JSON.stringify(appBridgeState, null, 2)}</pre>

      {!appBridgeState?.ready && mounted && (
        <div>
          <p>Install this app in your Dashboard and check extra powers!</p>
          {mounted && !global.location.href.includes("localhost") && <AddToSaleorForm />}
        </div>
      )}
    </div>
  );
};

export default IndexPage;
