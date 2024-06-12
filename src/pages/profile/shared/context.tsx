import { GenericProps, voidFn } from '../../../shared';
import { Navigate, useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@apollo/client';
import { GeneralContextProvider } from '@holdr-ui/react';
import { IProfile, GET_PROFILE } from '../../../features';

function ProfileProvider({ children }: GenericProps) {
  const { username } = useParams();

  const { data } = useSuspenseQuery<{ profile: IProfile }>(GET_PROFILE, {
    variables: {
      username: username,
    },
  });

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
