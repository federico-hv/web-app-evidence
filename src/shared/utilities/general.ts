import { prefix } from './string';
import { join } from 'lodash';
import { SocialProviderNameEnum } from '../constants';
import { ICreateSocialLink } from '../interfaces';

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

export function isLengthGreaterThanZero(arr: any | undefined): boolean {
  if (arr === undefined || !arr) {
    return false;
  }
  return arr.length > 0;
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

/* Generate a random alphabetic string of some size.
 *
 * @param length The length of the string to be generated
 */
export function generateRandomString(length: number): string {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/**
 * Encrypt data using SHA-256 encryption algorithm.
 *
 * @param data
 */
export async function encrypt(data: BufferSource): Promise<ArrayBuffer> {
  return await window.crypto.subtle.digest('SHA-256', data);
}

/**
 * Encode a string to base64 representation.
 *
 * @param data
 */
function base64encode(data: any) {
  return btoa(String.fromCharCode(...new Uint8Array(data)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Generates a base64 representation of the codeVerifier text
 *
 * @param codeVerifier text
 */
export async function generateCodeChallenge(
  codeVerifier: string,
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await encrypt(data);

  return base64encode(digest);
}

/**
 * Generates a random number between 0 and n
 *
 * @param n the max number
 */
export function getRandomNumber(n: number) {
  return Math.floor(Math.random() * (n + 1));
}

/**
 * Generates a random number between n and m
 *
 * @param n the min number
 * @param m the max number
 */
export function getRandomNumberInRange(n: number, m: number) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

export function parseSocialLinks(state: {
  instagramUrl: string;
  tiktokUrl: string;
  xUrl: string;
}): ICreateSocialLink[] {
  return Object.keys(state)
    .map((key): ICreateSocialLink | undefined => {
      if (key === 'instagramUrl') {
        return {
          provider: SocialProviderNameEnum.Instagram,
          url: state[key],
        };
      } else if (key === 'tiktokUrl') {
        return {
          provider: SocialProviderNameEnum.TikTok,
          url: state[key],
        };
      } else if (key === 'xUrl') {
        return {
          provider: SocialProviderNameEnum.X,
          url: state[key],
        };
      }
    })
    .filter((item: ICreateSocialLink | undefined) => {
      if (item === undefined) return false;

      return item.url.length !== 0;
    }) as Array<ICreateSocialLink>;
}
