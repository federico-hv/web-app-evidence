import { useMutation } from '@apollo/client';
import { REMOVE_BOOKMARK } from '../../mutations';
import { IStatus, useToast } from '../../../../shared';
import { GET_ALL_BOOKMARKS_TOTAL } from '../../queries';

export function useRemoveBookmark() {
  const { openWith } = useToast();
  const [mutation, { loading, error }] = useMutation<
    {
      removeBookmark: IStatus;
    },
    { feedId: string; bookmarkGroupId?: string }
  >(REMOVE_BOOKMARK);

  const removeBookmark = async (
    feedId: string,
    bookmarkGroupId?: string,
  ): Promise<boolean> => {
    await mutation({
      variables: { feedId, bookmarkGroupId },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            bookmarks() {
              if (!data || !data.removeBookmark.status) return;
              // Need a solution to update cache
              // For some reason, it currently removes the bookmark, but seems like patchwork
              return;
            },
            bookmarkGroups() {
              if (!data || !data.removeBookmark.status) return;
              // Need a solution to update cache
              return;
            },
            allBookmarkTotal(current) {
              if (!bookmarkGroupId) {
                cache.writeQuery({
                  query: GET_ALL_BOOKMARKS_TOTAL,
                  data: { allBookmarksTotal: current - 1 },
                });
              }
            },
          },
        });
      },
    });

    return true;
  };

  if (error) {
    openWith({
      status: 'danger',
      description:
        'Oops, something went wrong while remove the feed from you bookmarks. Please try again.',
    });
  }

  return { removeBookmark, loading, error };
}
