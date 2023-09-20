import { useSuspenseQuery } from '@apollo/client';
import { IConnection, IPaginationParams } from '../../../../shared';
import { IBookmarkGroup } from '../interface';
import { GET_BOOKMARK_GROUPS } from '../../queries';

export function useGetBookmarkGroups(
  feedId?: string,
  params?: IPaginationParams<string>,
) {
  return useSuspenseQuery<
    { bookmarkGroups: IConnection<IBookmarkGroup, string> },
    {
      feedId?: string;
      params?: IPaginationParams<string>;
    }
  >(GET_BOOKMARK_GROUPS, {
    variables: { feedId, params },
  });
}
