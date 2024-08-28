import { FetchPolicy, useSuspenseQuery } from '@apollo/client';
import { IConnection, IPaginationParams } from '../../../shared';
import { IBookmark } from '../shared';
import { GET_BOOKMARKS } from './schema';
import { SuspenseQueryHookFetchPolicy } from '@apollo/client/react/types/types';

interface BookmarksQueryArgs {
  id: string;
  params?: IPaginationParams<number>;
}

interface BookmarksQueryResponse {
  bookmarks: IConnection<IBookmark, number>;
}

export function useBookmarksSuspenseQuery(
  variables?: BookmarksQueryArgs,
  fetchPolicy?: SuspenseQueryHookFetchPolicy,
) {
  return useSuspenseQuery<BookmarksQueryResponse, BookmarksQueryArgs>(
    GET_BOOKMARKS,
    {
      variables,
      fetchPolicy,
    },
  );
}

export function useBookmarksQuery(variables?: BookmarksQueryArgs) {
  return useSuspenseQuery<BookmarksQueryResponse, BookmarksQueryArgs>(
    GET_BOOKMARKS,
    {
      variables,
    },
  );
}
