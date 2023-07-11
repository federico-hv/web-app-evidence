import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Image, Center, Box } from '@holdr-ui/react';
import { motion } from 'framer-motion';
import { IMe } from '../../shared';
import { AuthProviderProps } from './shared';
import { GET_ME } from './queries';
import { AuthContext } from './context';

const MotionBox = motion(Box);

function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<IMe | null>(null);
  const { data, loading, error } = useQuery<{ me: IMe }>(GET_ME);

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
AuthProvider.displayName = 'AuthProvider';

export { AuthProvider };
