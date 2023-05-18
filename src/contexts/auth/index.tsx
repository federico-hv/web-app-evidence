import { createContext, useEffect, useState } from 'react';
import { AuthProviderProps, IAuthContext } from './auth-context.type';
import { useQuery } from '@apollo/client';
import { GET_ME } from 'lib';
import { IUserMe } from 'shared';

const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentUser: () => {},
});

function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<IUserMe | null>(null);
  const { data, loading, error } = useQuery<{ me: IUserMe }>(GET_ME);

  useEffect(() => {
    if (!loading && !error && data) {
      setCurrentUser(() => data.me);
    }
  }, [loading, error, data]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
