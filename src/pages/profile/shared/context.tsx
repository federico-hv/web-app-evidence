import {
  GeneralContextProvider,
  GenericProps,
  voidFn,
} from '../../../shared';
import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@apollo/client';
import { IProfile } from './types';
import { GET_PROFILE } from '../queries';

function ProfileProvider({ children }: GenericProps) {
  const { username } = useParams();

  const { data } = useSuspenseQuery<{ profile: IProfile }>(GET_PROFILE, {
    variables: {
      username: username,
    },
  });

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
