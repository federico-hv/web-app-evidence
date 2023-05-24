export interface IUserSm {
  username: string;
  displayName: string;
  avatar: string;
}

export interface IUserMe {
  username: string;
  displayName: string;
  avatar: string;
  role: Role;
  id: string;
}

export type GenericItem = { id: StringNumeric };

export type StringNumeric = string | number;

export type AccountType = 'FAN' | 'PERSONAL' | 'ARTIST';

export interface IProfile {
  accountType: AccountType;
  username: string;
  displayName: string;
  connected: boolean;
  coverImage: string;
  avatar: string;
  url?: string;
  bio?: string;
  holdrs?: number;
  memberships?: number;
}

export interface IAccount {
  username: string;
  displayName: string;
  role: string;
  id: string;
  avatar: string;
}

export type Role = 'FAN' | 'ARTIST';
