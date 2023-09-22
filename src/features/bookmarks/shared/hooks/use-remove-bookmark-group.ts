import { useMutation } from '@apollo/client';
import { REMOVE_BOOKMARK_GROUP } from '../../mutations';
import { IBookmarkGroup } from '../interface';
import { IConnection, IPageInfo } from '../../../../shared';
import { GET_BOOKMARK_GROUPS } from '../../queries';

export function useRemoveBookmarkGroup() {
  const [mutation, { loading, error }] = useMutation<
    { removeBookmarkGroup: IBookmarkGroup },
    { id: string }
  >(REMOVE_BOOKMARK_GROUP);

  const removeBookmarkGroup = async (id: string) => {
    await mutation({
      variables: { id },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            bookmarkGroups(current) {
              // TODO: Update this method - see create bookmark group
              if (!data) return;

              const oldData = current as IConnection<
                IBookmarkGroup,
                string
              >;

              const newEdges = oldData.edges.filter(
                (item) => item.node.id === data.removeBookmarkGroup.id,
              );

              const newPageInfo: IPageInfo<string> = {
                ...oldData.pageInfo,
                startCursor:
                  oldData.pageInfo.startCursor ===
                  data.removeBookmarkGroup.id
                    ? ''
                    : oldData.pageInfo.startCursor,
                endCursor:
                  oldData.pageInfo.endCursor ===
                  data.removeBookmarkGroup.id
                    ? ''
                    : oldData.pageInfo.endCursor,
              };

              cache.writeQuery({
                query: GET_BOOKMARK_GROUPS,
                data: {
                  bookmarkGroups: {
                    __typename: 'ManyBookmarkGroupsModel',
                    edges: newEdges,
                    pageInfo: newPageInfo,
                  },
                },
              });
            },
          },
        });
      },
    });

    return true;
  };

  return {
    removeBookmarkGroup,
    loading,
    error,
  };
}
