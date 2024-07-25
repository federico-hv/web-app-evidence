import { useQuery, useSuspenseQuery } from '@apollo/client';
import { IConnection, IPaginationParams } from '../../../shared';
import { IBookmarkGroup } from '../shared';
import { GET_BOOKMARK_GROUPS } from './schema';

interface BookmarkGroupQueryArgs {
  feedId?: string;
  params?: IPaginationParams<number>;
}

interface BookmarkGroupQueryResponse {
  bookmarkGroups: IConnection<IBookmarkGroup, string>;
}

export function useBookmarkGroupsSuspenseQuery(
  variables?: BookmarkGroupQueryArgs,
) {
  return useSuspenseQuery<
    BookmarkGroupQueryResponse,
    BookmarkGroupQueryArgs
  >(GET_BOOKMARK_GROUPS, {
    variables,
  });
}

export function useBookmarkGroupsQuery(
  variables?: BookmarkGroupQueryArgs,
) {
  return useQuery<BookmarkGroupQueryResponse, BookmarkGroupQueryArgs>(
    GET_BOOKMARK_GROUPS,
    {
      variables,
    },
  );
}
