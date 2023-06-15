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
  onFinish: (data?: any) => void;
}

export interface ProfileFormData {
  displayName: string;
  bio?: string;
  avatar?: File;
  coverImage?: File;
}

export interface UpdatePasswordFormData {
  currentPassword: string;
  newPassword: string;
  newPasswordVerification: string;
}

export interface UpdateProfilePayload {
  payload: ProfileFormData;
}

export interface UpdatePasswordPayload {
  payload: UpdatePasswordFormData;
}

export interface IAccountInfo {
  email: string;
  username: string;
  phone: string;
  country: string;
  gender: string;
  birthday: string;
  protected: boolean;
}

export interface IProviderItem {
  name: string;
  image: string;
}

export interface IDate {
  month: string;
  day: string;
  year: string;
}

export interface ConnectedAccount {
  provider: ProviderName;
  email: string;
}

export interface IStatus {
  status: boolean;
  message: string;
}

export type ProviderName = 'google' | 'spotify' | 'apple';

export type UpdateProfileData = { updateProfile: IProfile };

export type UpdatePasswordData = { updatePassword: IStatus };

export type Role = 'general' | 'artist';

export type GenericItem = { id: StringNumeric };

export type StringNumeric = string | number;
