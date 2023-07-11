import { IProfile, ProfileFormData } from '../shared';

/**
 * Parse profile interfaces to acceptable form fields
 * @param profile
 */
export function parseToProfileFormData(
  profile: IProfile,
): ProfileFormData {
  return {
    displayName: profile.displayName,
    bio: profile.bio || '',
    avatar: undefined,
    coverImage: undefined,
  };
}

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
