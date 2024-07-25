import { FeedStatisticType } from '../shared';
import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_FEED_STATISTIC } from './schema';

/**
 * Prompt a GQL query to retrieve feed statistic count.
 *
 * @param feedId the id of the feed
 * @param name the name of the statistic value to query for
 */
export function useFeedStatisticQuery(
  feedId: string,
  name: FeedStatisticType,
) {
  return useQuery<
    { feedStatistic: number },
    { id: string; name: FeedStatisticType }
  >(GET_FEED_STATISTIC, {
    variables: {
      id: feedId,
      name: name,
    },
  });
}

/**
 * Prompt a GQL query to retrieve feed statistic count.
 *
 * @param feedId the id of the feed
 * @param name the name of the statistic value to query for
 */
export function useFeedStatisticSuspenseQuery(
  feedId: string,
  name: FeedStatisticType,
) {
  return useSuspenseQuery<
    { feedStatistic: number },
    { id: string; name: FeedStatisticType }
  >(GET_FEED_STATISTIC, {
    variables: {
      id: feedId,
      name: name,
    },
  });
}
