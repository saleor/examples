import ModernError from "modern-errors";
import modernErrorsSerialize from "modern-errors-serialize";

export const BaseError = ModernError.subclass("BaseError", {
  plugins: [modernErrorsSerialize],
});

// Critical errors are reported to Sentry.
export const CriticalError = BaseError.subclass("CriticalError", {});

// Expected errors are not reported to Sentry.
export const ExpectedError = BaseError.subclass("ExpectedError", {});
