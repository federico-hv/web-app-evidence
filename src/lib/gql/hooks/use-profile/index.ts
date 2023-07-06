import { useUsername } from '../../../../hooks';
import { useQuery } from '@apollo/client';
import { IProfile } from '../../../../shared';
import { GET_PROFILE } from '../../queries';

export function useProfile() {
  const username = useUsername();

  const { data, loading, error } = useQuery<{ profile: IProfile }>(
    GET_PROFILE,
    {
      variables: {
        username: username,
      },
    },
  );

  return { data, loading, error };
}
