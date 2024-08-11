import { createContext } from 'react';
import { IAuthContext } from './types';
import { UserRoleEnum } from '../../user';

const AuthContext = createContext<IAuthContext>({
  currentUser: {
    id: '',
    username: '',
    displayName: '',
    avatar: '',
    role: UserRoleEnum.GeneralUser,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentUser: () => {},
});

const AuthContextProvider = AuthContext.Provider;

export { AuthContext, AuthContextProvider };
