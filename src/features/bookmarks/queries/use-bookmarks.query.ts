import { useSuspenseQuery } from '@apollo/client';
import { IConnection, IPaginationParams } from '../../../shared';
import { IBookmark } from '../shared';
import { GET_BOOKMARKS } from './schema';

interface BookmarksQueryArgs {
  id: string;
  params?: IPaginationParams<number>;
}

interface BookmarksQueryResponse {
  bookmarks: IConnection<IBookmark, number>;
}

export function useBookmarksQuery(variables?: BookmarksQueryArgs) {
  return useSuspenseQuery<BookmarksQueryResponse, BookmarksQueryArgs>(
    GET_BOOKMARKS,
    {
      variables,
    },
  );
}

export function useBookmarksSuspenseQuery(variables?: BookmarksQueryArgs) {
  return useSuspenseQuery<BookmarksQueryResponse, BookmarksQueryArgs>(
    GET_BOOKMARKS,
    {
      variables,
    },
  );
}
