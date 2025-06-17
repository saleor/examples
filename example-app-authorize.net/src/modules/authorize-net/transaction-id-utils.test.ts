import { describe, it, expect } from "vitest";
import { base64WithoutPaddingConverter } from "./transaction-id-utils";

describe("base64WithoutPaddingConverter", () => {
  const STEP = 1669;
  const MAX = 100000000;
  it("should work for Saleor IDs", () => {
    // try wide range of different numbers
    for (let i = 1; i <= MAX; i += STEP) {
      const id = `User:${i}`;
      expect(base64WithoutPaddingConverter.atob(base64WithoutPaddingConverter.btoa(id))).toEqual(
        id,
      );
    }
  });

  it("should not include =", () => {
    // try wide range of different numbers
    for (let i = 1; i <= MAX; i += STEP) {
      const id = `User:${i}`;
      expect(base64WithoutPaddingConverter.btoa(id)).not.toContain("=");
    }
  });
});
