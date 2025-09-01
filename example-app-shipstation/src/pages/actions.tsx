import { actions, useAppBridge } from "@saleor/app-sdk/app-bridge";
import { Box } from "@saleor/macaw-ui";
import { OrderExample } from "../order-example";

/**
 * This is example of using AppBridge, when App is mounted in Dashboard
 * See more about AppBridge possibilities
 * https://github.com/saleor/saleor-app-sdk/blob/main/docs/app-bridge.md
 *
 * -> You can safely remove this file!
 */
const ActionsPage = () => {
  const { appBridge, appBridgeState } = useAppBridge();

  const navigateToOrders = () => {
    appBridge?.dispatch(
      actions.Redirect({
        to: `/orders`,
      })
    );
  };

  return (
    <Box padding={8} display={"flex"} flexDirection={"column"} gap={6} __maxWidth={"640px"}>
      <OrderExample />
    </Box>
  );
};

export default ActionsPage;
