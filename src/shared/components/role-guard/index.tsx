import { useCurrentUser, UserRoleEnum } from '../../../features';
import { Fragment, ReactElement } from 'react';
import { GenericProps } from '@holdr-ui/react';

function RoleGuard({
  children,
  roles,
  fallback = <Fragment />,
}: GenericProps & {
  roles: UserRoleEnum[];
  fallback?: ReactElement;
}) {
  const currentUser = useCurrentUser();

  const hasRole = currentUser && roles.includes(currentUser.role);

  return <Fragment>{hasRole ? children : fallback}</Fragment>;
}

RoleGuard.displayName = 'RoleGuard';
export default RoleGuard;
