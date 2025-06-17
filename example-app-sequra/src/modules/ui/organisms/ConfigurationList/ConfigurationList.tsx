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
        <Link href={"/configurations/add"} passHref legacyBehavior>
          <Button as="a" size="large" variant="primary">
            Add new configuration
          </Button>
        </Link>
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
      <Link href={"/configurations/add"} passHref legacyBehavior>
        <Button as="a" size="large" variant="primary">
          Add new configuration
        </Button>
      </Link>
    </RoundedActionBox>
  );
};
