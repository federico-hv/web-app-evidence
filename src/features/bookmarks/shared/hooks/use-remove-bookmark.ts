import { useMutation } from '@apollo/client';
import { FeedModel } from '../../../feeds';
import { IBookmarkGroup } from '../interface';
import { REMOVE_BOOKMARK } from '../../mutations';
import { useToast } from '../../../../shared';

export function useRemoveBookmark() {
  const { openWith } = useToast();
  const [mutation, { loading, error }] = useMutation<
    {
      removeBookmarkGroup: {
        feed: FeedModel;
        bookmarkGroup: IBookmarkGroup;
      };
    },
    { feedId: string; bookmarkGroupId?: string }
  >(REMOVE_BOOKMARK);

  const removeBookmark = async (
    feedId: string,
    bookmarkGroupId?: string,
  ): Promise<boolean> => {
    await mutation({ variables: { feedId, bookmarkGroupId } });

    openWith({
      description: 'We removed the feed from your bookmarks.',
      status: 'success',
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
