import { isNotNullish, toStringOrEmpty } from "../../lib/utils";

export const OBFUSCATION_DOTS = "••••";

export const obfuscateValue = (value: string) => {
  const unbofuscatedLength = Math.min(4, value.length - 4);

  if (unbofuscatedLength <= 0) {
    return OBFUSCATION_DOTS;
  }

  const visibleValue = value.slice(-unbofuscatedLength);
  return `${OBFUSCATION_DOTS}${visibleValue}`;
};

export const deobfuscateValues = (values: Record<string, unknown>) => {
  const entries = Object.entries(values).map(
    ([key, value]) =>
      [key, toStringOrEmpty(value).includes(OBFUSCATION_DOTS) ? null : value] as [string, unknown],
  );
  return Object.fromEntries(entries);
};

export const filterConfigValues = <T extends Record<string, unknown>>(values: T) => {
  const entries = Object.entries(values).filter(
    ([_, value]) => value !== null && value !== undefined,
  );
  return Object.fromEntries(entries);
};

export const obfuscateConfig = <T extends {}>(config: T): T => {
  const entries = Object.entries(config).map(([key, value]) => [
    key,
    isNotNullish(value) ? obfuscateValue(toStringOrEmpty(value)) : value,
  ]);

  return Object.fromEntries(entries) as T;
};
