import { UserModel } from '../../../shared';

/**
 * Get text to display next to the mutual user avatars
 *
 * @param users mutual users
 * @param total total number of mutual users
 */
export function getMutualFollowersText(
  users: UserModel[],
  total = 0,
): string {
  if (total > 2) {
    return `Followed by ${users[0].displayName}, ${
      users[1].displayName
    } and ${total - 2} more.`;
  } else if (total === 2) {
    return `Followed by ${users[0].displayName} and ${users[1].displayName}.`;
  } else if (total === 1) {
    return `Followed by ${users[0].displayName}.`;
  }
  return '';
}
