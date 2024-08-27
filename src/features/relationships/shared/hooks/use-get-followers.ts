import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_FOLLOWERS } from '../../queries';
import { AltManyUsersWithRelationship } from '../types';
import { IPaginationParams } from '../../../../shared';

/**
 * Get the list of users that are following the user with the specified username
 *
 * @param username the username of the user
 */
export function useGetFollowers(username: string) {
  return useQuery<
    { followers: AltManyUsersWithRelationship },
    { username: string; params?: IPaginationParams<number> }
  >(GET_FOLLOWERS, {
    // fetchPolicy: 'no-cache',
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
export function useSuspenseGetFollowers(username: string) {
  return useSuspenseQuery<
    { followers: AltManyUsersWithRelationship },
    { username: string; params?: IPaginationParams<number> }
  >(GET_FOLLOWERS, {
    variables: {
      username,
    },
  });
}
