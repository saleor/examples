import { sprinkles } from "@saleor/macaw-ui/next";
import { style } from "@vanilla-extract/css";

export const fileUploadInput = style([
  sprinkles({
    color: "textNeutralSubdued",
    backgroundColor: {
      default: "surfaceNeutralHighlight",
      hover: "surfaceNeutralPlain",
    },
    borderRadius: 3,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: "transparent",
      hover: "neutralHighlight",
    },
    paddingX: 2,
    cursor: "pointer",
    flexGrow: "1",
    display: "flex",
    alignItems: "center",
  }),
  { height: 56 },
]);
