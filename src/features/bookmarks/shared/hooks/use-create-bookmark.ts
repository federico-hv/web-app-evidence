import { gql, useMutation } from '@apollo/client';
import { CREATE_BOOKMARK } from '../../mutations';
import { IBookmark, IBookmarkGroup } from '../interface';
import { useToast } from '../../../../shared';
import { GET_ALL_BOOKMARKS_TOTAL } from '../../queries';
import { GET_FEED_STATISTIC } from '../../../feeds';

export function useCreateBookmark() {
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
  ): Promise<boolean> => {
    const res = await mutation({
      variables: { feedId, bookmarkGroupId },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            // update bookmark groups
            bookmarkGroups(existingBookmarkGroups) {
              if (!data || !data.createBookmark.bookmarkGroup) return;

              const newBookmarkGroupRef = cache.writeFragment({
                id: data.createBookmark.bookmarkGroup.id,
                data: data,
                fragment: gql`
                  fragment NewBookmarkGroupModel on BookmarkGroupModel {
                    id
                    type
                  }
                `,
              });

              return {
                ...existingBookmarkGroups,
                edges: [
                  ...existingBookmarkGroups.edges,
                  {
                    node: newBookmarkGroupRef,
                    cursor: data.createBookmark.bookmarkGroup.id,
                  },
                ],
                pageInfo: {
                  ...existingBookmarkGroups.pageInfo,
                  // endCursor: data.createBookmark.bookmarkGroup.id, // This wi
                },
              };
            },
            allBookmarkTotal(current) {
              if (!bookmarkGroupId) {
                cache.writeQuery({
                  query: GET_ALL_BOOKMARKS_TOTAL,
                  data: { allBookmarksTotal: current + 1 },
                });
              }
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
                  feedStatistics: data + 1,
                },
              });
            },
            // update feeds
            feeds() {
              return;
            },
            //update feed
            feed() {
              return;
            },
            userFeeds() {
              return;
            },
          },
        });
      },
    });

    return !!res.data;
  };

  if (error) {
    openWith({
      status: 'danger',
      description:
        'Oops, something went wrong while saving the feed to you bookmarks. Please try again.',
    });
  }

  return { createBookmark, loading, error };
}
