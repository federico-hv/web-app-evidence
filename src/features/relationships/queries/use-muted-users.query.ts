import { useQuery, useSuspenseQuery } from '@apollo/client';
import { AltManyUsersWithRelationship } from '../shared';
import { IPaginationParams } from '../../../shared';
import { GET_MUTED_USERS } from './schema';

export function useMutedUsersQuery() {
  return useQuery<
    { mutedUsers: AltManyUsersWithRelationship },
    { params?: IPaginationParams<number> }
  >(GET_MUTED_USERS);
}

export function useMutedUsersSuspenseQuery() {
  return useSuspenseQuery<
    { mutedUsers: AltManyUsersWithRelationship },
    { params?: IPaginationParams<number> }
  >(GET_MUTED_USERS);
}
