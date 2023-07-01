import { ProviderName, Role } from './types';
import { ReactNode } from 'react';

export interface GenericProps {
  children?: ReactNode;
}

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
  // TODO: Get role
  username: string;
  protected: boolean;
  displayName: string;
  coverImage?: string;
  avatar?: string;
  bio?: string;
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

// TODO: Move this into the query/mutation types
export interface TwoFAAppRegistrationModel {
  code: string;
  qrCodeUrl: string;
}

export interface EnableTwoFAInput {
  channel: string;
  code: string;
}
