import { GenericProps, voidFn } from '../../../shared';
import { Navigate, useParams } from 'react-router-dom';
import { GeneralContextProvider } from '@holdr-ui/react';
import { useSuspenseGetProfile } from '../../../features';

function ProfileProvider({ children }: GenericProps) {
  const { username } = useParams();

  const { data } = useSuspenseGetProfile(username || '');

  if (!data.profile) {
    return <Navigate to='/' />;
  }

  return (
    <GeneralContextProvider
      value={{ state: data.profile, update: voidFn }}
    >
      {children}
    </GeneralContextProvider>
  );
}
ProfileProvider.displayName = 'ProfileProvider';

export { ProfileProvider };
