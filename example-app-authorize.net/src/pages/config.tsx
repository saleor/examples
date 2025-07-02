import { useAppBridge, withAuthorization } from "@saleor/app-sdk/app-bridge";
import { Text } from "@saleor/macaw-ui/next";
import { type NextPage } from "next";
import { checkTokenPermissions } from "../modules/jwt/check-token-offline";
import { AppLayout } from "@/modules/ui/templates/AppLayout";

const ConfigPage: NextPage = () => {
  const { appBridgeState } = useAppBridge();
  const { token } = appBridgeState ?? {};

  const hasPermissions = checkTokenPermissions(token, ["MANAGE_APPS", "MANAGE_SETTINGS"]);

  if (!hasPermissions) {
    return (
      <AppLayout title="">
        <Text variant="hero">{"You don't have permissions to configure this app"}</Text>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="">
      <h1>All systems operational 🤖</h1>
    </AppLayout>
  );
};

export default withAuthorization()(ConfigPage);
