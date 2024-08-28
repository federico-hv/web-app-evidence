import { useMutation } from '@apollo/client';
import { REMOVE_BOOKMARK } from '../../mutations';
import { IStatus, useToast } from '../../../../shared';
import { GET_ALL_BOOKMARKS_TOTAL } from '../../queries';
import { GET_FEED_STATISTIC } from '../../../feeds';

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
            feeds() {
              return;
            },
            trendingFeeds() {
              return;
            },
            userFeeds() {
              return;
            },
            feed() {
              return;
            },
            bookmarkGroups() {
              if (!data || !data.removeBookmark.status) return;
              // Need a solution to update cache
              return;
            },
            feedStatistic() {
              const data: number | null = cache.readQuery({
                query: GET_FEED_STATISTIC,
                variables: { id: feedId, name: 'bookmarks' },
              });

              // just null, avoid 0 case
              if (!data && typeof data === 'object') return;

              cache.writeQuery({
                query: GET_FEED_STATISTIC,
                variables: {
                  id: feedId,
                  name: 'bookmarks',
                },
                data: {
                  feedStatistics: data - 1,
                },
              });
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
