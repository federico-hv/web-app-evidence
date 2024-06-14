import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_FOLLOWING } from '../../queries';
import { ManyUsersWithRelationship } from '../types';

/**
 * Get the list of users that are following the user with the specified username
 *
 * @param username the username of the user
 */
export function useGetFollowing(username: string) {
  return useQuery<
    { following: ManyUsersWithRelationship },
    { username: string }
  >(GET_FOLLOWING, {
    variables: {
      username,
    },
  });
}

/**
 * Get the list of users that are following the user with the specified username
 *
 * @param username the username of the user
 */
export function useSuspenseGetFollowing(username: string) {
  return useSuspenseQuery<
    { following: ManyUsersWithRelationship },
    { username: string }
  >(GET_FOLLOWING, {
    variables: {
      username,
    },
  });
}
