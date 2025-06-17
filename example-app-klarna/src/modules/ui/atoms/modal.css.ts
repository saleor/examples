import { sprinkles } from "@saleor/macaw-ui/next";
import { style } from "@vanilla-extract/css";

export const modal = style(
  [
    sprinkles({
      backgroundColor: "surfaceNeutralPlain",
      borderRadius: 4,
      position: "fixed",
      padding: 5,
      boxShadow: "modal",
    }),
    {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "30rem",
    },
  ],
  "modal",
);

export const modalOverlay = style(
  [
    sprinkles({
      backgroundColor: "surfaceNeutralSubdued",
      position: "fixed",
      inset: 0,
    }),
    {
      opacity: 0.6,
    },
  ],
  "modalOverlay",
);
