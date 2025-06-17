export const getSequraIntegerAmountFromSaleor = (amount: number, _currency: string) =>
  Math.round(amount * 100);
