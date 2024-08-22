import { Fragment, ReactElement } from 'react';
import { GenericProps } from '@holdr-ui/react';
import { useCurrentUser } from '../../auth';
import { UserRoleEnum } from '../shared';

function ArtistOwnerGuard({
  children,
  Fallback,
}: GenericProps & { Fallback: ReactElement }) {
  const currentUser = useCurrentUser();

  if (currentUser.role !== UserRoleEnum.Artist) return Fallback;

  return <Fragment>{children}</Fragment>;
}
ArtistOwnerGuard.displayName = 'ArtistOwnerGuard';

export default ArtistOwnerGuard;
