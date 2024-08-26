import { Role } from '../types';
import { UserRoleEnum } from '../../features';

export interface UserModel {
  username: string;
  displayName: string;
  id: string;
  avatar: string;
  role: Role;
}

export interface IUser {
  username: string;
  displayName: string;
  id: string;
  avatar: string;
  role: Role;
}

export interface IMe {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  role: UserRoleEnum;
}

export interface IFetchUsersResponse {
  total: number;
  users: UserModel[];
}
