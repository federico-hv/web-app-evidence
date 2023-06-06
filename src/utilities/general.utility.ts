import { IProfile, ProfileFormData } from '../shared';

export function parseToProfileFormData(
  profile: IProfile,
): ProfileFormData {
  return {
    displayName: profile.displayName,
    biography: profile.biography || '',
    avatar: undefined,
    coverImage: undefined,
  };
}
