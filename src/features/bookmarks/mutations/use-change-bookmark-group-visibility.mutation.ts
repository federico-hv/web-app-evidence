import { ErrorMessage, useToast } from '../../../shared';
import { gql, Reference, useMutation } from '@apollo/client';
import { IBookmarkGroup } from '../shared';
import { CHANGE_BOOKMARK_GROUP_VISIBILITY } from './schema';

export function useChangeBookmarkGroupVisibilityMutation() {
  const { openWith } = useToast();

  const [mutate, { loading, error, data }] = useMutation<
    { changeBookmarkGroupVisibility: IBookmarkGroup },
    { id: string; isPrivate: boolean }
  >(CHANGE_BOOKMARK_GROUP_VISIBILITY);

  const changeVisibility = async (id: string, isPrivate: boolean) => {
    try {
      return await mutate({
        variables: {
          id,
          isPrivate,
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              bookmarkGroups(current = {}) {
                let newGroup: Reference = current;

                try {
                  newGroup = cache.writeFragment({
                    id: current.__ref,
                    data: data?.changeBookmarkGroupVisibility,
                    fragment: gql`
                      fragment NewGroup on BookmarkGroupModel {
                        id
                        name
                        total
                        private
                      }
                    `,
                  }) as Reference;
                } catch (e) {
                  console.error('[Cache Update: Change Visibility]');
                }

                return newGroup;
              },
            },
          });
        },
      });
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);

      openWith({
        status: 'danger',
        description: ErrorMessage.Any,
      });
    }
  };

  return { changeVisibility, loading, data };
}
