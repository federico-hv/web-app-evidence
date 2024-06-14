import { createContext } from 'react';
import { IAuthContext } from './types';

const AuthContext = createContext<IAuthContext>({
  currentUser: {
    id: '',
    username: '',
    displayName: '',
    avatar: '',
    role: 'general',
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentUser: () => {},
});

const AuthContextProvider = AuthContext.Provider;

export { AuthContext, AuthContextProvider };
