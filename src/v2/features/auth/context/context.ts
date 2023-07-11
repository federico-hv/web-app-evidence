import { createContext } from 'react';
import { IAuthContext } from '../shared';

const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentUser: () => {},
});

export default AuthContext;
