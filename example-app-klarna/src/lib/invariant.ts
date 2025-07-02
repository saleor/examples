import ModernError from "modern-errors";

export const InvariantError = ModernError.subclass("InvariantError");

export function invariant(condition: unknown, message?: string): asserts condition {
  if (!condition) {
    const err = new InvariantError(`Invariant failed: ${message || ""}`);
    // remove utils.js from stack trace for better error messages
    const stack = (err.stack ?? "").split("\n");
    stack.splice(1, 1);
    err.stack = stack.join("\n");
    throw err;
  }
}

/* c8 ignore start */
export function assertUnreachableButNotThrow(_: never) {
  return null as never;
}
/* c8 ignore stop */
