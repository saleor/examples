import ModernError from "modern-errors";
import modernErrorsSerialize from "modern-errors-serialize";

export const BaseError = ModernError.subclass("BaseError", {
  plugins: [modernErrorsSerialize],
});

export const CriticalError = BaseError.subclass("CriticalError", {});

export const ExpectedError = BaseError.subclass("ExpectedError", {});
