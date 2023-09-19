import { useMutation } from '@apollo/client';
import { RENAME_BOOKMARK_GROUP } from '../../mutations';
import { IBookmarkGroup } from '../interface';
import { GET_BOOKMARK_GROUP } from '../../queries';

export function useRenameBookmarkGroup() {
  const [mutation, { loading, error }] = useMutation<
    { renameBookmarkGroup: IBookmarkGroup },
    { id: string; name: string }
  >(RENAME_BOOKMARK_GROUP);

  const renameBookmarkGroup = async (id: string, name: string) => {
    await mutation({
      variables: { id, name },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            bookmarkGroup() {
              if (!data) return;

              const result = cache.readQuery({
                query: GET_BOOKMARK_GROUP,
                variables: { id },
              });

              if (!result) return;

              cache.writeQuery({
                query: GET_BOOKMARK_GROUP,
                variables: { id },
                data: {
                  bookmarkGroup: data.renameBookmarkGroup,
                },
              });
            },
          },
        });
      },
    });

    return true;
  };

  return { renameBookmarkGroup, loading, error };
}
