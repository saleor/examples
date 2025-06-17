export const formatPrice = (price: number | undefined | null) => {
  if (price === undefined || price === null) {
    return "No price available";
  }
  return new Intl.NumberFormat("en-EN", { style: "currency", currency: "USD" }).format(price);
};
