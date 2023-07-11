import { IProfile, ProfileFormData } from '../../../../v1/shared';

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
