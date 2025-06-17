import { describe, expect, it } from "vitest";
import { invariant } from "./invariant";

describe("invariant", () => {
  it.each([0, "", null, undefined, 0n])("should throw for %p", (value) => {
    expect(() => invariant(value)).toThrowError("Invariant failed: ");
    expect(() => invariant(value, "some message")).toThrowError("Invariant failed: some message");
  });

  it.each([true, 1, "some str", {}, [], 123n])("should not throw for %p", (value) => {
    expect(() => invariant(value)).not.toThrowError();
  });
});
