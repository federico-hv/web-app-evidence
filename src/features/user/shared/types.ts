export interface ProfileFormData {
  displayName: string;
  bio?: string;
  avatar?: File;
  coverImage?: File;
}

export interface UpdateProfilePayload {
  payload: ProfileFormData;
}
