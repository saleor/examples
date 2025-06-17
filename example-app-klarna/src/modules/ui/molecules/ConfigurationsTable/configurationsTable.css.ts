import { sprinkles } from "@saleor/macaw-ui/next/theme";
import { style } from "@vanilla-extract/css";

export const summaryColumnTd = style(
  [
    sprinkles({
      paddingLeft: 8,
    }),
    {
      width: "50%",
    },
  ],
  "summaryColumnTd",
);
export const actionsColumnTd = style(
  [
    sprinkles({
      textAlign: "right",
    }),
  ],
  "actionsColumnTd",
);
