/**
 * Get the formatted price value. No currency.
 *
 * @param priceVal a number (i.e. the price can be negative, if it represents a change in price)
 * @returns a string that formats the price value, e.g. a price of 5 gives "5.00"
 */

export const getFormattedPriceVal = (priceVal: number) => {
  if (priceVal === 0) {
    return '0';
  } else if (priceVal > 0) {
    return priceVal.toFixed(2);
  } else {
    return Math.abs(priceVal).toFixed(2);
  }
};
