import { globalStyle } from "@vanilla-extract/css";

globalStyle("#__next", {
  padding: "1rem 2rem",
});

globalStyle("*", {
  WebkitFontSmoothing: "subpixel-antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle(".visually-hidden", {
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
});
