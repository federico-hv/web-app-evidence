import { ErrorMessage, IStatus, useToast, voidFn } from '../../../shared';
import { useMutation } from '@apollo/client';
import { REMOVE_BOOKMARK } from './schema';

export function useRemoveBookmarkMutation() {
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
  ) => {
    try {
      return await mutation({
        variables: { feedId, bookmarkGroupId },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              bookmarks(current) {
                voidFn();
              },
              bookmarkGroups(current) {
                voidFn();
              },
              feedStatistic(current) {
                voidFn();
              },
              allBookmarkTotal(current) {
                voidFn();
              },
            },
          });
        },
      });
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error(e);
      }

      openWith({
        status: 'danger',
        description: ErrorMessage.Any,
      });
    }
  };

  return { removeBookmark, loading, error };
}
