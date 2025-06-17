import { type ThemeType, useAppBridge } from "@saleor/app-sdk/app-bridge";
import { type DefaultTheme, useTheme } from "@saleor/macaw-ui/next";
import { memo, useEffect } from "react";

const mapAppBridgeToMacawTheme: Record<ThemeType, DefaultTheme> = {
  light: "defaultLight",
  dark: "defaultDark",
};

/**
 * Macaw-ui stores its theme mode in memory and local storage. To synchronize App with Dashboard,
 * Macaw must be informed about this change from AppBridge.
 *
 * If you are not using Macaw, you can remove this.
 */
export const ThemeSynchronizer = memo(function ThemeSynchronizer() {
  const { appBridgeState } = useAppBridge();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    if (!setTheme || !appBridgeState?.theme) {
      return;
    }

    const mappedAppBridgeTheme = mapAppBridgeToMacawTheme[appBridgeState?.theme];

    if (theme !== mappedAppBridgeTheme) {
      setTheme(mappedAppBridgeTheme);
    }
  }, [appBridgeState?.theme, setTheme, theme]);

  return null;
});
