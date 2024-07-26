import { useQuery } from '@apollo/client';
import { GET_BOOKMARK_GROUP } from './schema';
import { IBookmarkGroup } from '../shared';

export function useBookmarkGroupQuery(id: string) {
  return useQuery<{ bookmarkGroup: IBookmarkGroup }, { id: string }>(
    GET_BOOKMARK_GROUP,
    {
      variables: { id },
    },
  );
}

export function useBookmarkGroupSupsenseQuery(id: string) {
  return useQuery<{ bookmarkGroup: IBookmarkGroup }, { id: string }>(
    GET_BOOKMARK_GROUP,
    {
      variables: { id },
    },
  );
}
