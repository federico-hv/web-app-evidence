import { IProfile, ProfileFormData } from '../shared';

export function getCookie(name: string) {
  return name;
}

export function parseToProfileFormData(
  profile: IProfile,
): ProfileFormData {
  return {
    avatar: profile.avatar,
    displayName: profile.displayName,
    bio: profile.bio || '',
    coverImage: profile.coverImage,
  };
}
