import { useMutation } from '@apollo/client';
import { CREATE_BOOKMARK } from '../../mutations';
import { FeedModel } from '../../../feeds';
import { IBookmarkGroup } from '../interface';
import { useToast } from '../../../../shared';

export function useCreateBookmark() {
  const { openWith } = useToast();

  const [mutation, { loading, error }] = useMutation<
    {
      createBookmark: {
        feed: FeedModel | null;
        bookmarkGroup: IBookmarkGroup | null;
      };
    },
    { feedId: string; bookmarkGroupId?: string }
  >(CREATE_BOOKMARK);

  const createBookmark = async (
    feedId: string,
    bookmarkGroupId?: string,
  ): Promise<boolean> => {
    const res = await mutation({ variables: { feedId, bookmarkGroupId } });

    if (!res.data) {
      return false;
    }

    if (
      res.data.createBookmark.feed &&
      res.data.createBookmark.bookmarkGroup
    ) {
      openWith({
        status: 'success',
        description: 'We saved the feed to to your bookmarks.',
      });
    }

    return true;
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
