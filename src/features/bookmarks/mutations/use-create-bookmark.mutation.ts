import { ErrorMessage, useToast, voidFn } from '../../../shared';
import { useMutation } from '@apollo/client';
import { IBookmark, IBookmarkGroup } from '../shared';
import { CREATE_BOOKMARK } from './schema';

export function useCreateBookmarkMutation() {
  const { openWith } = useToast();

  const [mutation, { loading, error }] = useMutation<
    {
      createBookmark: {
        bookmark: IBookmark | null;
        bookmarkGroup: IBookmarkGroup | null;
      };
    },
    { feedId: string; bookmarkGroupId?: string }
  >(CREATE_BOOKMARK);

  const createBookmark = async (
    feedId: string,
    bookmarkGroupId?: string,
  ) => {
    try {
      return await mutation({
        variables: { feedId, bookmarkGroupId },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              // update bookmark groups
              bookmarkGroups(current) {
                voidFn();
              },
              allBookmarkTotal(current) {
                voidFn();
              },
              feedStatistic(current) {
                voidFn();
              },
              feeds(current) {
                voidFn();
              },
              trendingFeeds(current) {
                voidFn();
              },
            },
          });
        },
      });
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);

      openWith({
        status: 'danger',
        description: ErrorMessage.Any,
      });
    }
  };

  return { createBookmark, loading, error };
}
