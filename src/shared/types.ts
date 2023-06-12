export interface IUserSm {
  username: string;
  displayName: string;
  avatar: string;
}

export interface IUserMe {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  role: Role;
}

export interface IProfile {
  username: string;
  displayName: string;
  coverImage?: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
}

export interface IFindUser {
  username: string;
  displayName: string;
  id: string;
  avatar: string;
}

export interface FormProps<T> {
  isLoading?: boolean;
  onSubmit: (data: T) => Promise<void>;
  onFinish: () => void;
}

export interface ProfileFormData {
  displayName: string;
  bio?: string;
  avatar?: File;
  coverImage?: File;
}

export interface UpdateProfilePayload {
  payload: ProfileFormData;
}

export type UpdateProfileData = { updateProfile: IProfile };

export type Role = 'general' | 'artist';

export type GenericItem = { id: StringNumeric };

export type StringNumeric = string | number;
