import { IConnection, IPaginationParams } from '../../../shared';
import { UserWithRelationship } from '../../relationships';
import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_USERS_WHO_BOOKMARKED } from './schema';

interface IUsersWhoBookmarkedResponse {
  usersWhoBookmarked: IConnection<UserWithRelationship, string>;
}
interface IUsersWhoBookmarkedQueryArgs {
  feedId: string;
  params?: IPaginationParams<string>;
}

export function useUsersWhoBookmarkedQuery(
  args: IUsersWhoBookmarkedQueryArgs,
) {
  return useQuery<
    IUsersWhoBookmarkedResponse,
    IUsersWhoBookmarkedQueryArgs
  >(GET_USERS_WHO_BOOKMARKED, {
    variables: args,
  });
}

export function useUsersWhoBookmarkedSuspenseQuery(
  args: IUsersWhoBookmarkedQueryArgs,
) {
  return useSuspenseQuery<
    IUsersWhoBookmarkedResponse,
    IUsersWhoBookmarkedQueryArgs
  >(GET_USERS_WHO_BOOKMARKED, {
    variables: args,
  });
}
