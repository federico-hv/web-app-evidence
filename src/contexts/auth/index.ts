import { createContext } from 'react';
import { IAuthContext } from './auth-context.type';

const AuthContext = createContext<IAuthContext>({});

const AuthContextProvider = AuthContext.Provider;

export { AuthContext, AuthContextProvider };
