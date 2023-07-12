import { Role } from '../../../v1/shared';

export interface IUser {
  username: string;
  displayName: string;
  id: string;
  avatar: string;
}

export interface IMe {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  role: Role;
}
