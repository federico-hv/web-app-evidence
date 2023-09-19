import { useSuspenseQuery } from '@apollo/client';
import { IConnection, IPaginationParams } from '../../../../shared';
import { IBookmark } from '../interface';
import { GET_BOOKMARKS } from '../../queries';

export function useGetBookmarks(id?: string) {
  return useSuspenseQuery<
    { bookmarks: IConnection<IBookmark, number> },
    { id?: string; params?: IPaginationParams<number> }
  >(GET_BOOKMARKS, {
    variables: {
      id,
    },
    fetchPolicy: 'network-only',
  });
}
