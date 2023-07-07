import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../../../contexts';
import { prefix } from '../../../../../utilities';
import { Paths, Role } from '../../../../../shared';
import NotFound from '../../../../groups/not-found';

interface AuthGuardProps {
  roles?: Role[];
}

function AuthGuard({ roles = ['general', 'artist'] }: AuthGuardProps) {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      {currentUser && roles.includes(currentUser.role) ? (
        <Outlet />
      ) : currentUser && !roles.includes(currentUser.role) ? (
        <NotFound />
      ) : (
        <Navigate
          to={prefix(
            '/',
            `${Paths.authRedirect}?from=${location.pathname}`,
          )}
          state={{ from: location }}
          replace
        />
      )}
    </>
  );
}

AuthGuard.displayName = 'AuthGuard';
export default AuthGuard;
