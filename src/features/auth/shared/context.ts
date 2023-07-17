import { createContext } from 'react';
import { IAuthContext } from './types';

const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentUser: () => {},
});

const AuthContextProvider = AuthContext.Provider;

export { AuthContext, AuthContextProvider };
