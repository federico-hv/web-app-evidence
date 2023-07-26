import { useQuery } from '@apollo/client';
import { GET_USER_FEEDS } from '../../queries';
import { FeedsReturnModel } from '../interface';

/**
 *
 */
export function useUserFeeds(
  username: string,
  type: 'post' | 'article' = 'post',
) {
  const { loading, error, data } = useQuery<
    {
      userFeeds: FeedsReturnModel;
    },
    { payload: { username: string; type: string } }
  >(GET_USER_FEEDS, { variables: { payload: { username, type } } });

  return { loading, error, data };
}
