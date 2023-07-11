import { Dispatch, ReactNode, SetStateAction } from 'react';
import { IMe } from '../../../shared';

export interface IAuthContext {
  currentUser: IMe | null;
  setCurrentUser: Dispatch<SetStateAction<IMe | null>>;
}

export interface AuthProviderProps {
  children?: ReactNode;
}
