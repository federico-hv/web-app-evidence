import { Dispatch, ReactNode, SetStateAction } from 'react';
import { IUserMe } from 'shared';

export interface IAuthContext {
  currentUser: IUserMe | null;
  setCurrentUser?: Dispatch<SetStateAction<IUserMe | null>>;
}

export interface AuthProviderProps {
  children?: ReactNode;
}
