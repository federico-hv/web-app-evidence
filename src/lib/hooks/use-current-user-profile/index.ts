import { useAuthContext } from '../../../hooks';
import { useQuery } from '@apollo/client';
import { IProfile } from '../../../shared';
import { GET_PROFILE } from '../../gql';

export const useCurrentUserProfile = () => {
  const { currentUser } = useAuthContext();

  // QUERY for profile
  const { data, loading, error } = useQuery<{ profile: IProfile }>(
    GET_PROFILE,
    {
      variables: {
        username: currentUser?.username,
      },
    },
  );

  return { data, loading, error };
};
