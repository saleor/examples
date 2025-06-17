import { actions, useAppBridge } from "@saleor/app-sdk/app-bridge";
import { Box, Button, Input, Text } from "@saleor/macaw-ui/next";
import React, { useState } from "react";
import {
  VariantDetailsFragment,
  useGetFirstVariantsQuery,
  useSetQuantityPricingMutation,
} from "../generated/graphql";
import { DEFAULT_CHANNEL } from "./const";
import { formatPrice } from "./lib/format-price";

export const PricingSection = () => {
  const [{ data, fetching }] = useGetFirstVariantsQuery({
    variables: { channel: DEFAULT_CHANNEL },
  });

  const variants = data?.productVariants?.edges.map((edge) => edge.node) || [];

  return (
    <Box display="flex" flexDirection={"column"} gap={2}>
      <Text as={"h2"} variant={"heading"}>
        Quantity based pricing
      </Text>

      {fetching ? (
        <Text color="textNeutralSubdued">Fetching variants...</Text>
      ) : (
        <VariantsTable variants={variants} />
      )}
    </Box>
  );
};

const VariantsTable = ({ variants }: { variants: VariantDetailsFragment[] }) => {
  return (
    <table>
      <tr>
        <th style={{ textAlign: "left" }}>Variant</th>
        <th style={{ textAlign: "right" }}>Base price</th>
        <th style={{ textAlign: "right" }}>Price for 5 items</th>
        <th style={{ textAlign: "right" }}>Price for 10 items</th>
        <th></th>
      </tr>
      {variants.map((variant) => (
        <VariantRow variant={variant} key={variant.id} />
      ))}
    </table>
  );
};

const VariantRow = ({ variant }: { variant: VariantDetailsFragment }) => {
  const quantityPricing = JSON.parse(variant.quantityPricing || "{}");

  const [value5, setValue5] = useState((quantityPricing["5"] as string) || "0");
  const [value10, setValue10] = useState((quantityPricing["10"] as string) || "0");

  const [_, setPricingMutation] = useSetQuantityPricingMutation();

  const onSaveClick = () => {
    console.log("Setting up pricing");
    setPricingMutation({
      id: variant.id,
      pricing: JSON.stringify({ "5": value5, "10": value10 }),
    });
  };

  return (
    <tr key={variant.id}>
      <td>
        {variant.product.name} - {variant.name}
      </td>
      <td style={{ textAlign: "right" }}>{formatPrice(variant.pricing?.price?.gross.amount)}</td>
      <td>
        <Input
          type="number"
          value={value5}
          onChange={(e) => setValue5(e.target.value)}
          endAdornment={<Text variant="caption">USD</Text>}
        />
      </td>
      <td>
        <Input
          type="number"
          value={value10}
          onChange={(e) => setValue10(e.target.value)}
          endAdornment={<Text variant="caption">USD</Text>}
        />
      </td>
      <td>
        <Button variant="tertiary" onClick={onSaveClick}>
          Save
        </Button>
      </td>
    </tr>
  );
};
