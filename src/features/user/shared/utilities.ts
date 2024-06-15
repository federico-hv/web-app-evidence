import { ISocialLink, SocialProvider } from '../../../shared';

/**
 * Check for a social link item in a list of social links.
 *
 * @param links
 * @param provider
 */
export function retrieveSocialLink(
  links: ISocialLink[],
  provider: SocialProvider,
): ISocialLink | undefined {
  return links.find((item) => item.provider === provider);
}
