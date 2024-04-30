import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Center, Box, useWindowSize, Icon } from '@holdr-ui/react';
import { motion } from 'framer-motion';
import { GenericProps, IMe, Loader } from '../../shared';
import { AuthContextProvider, AuthProviderProps } from './shared';
import { GET_ME } from './queries';

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
  return (
    <AuthContextProvider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContextProvider>
  );
}

function FullPageLoadingFallback() {
  return (
    <Center position='fixed' h='h-screen' w='w-screen' bgColor='#141317'>
      <MotionBox
        fontSize='4.5rem'
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
      >
        <Icon name='logo-small' />
      </MotionBox>
    </Center>
  );
}

export { AuthProvider };
