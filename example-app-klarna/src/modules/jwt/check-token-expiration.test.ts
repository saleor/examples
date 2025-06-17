import { createSecretKey } from "crypto";
import { describe, it, expect, vi } from "vitest";
import { SignJWT } from "jose";
import { checkTokenExpiration } from "./check-token-expiration";

describe("checkTokenExpiration", () => {
  const secretKey = createSecretKey("test", "utf-8");

  it("returns false if token is undefined", () => {
    expect(checkTokenExpiration(undefined)).toBe(false);
  });

  it("returns false if token doesn't have expire date", async () => {
    // create JWT token without exp claim
    const jwt = await new SignJWT({ id: "12345" })
      .setProtectedHeader({ alg: "HS256" })
      .sign(secretKey);
    expect(checkTokenExpiration(jwt)).toBe(false);
  });

  it("returns false if token is not expired", async () => {
    const jwt = await new SignJWT({ id: "12345" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("5s")
      .sign(secretKey);
    expect(checkTokenExpiration(jwt)).toBe(false);
  });

  it("returns true if token is expired", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2000, 1, 1, 13, 1, 1));

    const jwt = await new SignJWT({ id: "12345" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1s")
      .sign(secretKey);

    vi.setSystemTime(new Date(2000, 1, 1, 13, 1, 11)); // 10 seconds later

    expect(checkTokenExpiration(jwt)).toBe(true);

    vi.useRealTimers();
  });
});
