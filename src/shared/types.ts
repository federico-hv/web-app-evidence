import { IProfile, IStatus } from './interfaces';

export type ProviderName = 'google' | 'spotify' | 'apple';

export type UpdateProfileData = { updateProfile: IProfile };

export type UpdatePasswordData = { updatePassword: IStatus };

export type Role = 'general' | 'artist';

export type GenericItem = { id: StringNumeric };

export type StringNumeric = string | number;
