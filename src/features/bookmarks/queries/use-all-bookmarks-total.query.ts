import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_ALL_BOOKMARKS_TOTAL } from './schema';

export function useAllBookmarksTotalQuery() {
  return useQuery<{ allBookmarksTotal: number }>(GET_ALL_BOOKMARKS_TOTAL);
}

export function useAllBookmarksTotalSuspenseQuery() {
  return useSuspenseQuery<{ allBookmarksTotal: number }>(
    GET_ALL_BOOKMARKS_TOTAL,
  );
}
