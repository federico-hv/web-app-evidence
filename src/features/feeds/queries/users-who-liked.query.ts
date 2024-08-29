import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_USERS_WHO_LIKED } from './schema';
import { IConnection, IPaginationParams } from '../../../shared';
import { UserWithRelationship } from '../../relationships';

interface IUsersWhoLikedQueryResponse {
  usersWhoLiked: IConnection<UserWithRelationship, string>;
}
interface IUsersWhoLikedQueryArgs {
  feedId: string;
  params?: IPaginationParams<string>;
}

export function useUsersWhoLikedQuery(args: IUsersWhoLikedQueryArgs) {
  return useQuery<IUsersWhoLikedQueryResponse, IUsersWhoLikedQueryArgs>(
    GET_USERS_WHO_LIKED,
    { variables: args },
  );
}

export function useUsersWhoLikedSuspenseQuery(
  args: IUsersWhoLikedQueryArgs,
) {
  return useSuspenseQuery<
    IUsersWhoLikedQueryResponse,
    IUsersWhoLikedQueryArgs
  >(GET_USERS_WHO_LIKED, { variables: args });
}
