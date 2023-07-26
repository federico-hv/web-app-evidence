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
