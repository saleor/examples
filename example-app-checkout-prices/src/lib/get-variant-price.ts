export const getVariantPrice = (
  quantity: number,
  quantityPricingString: string | undefined | null,
  defaultPrice: number | undefined
) => {
  // No quantity pricing, return default price
  if (!quantityPricingString) {
    return defaultPrice;
  }

  let quantityPricing;

  try {
    // We are expecting the quantity pricing to be a JSON string
    // in format:
    // { "quantity": "price" }
    // So example for 10 items for $5 each and 20 items for $4 each:
    // { "10": "5", "20": "4" }

    quantityPricing = JSON.parse(quantityPricingString);
  } catch {
    // Invalid JSON string, return default price
    return defaultPrice;
  }

  // Lets start with the default price
  let quantityBasedPrice = defaultPrice;

  // Iterate over quantity thresholds and check if the quantity is in the range
  // Assuming thresholds are ordered from the lowest to the highest
  for (const [threshold, price] of Object.entries(quantityPricing)) {
    if (quantity >= parseInt(threshold, 10)) {
      quantityBasedPrice = parseFloat(price as string);
    } else {
      // Threshold is higher than the quantity, so we can break the loop
      break;
    }
  }

  return quantityBasedPrice;
};
