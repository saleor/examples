import { Box } from "@saleor/macaw-ui/next";
import { ChipSuccess, ChipSequraOrange } from "@/modules/ui/atoms/Chip/Chip";
import { type PaymentAppUserVisibleConfigEntry } from "@/modules/payment-app-configuration/config-entry";
import { getEnvironmentFromUrl } from "@/modules/sequra/sequra-api";

export const ConfigurationSummary = ({ config }: { config: PaymentAppUserVisibleConfigEntry }) => {
  if (!config.apiUrl) {
    return null;
  }
  return (
    <Box
      as="dl"
      display="grid"
      __gridTemplateColumns="max-content 1fr"
      rowGap={2}
      columnGap={2}
      alignItems="center"
      margin={0}
    >
      <Box as="dt" margin={0} fontSize="captionSmall" color="textNeutralSubdued">
        Environment
      </Box>
      <Box as="dd" margin={0} textAlign="right">
        {getEnvironmentFromUrl(config.apiUrl) === "production" ? (
          <ChipSuccess>PRODUCTION</ChipSuccess>
        ) : (
          <ChipSequraOrange>PLAYGROUND</ChipSequraOrange>
        )}
      </Box>
    </Box>
  );
};
