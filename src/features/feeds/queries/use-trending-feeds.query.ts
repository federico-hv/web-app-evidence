import { useQuery, useSuspenseQuery } from '@apollo/client';
import { IConnection, IPaginationParams } from '../../../shared';
import { FeedFilterTypeEnum, FeedModel } from '../shared';
import { GET_TRENDING_FEEDS } from './schema';

interface FeedQueryArgs {
  slug?: string;
  filter?: FeedFilterTypeEnum;
  params?: IPaginationParams<number>;
}

export function useTrendingFeedsQuery(variables?: FeedQueryArgs) {
  return useQuery<
    { trendingFeeds: IConnection<FeedModel, string> },
    FeedQueryArgs
  >(GET_TRENDING_FEEDS, {
    variables,
  });
}

export function useTrendingFeedsSuspenseQuery(variables?: FeedQueryArgs) {
  return useSuspenseQuery<
    { trendingFeeds: IConnection<FeedModel, string> },
    FeedQueryArgs
  >(GET_TRENDING_FEEDS, { variables });
}
