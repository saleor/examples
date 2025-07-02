import { sprinkles } from "@saleor/macaw-ui/next/theme";
import { style } from "@vanilla-extract/css";

export const dropdownColumnTd = style(
  [
    sprinkles({
      paddingLeft: 10,
    }),
    {
      width: "50%",
    },
  ],
  "summaryColumnTd",
);
export const statusColumnTd = style(
  [
    sprinkles({
      textAlign: "right",
      paddingLeft: 10,
    }),
  ],
  "actionsColumnTd",
);
export const td = style([{ verticalAlign: "middle" }], "td");
