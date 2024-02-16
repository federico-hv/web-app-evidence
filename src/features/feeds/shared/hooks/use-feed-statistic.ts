import { FeedStatisticType } from '../types';
import { useQuery } from '@apollo/client';
import { GET_FEED_STATISTIC } from '../../queries';

/**
 * Prompt a GQL query to retrieve feed statistic count.
 *
 * @param feedId the id of the feed
 * @param name the name of the statistic value to query for
 */
export function useFeedStatistic(feedId: string, name: FeedStatisticType) {
  const { loading, data, error } = useQuery<
    { feedStatistic: number },
    { id: string; name: FeedStatisticType }
  >(GET_FEED_STATISTIC, {
    variables: {
      id: feedId,
      name: name,
    },
  });

  return { loading, data, error };
}
