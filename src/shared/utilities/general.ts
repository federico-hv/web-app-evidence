import { prefix } from './string';
import { join } from 'lodash';

//TODO: Rename this file to common

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

/**
 * Dummy function
 */
export function voidFn() {
  return;
}

/**
 * Creates a sub-arrays of size 'groupsOf'.
 *
 * @param arr
 * @param groupsOf
 */
export function groupArray<T>(arr: T[], groupsOf: number): T[][] {
  // Check if we can create groups of equal size
  if (arr.length % groupsOf !== 0) {
    return [];
  }

  const newArr = [];
  let cursor = 0;

  while (cursor < arr.length) {
    // create a subgroup
    newArr.push(arr.slice(cursor, cursor + groupsOf));

    // move cursor to next group index
    cursor += groupsOf;
  }

  return newArr;
}

/**
 * Returns an url path.
 *
 * @param paths string array of paths to be joined
 * @param prefixStr prefix the path with a '/'
 */
export function makePath(paths: string[], prefixStr = '/') {
  return prefix(prefixStr, join(paths, '/'));
}

/**
 * Makes an item into an array
 *
 * @param item any data item
 */
export function makeArray(item: any): any[] {
  if (!Array.isArray(item)) {
    return [item];
  }
  return item;
}
