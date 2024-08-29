import { FeedModel } from '../shared';
import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_FEED } from './schema';

interface FeedQueryResponse {
  feed: FeedModel;
}

interface FeedQueryArgs {
  id: string;
}

export function useFeedQuery(args: FeedQueryArgs) {
  return useQuery<FeedQueryResponse>(GET_FEED, {
    variables: args,
  });
}

export function useFeedSuspenseQuery(args: FeedQueryArgs) {
  return useSuspenseQuery<FeedQueryResponse, { id: string }>(GET_FEED, {
    variables: args,
  });
}
