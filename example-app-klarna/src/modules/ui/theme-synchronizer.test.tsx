import { describe, expect, it, vi } from "vitest";
import { type AppBridgeState } from "@saleor/app-sdk/app-bridge";
import { render, waitFor } from "@testing-library/react";
import { type ThemeTokensValues, type DefaultTheme } from "@saleor/macaw-ui/next";
import { ThemeSynchronizer } from "./theme-synchronizer";

const appBridgeState: AppBridgeState = {
  ready: true,
  token: "token",
  domain: "some-domain.saleor.cloud",
  theme: "dark",
  path: "/",
  locale: "en",
  id: "app-id",
  saleorApiUrl: "https://some-domain.saleor.cloud/graphql/",
};

const mockThemeChange = vi.fn();

vi.mock("@saleor/app-sdk/app-bridge", () => {
  return {
    useAppBridge() {
      return {
        appBridgeState: appBridgeState,
      };
    },
  };
});

vi.mock("@saleor/macaw-ui/next", () => {
  return {
    useTheme() {
      return {
        setTheme: mockThemeChange,
        theme: "defaultLight",
        themeValues: {} as ThemeTokensValues,
      } satisfies ReturnType<typeof import("@saleor/macaw-ui/next").useTheme>;
    },
  } satisfies Pick<typeof import("@saleor/macaw-ui/next"), "useTheme">;
});

describe("ThemeSynchronizer", () => {
  it("Updates MacawUI theme when AppBridgeState theme changes", () => {
    render(<ThemeSynchronizer />);

    return waitFor(() => {
      expect(mockThemeChange).toHaveBeenCalledWith<[DefaultTheme]>("defaultDark");
    });
  });
});
