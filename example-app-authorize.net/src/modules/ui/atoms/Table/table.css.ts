import { sprinkles } from "@saleor/macaw-ui/next";
import { style } from "@vanilla-extract/css";

export const table = style(
  [
    sprinkles({ width: "100%" }),
    {
      borderCollapse: "collapse",
    },
  ],
  "table",
);
export const thead = style([sprinkles({})], "thead");
export const tbody = style([sprinkles({})], "tbody");

export const tr = style([sprinkles({})], "tr");
// --mu-space-0: 0px;
// --mu-space-1: 1px;
// --mu-space-2: 2px;
// --mu-space-3: 4px;
// --mu-space-4: 6px;
// --mu-space-5: 8px;
// --mu-space-6: 12px;
// --mu-space-7: 16px;
// --mu-space-8: 20px;
// --mu-space-9: 24px;
// --mu-space-10: 30px;
// --mu-space-11: 32px;
// --mu-space-12: 38px;
// --mu-space-13: 40px;

export const th = style(
  [
    sprinkles({
      color: "textNeutralSubdued",
      fontSize: "captionMedium",
      fontWeight: "captionMedium",
      paddingTop: 0.5,
      paddingBottom: 3,
      paddingLeft: 8,
    }),
    {
      textAlign: "left",
      selectors: {
        "&:first-child": {
          paddingLeft: 0,
        },
      },
    },
  ],
  "th",
);

export const td = style(
  [
    sprinkles({
      paddingTop: 2,
      paddingBottom: 3,
      borderTopWidth: 1,
      borderTopStyle: "solid",
      borderColor: "neutralPlain",
      paddingLeft: 8,
    }),
    {
      verticalAlign: "top",
      selectors: {
        "&:first-child": {
          paddingLeft: 0,
        },
      },
    },
  ],
  "td",
);
