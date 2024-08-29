import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_USERS_WHO_VOTED } from './schema';
import { IConnection, IPaginationParams } from '../../../shared';
import { UserWithRelationship } from '../../relationships';

interface IUsersWhoVotedQueryResponse {
  usersWhoVoted: IConnection<UserWithRelationship, string>;
}
interface IUsersWhoVotedQueryArgs {
  postId: number;
  pollAnswerId: number;
  params?: IPaginationParams<string>;
}

export function useUsersWhoVotedQuery(args: IUsersWhoVotedQueryArgs) {
  return useQuery<IUsersWhoVotedQueryResponse, IUsersWhoVotedQueryArgs>(
    GET_USERS_WHO_VOTED,
    { variables: args },
  );
}

export function useUsersWhoVotedSuspenseQuery(
  args: IUsersWhoVotedQueryArgs,
) {
  return useSuspenseQuery<
    IUsersWhoVotedQueryResponse,
    IUsersWhoVotedQueryArgs
  >(GET_USERS_WHO_VOTED, { variables: args });
}
