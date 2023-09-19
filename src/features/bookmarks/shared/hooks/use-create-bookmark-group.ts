import { gql, useMutation } from '@apollo/client';
import { CREATE_BOOKMARK_GROUP } from '../../mutations';
import { IBookmarkGroup, ICreateBookmarkGroup } from '../interface';
// import { IConnection, IPageInfo } from '../../../../shared';
// import { GET_BOOKMARK_GROUPS } from '../../queries';

export function useCreateBookmarkGroup() {
  const [mutation, { loading, error }] = useMutation<
    { createBookmarkGroup: IBookmarkGroup },
    ICreateBookmarkGroup
  >(CREATE_BOOKMARK_GROUP);

  const createBookmarkGroup = async (
    name: string,
    isPrivate?: boolean,
  ) => {
    const result = await mutation({
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

    return result.data ? result.data.createBookmarkGroup.id : null;
  };

  return { createBookmarkGroup, loading, error };
}
