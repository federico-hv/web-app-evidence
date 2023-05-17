export interface IUserSm {
  username: string;
  displayName: string;
  avatar: string;
}

export interface IUserMe {
  username: string;
  displayName: string;
  avatar: string;
  role: string;
  id: string;
}

export type GenericItem = { id: StringNumeric };

export type StringNumeric = string | number;
