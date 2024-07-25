import { gql, useMutation } from '@apollo/client';
import { IBookmarkGroup, ICreateBookmarkGroup } from '../shared';
import { CREATE_BOOKMARK_GROUP } from './schema';
import { ErrorMessage, useToast } from '../../../shared';

export function useCreateBookmarkGroupMutation() {
  const { openWith } = useToast();

  const [mutation, { loading, error }] = useMutation<
    { createBookmarkGroup: IBookmarkGroup },
    ICreateBookmarkGroup
  >(CREATE_BOOKMARK_GROUP);

  const createBookmarkGroup = async (
    name: string,
    isPrivate?: boolean,
  ) => {
    try {
      return await mutation({
        variables: { name, isPrivate },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              bookmarkGroups(existingBookmarkGroups) {
                if (!data) return;

                const newBookmarkGroupRef = cache.writeFragment({
                  id: data.createBookmarkGroup.id,
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
                      cursor: data.createBookmarkGroup.id,
                    },
                  ],
                  pageInfo: {
                    ...existingBookmarkGroups.pageInfo,
                    endCursor: data.createBookmarkGroup.id,
                  },
                };
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

  return { createBookmarkGroup, loading, error };
}
