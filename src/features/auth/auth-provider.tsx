import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Image, Center, Box, useWindowSize } from '@holdr-ui/react';
import { motion } from 'framer-motion';
import { GenericProps, IMe, Loader } from '../../shared';
import { AuthContextProvider, AuthProviderProps } from './shared';
import { GET_ME } from './queries';
import { usePushToPendo } from '../tracking';

const MotionBox = motion(Box);

function AuthProvider({ children }: AuthProviderProps) {
  const { height } = useWindowSize();
  const { data, loading } = useQuery<{ me: IMe }>(GET_ME);

  return (
    <Loader loading={loading} h={height} as={<FullPageLoadingFallback />}>
      <Content data={data ? data.me : null}>{children}</Content>
    </Loader>
  );
}
AuthProvider.displayName = 'AuthProvider';

function Content({ children, data }: GenericProps & { data: IMe | null }) {
  const [currentUser, setCurrentUser] = useState<IMe | null>(data);

  usePushToPendo();

  return (
    <AuthContextProvider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContextProvider>
  );
}

function FullPageLoadingFallback() {
  return (
    <Center position='fixed' h='h-screen' w='w-screen' bgColor='white50'>
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

export { AuthProvider };
