import { useMutation } from '@apollo/client';
import { IBookmarkGroup } from '../shared';
import { RENAME_BOOKMARK_GROUP } from './schema';
import { GET_BOOKMARK_GROUP } from '../queries';
import { ErrorMessage, useToast } from '../../../shared';

export function useRenameBookmarkGroupMutation() {
  const { openWith } = useToast();

  const [mutation, { loading, error }] = useMutation<
    { renameBookmarkGroup: IBookmarkGroup },
    { id: string; name: string }
  >(RENAME_BOOKMARK_GROUP);

  const renameBookmarkGroup = async (id: string, name: string) => {
    try {
      return await mutation({
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

  return { renameBookmarkGroup, loading, error };
}
