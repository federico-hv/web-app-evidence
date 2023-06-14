import { createContext, useEffect, useState } from 'react';
import { AuthProviderProps, IAuthContext } from './auth-context.type';
import { useQuery } from '@apollo/client';
import { GET_ME } from 'lib';
import { IUserMe, MotionBox } from 'shared';
import { Image, Center, Box } from '@holdr-ui/react';

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

  if (loading) {
    return (
      <Center
        position='fixed'
        h='h-screen'
        w='w-screen'
        bgColor='primary400'
      >
        <MotionBox
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: 'easeInOut', duration: 1 }}
        >
          <Image
            loading='eager'
            size={100}
            src='logo-dark.png'
            alt='holdr logo'
            fallback={<Box />}
          />
        </MotionBox>
      </Center>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
