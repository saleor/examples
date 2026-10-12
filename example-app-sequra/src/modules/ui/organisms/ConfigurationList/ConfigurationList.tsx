import { Box, Button, Text } from "@saleor/macaw-ui/next";
import Link from "next/link";
import {
  RoundedActionBox,
  RoundedBoxWithFooter,
} from "@/modules/ui/atoms/RoundedActionBox/RoundedActionBox";
import { ConfigurationsTable } from "@/modules/ui/molecules/ConfigurationsTable/ConfigurationsTable";
import { type PaymentAppConfigUserVisible } from "@/modules/payment-app-configuration/app-config";

export const ConfigurationsList = ({
  configurations,
}: {
  configurations: PaymentAppConfigUserVisible;
}) => {
  return configurations.length > 0 ? <NotEmpty configurations={configurations} /> : <Empty />;
};

const NotEmpty = ({ configurations }: { configurations: PaymentAppConfigUserVisible }) => {
  return (
    <RoundedBoxWithFooter
      footer={
        <Button as={Link} href={"/configurations/add"} size="large" variant="primary">
          Add new configuration
        </Button>
      }
    >
      <ConfigurationsTable configurations={configurations} />
    </RoundedBoxWithFooter>
  );
};

const Empty = () => {
  return (
    <RoundedActionBox>
      <Box>
        <Text as="p" variant="body" size="medium" color="textCriticalDefault">
          No Sequra configurations added.
        </Text>
        <Text as="p" variant="body" size="medium" color="textCriticalDefault">
          This means payments are not processed by Sequra.
        </Text>
      </Box>
      <Button as={Link} href={"/configurations/add"} size="large" variant="primary">
        Add new configuration
      </Button>
    </RoundedActionBox>
  );
};
