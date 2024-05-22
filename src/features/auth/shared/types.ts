import { Dispatch, ReactNode, SetStateAction } from 'react';
import { IMe } from '../../../shared';

export interface IAuthContext {
  currentUser: IMe;
  setCurrentUser: Dispatch<SetStateAction<IMe>>;
}

export interface AuthProviderProps {
  children?: ReactNode;
}
