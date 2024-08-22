import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_BLOCKED_USERS } from './schema';
import { AltManyUsersWithRelationship } from '../shared';
import { IPaginationParams } from '../../../shared';

export function useBlockedUsersQuery() {
  return useQuery<
    { blockedUsers: AltManyUsersWithRelationship },
    { params?: IPaginationParams<number> }
  >(GET_BLOCKED_USERS);
}

export function useBlockedUsersSuspenseQuery() {
  return useSuspenseQuery<
    { blockedUsers: AltManyUsersWithRelationship },
    { params?: IPaginationParams<number> }
  >(GET_BLOCKED_USERS);
}
