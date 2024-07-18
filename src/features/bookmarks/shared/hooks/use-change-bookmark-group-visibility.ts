import { gql, Reference, useMutation } from '@apollo/client';
import { CHANGE_BOOKMARK_GROUP_VISIBILITY } from '../../mutations';
import { IBookmarkGroup } from '../interface';
import { useToast } from '../../../../shared';

export function useChangeBookmarkGroupVisibility() {
  const { openWith } = useToast();

  const [mutate, { loading, error, data }] = useMutation<
    { changeBookmarkGroupVisibility: IBookmarkGroup },
    { id: string; isPrivate: boolean }
  >(CHANGE_BOOKMARK_GROUP_VISIBILITY);

  const changeVisibility = async (id: string, isPrivate: boolean) => {
    try {
      return mutate({
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
      console.error(e);
      openWith({
        description: 'Something went wrong. Please try again later.',
        status: 'danger',
      });
    }
  };

  return { changeVisibility, loading, error, data };
}
