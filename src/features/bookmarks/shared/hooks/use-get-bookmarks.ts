import { useSuspenseQuery } from '@apollo/client';
import { IConnection, IPaginationParams } from '../../../../shared';
import { IBookmark } from '../interface';
import { GET_BOOKMARKS } from '../../queries';
import { SuspenseQueryHookFetchPolicy } from '@apollo/client/react/types/types';

interface GetBookmarksArgs {
  id?: string;
  fetchPolicy?: SuspenseQueryHookFetchPolicy;
}

export function useGetBookmarks(data?: GetBookmarksArgs) {
  return useSuspenseQuery<
    { bookmarks: IConnection<IBookmark, number> },
    { id?: string; params?: IPaginationParams<number> }
  >(GET_BOOKMARKS, {
    variables: {
      id: data?.id,
    },
    fetchPolicy: data?.fetchPolicy,
  });
}
