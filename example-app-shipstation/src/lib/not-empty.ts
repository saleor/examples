/**
 * Returns true if the value is not null or undefined. Can be used to filter arrays and keep type safety.
 */
export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}
