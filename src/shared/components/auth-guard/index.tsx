import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthGuardProps } from './types';
import NotFoundError from '../not-found-error';
import { Paths, prefix } from '../../index';
import { useCurrentUser } from '../../../features';

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
        <Navigate
          to={prefix(
            '/',
            `${Paths.authRedirect}?from=${location.pathname}`,
          )}
          state={{ from: location }}
          // replace
        />
      )}
    </>
  );
}

AuthGuard.displayName = 'AuthGuard';
export default AuthGuard;
