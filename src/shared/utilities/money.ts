/**
 * Get the formatted price value. No currency.
 *
 * @param value a number (i.e. the price can be negative, if it represents a change in price)
 * @returns a string that formats the price value, e.g. a price of 5 gives "5.00"
 */

export const formatMoney = (value: number) => {
  return Math.abs(value).toFixed(2);
};
