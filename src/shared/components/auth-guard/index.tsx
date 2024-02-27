import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthGuardProps } from './types';
import NotFoundError from '../not-found-error';
import { Paths, prefix } from '../../index';
import { useCurrentUser } from '../../../features';
import { Box, Center, Text } from '@holdr-ui/react';

function AuthGuard({ roles = ['general', 'artist'] }: AuthGuardProps) {
  const currentUser = useCurrentUser();
  const location = useLocation();

  console.log({ currentUser });

  return (
    <>
      {currentUser && roles.includes(currentUser.role) ? (
        <Outlet />
      ) : currentUser && !roles.includes(currentUser.role) ? (
        <NotFoundError />
      ) : (
        <Center
          w='100%'
          color='base800'
          bgColor='info200'
          p={6}
          radius={1}
        >
          <Box>
            <Text weight={600}>Status:</Text>
          </Box>
          <Box ml={1}>
            Application environment is currently being updated
          </Box>
        </Center>
        // <Navigate
        //   to={prefix(
        //     '/',
        //     `${Paths.authRedirect}?from=${location.pathname}`,
        //   )}
        //   state={{ from: location }}
        //   // replace
        // />
      )}
    </>
  );
}

AuthGuard.displayName = 'AuthGuard';
export default AuthGuard;
