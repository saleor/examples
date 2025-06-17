import { render, screen } from "@testing-library/react";
import { expect, vi, describe, it } from "vitest";
import IndexPage from "../../pages";

vi.mock("@saleor/app-sdk/app-bridge", () => {
  return {
    useAppBridge: () => ({
      appBridgeState: {},
      appBridge: {},
    }),
  };
});

describe("App", () => {
  it("renders text", () => {
    render(<IndexPage />);

    expect(
      screen.getByText("Install this app in your Dashboard", { exact: false }),
    ).toBeInTheDocument();
  });
});
