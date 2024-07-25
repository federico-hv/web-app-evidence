import { useQuery, useSuspenseQuery } from '@apollo/client';
import { IConnection, IPaginationParams } from '../../../shared';
import { FeedFilterTypeEnum, FeedModel } from '../shared';
import { GET_FEEDS } from './schema';

interface FeedQueryArgs {
  slug?: string;
  filter?: FeedFilterTypeEnum;
  params?: IPaginationParams<number>;
}

export function useFeedsQuery(variables?: FeedQueryArgs) {
  return useQuery<
    { feeds: IConnection<FeedModel, string> },
    FeedQueryArgs
  >(GET_FEEDS, {
    variables,
  });
}

export function useFeedsSuspenseQuery(variables?: FeedQueryArgs) {
  return useSuspenseQuery<
    { feeds: IConnection<FeedModel, string> },
    FeedQueryArgs
  >(GET_FEEDS, { variables });
}
