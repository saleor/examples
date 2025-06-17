import { sprinkles } from "@saleor/macaw-ui/next/theme";
import { style } from "@vanilla-extract/css";

export const link = style(
  [
    sprinkles({
      color: "textNeutralDefault",
    }),
  ],
  "link",
);
export const separator = style(
  [
    sprinkles({
      marginX: 2,
      fontSize: "heroSmall",
    }),
    {
      verticalAlign: "text-bottom",
    },
  ],
  "separator",
);
