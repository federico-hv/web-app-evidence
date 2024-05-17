import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, useWindowSize } from '@holdr-ui/react';
import { motion } from 'framer-motion';
import { FullPageLoader, GenericProps, IMe, Loader } from '../../shared';
import { AuthContextProvider, AuthProviderProps } from './shared';
import { GET_ME } from './queries';

function AuthProvider({ children }: AuthProviderProps) {
  const { height } = useWindowSize();
  const { data, loading } = useQuery<{ me: IMe }>(GET_ME);

  return (
    <Loader loading={loading} h={height} as={<FullPageLoader />}>
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

export { AuthProvider };
