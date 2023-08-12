/**
 * Returns an array containing numbers from 0,...,n
 *
 * @param n the number of elements in the array
 */
export function arrayFrom(n: number): Array<number> {
  return Array.from(Array(n).keys());
}

/**
 * A dummy function
 * @constructor
 */
export const dummyFn = () => console.log('');

/**
 *
 * @param url
 */
export function getUrlDomain(url: string) {
  const urlSplits = url.split('.');

  if (urlSplits && urlSplits[0] === 'www') {
    return urlSplits.slice(1).join('.');
  } else if (urlSplits) {
    return urlSplits.join('.');
  }

  return;
}

/**
 *
 * @param hex
 * @param alpha
 */
export function hexToRGB(hex: string, alpha = 1) {
  if (hex === undefined || !/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    return hex;
  }

  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r},${g},${b},${alpha})`;
}
