import { invariant } from "@/lib/invariant";

const getDecimalsForKlarna = (currency: string) => {
  invariant(currency.length === 3, "currency needs to be a 3-letter code");

  // ISO 4217
  const { maximumFractionDigits } = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  }).resolvedOptions();

  return maximumFractionDigits;
};

// Some payment methods expect the amount to be in cents (integers)
// Saleor provides and expects the amount to be in dollars (decimal format / floats)
export const getKlarnaIntegerAmountFromSaleor = (major: number, currency?: string) => {
  const decimals = currency ? getDecimalsForKlarna(currency) : 2;
  const multiplier = 10 ** decimals;
  return Number.parseInt((major * multiplier).toFixed(0), 10);
};
