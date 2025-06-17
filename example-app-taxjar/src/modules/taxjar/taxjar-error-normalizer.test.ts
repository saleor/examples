import { normalizeTaxJarError } from "./taxjar-error-normalizer";
import { TaxExternalError } from "../taxes/tax-error";
import { describe, it, expect } from "vitest";
import { TaxjarError } from "taxjar/dist/util/types";

describe("normalizeTaxJarError", () => {
  it("should return a TaxExternalError with the original error message", () => {
    const errorMessage = "An error occurred";
    const error: unknown = new Error(errorMessage);

    const result = normalizeTaxJarError(error);

    expect(result).toBeInstanceOf(TaxExternalError);
    expect(result.message).toBe(errorMessage);
  });

  it("should return a TaxExternalError with a custom message if the error is a TaxjarError", () => {
    const error = new TaxjarError("Unauthorized", "Invalid API key", 401);

    const result = normalizeTaxJarError(error);

    expect(result).toBeInstanceOf(TaxExternalError);
    expect(result.message).toBe("TaxjarError: Unauthorized - Invalid API key");
  });
});
