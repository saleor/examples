import { Box, Button, Text } from "@saleor/macaw-ui/next";
import { useAppBridge } from "@saleor/app-sdk/app-bridge";
import { RoundedActionBox, RoundedBox } from "../../atoms/RoundedActionBox/RoundedActionBox";
import { ChannelToConfigurationTable } from "../../molecules/ConfigurationsTable/ChannelToConfigurationTable/ChannelToConfigurationTable";
import { type Channel } from "@/types";
import {
  type PaymentAppConfigUserVisible,
  type ChannelMapping,
} from "@/modules/payment-app-configuration/app-config";

export const ChannelToConfigurationList = ({
  channelMappings,
  configurations,
  channels,
  disabled,
}: {
  channelMappings: ChannelMapping;
  configurations: PaymentAppConfigUserVisible;
  channels: readonly Channel[];
  disabled?: boolean;
}) => {
  return Object.keys(channelMappings).length > 0 ? (
    <NotEmpty
      disabled={disabled}
      channelMappings={channelMappings}
      configurations={configurations}
      channels={channels}
    />
  ) : (
    <Empty disabled={disabled} />
  );
};

const NotEmpty = ({
  channelMappings,
  configurations,
  channels,
  disabled,
}: {
  channelMappings: ChannelMapping;
  configurations: PaymentAppConfigUserVisible;
  channels: readonly Channel[];
  disabled?: boolean;
}) => {
  return (
    <RoundedBox>
      <Box paddingX={6} paddingTop={4} paddingBottom={6} display="flex">
        <ChannelToConfigurationTable
          disabled={disabled}
          channels={channels}
          configurations={configurations}
          channelMappings={channelMappings}
        />
      </Box>
    </RoundedBox>
  );
};

const Empty = ({ disabled }: { disabled?: boolean }) => {
  const { appBridge } = useAppBridge();

  return (
    <RoundedActionBox>
      <Box>
        <Text as="p" variant="body" size="medium" color="textCriticalDefault">
          It appears you have 0 channels.
        </Text>
        <Text as="p" variant="body" size="medium" color="textCriticalDefault">
          You need to add at least one channel to proceed.
        </Text>
      </Box>
      <Button
        size="large"
        variant="primary"
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          void appBridge?.dispatch({
            type: "redirect",
            payload: { actionId: "go-to-channels", to: "/channels/" },
          });
        }}
      >
        Configure channels
      </Button>
    </RoundedActionBox>
  );
};
