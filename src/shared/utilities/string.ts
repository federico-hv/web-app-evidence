import { URLPattern } from '../constants';

/**
 *
 * @param prefix
 * @param str
 */
export function prefix(prefix: string, str: string) {
  return `${prefix}${str}`;
}

export function matchesPattern(text: string, pattern: RegExp) {
  const patternRegex = new RegExp(pattern);

  return patternRegex.test(text);
}

/*
   Valid URL examples

   https://pages.github.com -> with subdomain
   https://pages.github.com/onepath -> One path
   https://pages.github.com/onepath/twopaths/morepaths -> Multiple paths
   https://random.random.random.pages.github.com -> Multiple subdomains


   Invalid URL examples

   github.com -> No scheme or www subdomain
   www.github.com -> No scheme
   http://pages.github.com -> Not secure

 */
export function isValidURL(url: string) {
  return matchesPattern(url, URLPattern);
}

export function isEmptyString(str?: string) {
  return str === undefined || (str && str.length === 0);
}
