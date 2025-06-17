import { describe, expect, it, vi } from "vitest";
import { tryIgnore, tryJsonParse, toStringOrEmpty, unpackPromise, unpackThrowable } from "./utils";
import { BaseError } from "@/errors";

describe("api-route-utils", () => {
  describe("tryIgnore", () => {
    it("should run the function", () => {
      const fn = vi.fn();
      expect(() => tryIgnore(fn)).not.toThrow();
      expect(fn).toHaveBeenCalledOnce();
    });

    it("should ignore errors", () => {
      expect(() =>
        tryIgnore(() => {
          throw new Error("Error!");
        }),
      ).not.toThrow();
    });
  });

  describe("tryJsonParse", () => {
    it("should ignore empty input", () => {
      expect(tryJsonParse("")).toBeUndefined();
      expect(tryJsonParse(undefined)).toBeUndefined();
    });

    it("should try parsing to JSON", () => {
      expect(tryJsonParse('{"a": 123, "b": {"c": "aaa"}}')).toEqual({ a: 123, b: { c: "aaa" } });
    });

    it("should return original input in case of error", () => {
      expect(tryJsonParse('{"a": 123, "b" {"c": "aaa"}}')).toBe('{"a": 123, "b" {"c": "aaa"}}');
    });
  });

  describe("toStringOrEmpty", () => {
    it("should return value if it's a string", () => {
      expect(toStringOrEmpty("")).toBe("");
      expect(toStringOrEmpty("some string")).toBe("some string");
    });

    it.each([0, 1, 1n, {}, [], undefined, null, false, true])(
      "should return empty string if value is not a string: %p",
      (value) => {
        expect(toStringOrEmpty(value)).toBe("");
      },
    );
  });

  describe("unpackPromise", () => {
    it("returns value if promise resolves", async () => {
      const [error, value] = await unpackPromise(Promise.resolve("some value"));
      expect(error).toBeNull();
      expect(value).toBe("some value");
    });

    it("returns error if promise rejects", async () => {
      const [error, value] = await unpackPromise(Promise.reject("some error"));
      expect(error).toMatchInlineSnapshot("[UnknownError: some error]");
      expect(value).toBeNull();
    });

    it("preserves error if it's BaseError or descendants", async () => {
      const SomeError = BaseError.subclass("SomeError");
      const [error, value] = await unpackPromise(Promise.reject(new SomeError("some error")));
      expect(error).toMatchInlineSnapshot("[SomeError: some error]");
      expect(value).toBeNull();
    });
  });

  describe("unpackThrowable", () => {
    it("returns value if promise resolves", async () => {
      const [error, value] = unpackThrowable(() => {
        return "some value";
      });
      expect(error).toBeNull();
      expect(value).toBe("some value");
    });

    it("returns error if promise rejects", async () => {
      const [error, value] = unpackThrowable(() => {
        throw new Error("some error");
      });
      expect(error).toMatchInlineSnapshot("[Error: some error]");
      expect(value).toBeNull();
    });

    it("preserves error if it's BaseError or descendants", async () => {
      const SomeError = BaseError.subclass("SomeError");
      const [error, value] = unpackThrowable(() => {
        throw new SomeError("some error");
      });
      expect(error).toMatchInlineSnapshot("[SomeError: some error]");
      expect(value).toBeNull();
    });
  });
});
