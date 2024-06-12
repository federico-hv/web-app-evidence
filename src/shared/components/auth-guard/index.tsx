import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthGuardProps } from './types';
import NotFoundError from '../not-found-error';
import { Paths, prefix } from '../../index';
import { useCurrentUser } from '../../../features';
import { Fragment } from 'react';
import { has } from 'lodash';

function AuthGuard({
  roles = ['general', 'artist'],
  fallback = <NotFoundError />,
}: AuthGuardProps) {
  const currentUser = useCurrentUser();

  const location = useLocation();

  const hasRole = currentUser && roles.includes(currentUser.role);

  return (
    <Fragment>
      {!currentUser && (
        <Navigate
          to={prefix(
            '/',
            `${Paths.authRedirect}?from=${location.pathname}`,
          )}
          state={{ from: location }}
          replace
        />
      )}

      {hasRole ? <Outlet /> : fallback}
    </Fragment>
  );
}

AuthGuard.displayName = 'AuthGuard';
export default AuthGuard;
