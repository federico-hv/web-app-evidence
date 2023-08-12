import { useMutation } from '@apollo/client';
import { REMOVE_SEARCH_HISTORY_ITEM } from '../../mutations';
import { GenericItem, IReturnMany } from '../../../../shared';
import { GET_SEARCH_HISTORY } from '../../queries';

export function useRemoveSearchHistoryItem<T>() {
  const [mutation, { loading, error }] = useMutation<
    {
      removeSearchHistoryItem: T & GenericItem;
    },
    { id: string }
  >(REMOVE_SEARCH_HISTORY_ITEM);

  const remove = async (id: string) => {
    await mutation({
      variables: { id },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            searchHistory() {
              const oldData: {
                searchHistory: IReturnMany<T & GenericItem>;
              } | null = cache.readQuery({
                query: GET_SEARCH_HISTORY,
              });

              if (oldData && data) {
                const newData = oldData.searchHistory.data.filter(
                  (item) => item.id === data.removeSearchHistoryItem.id,
                );

                cache.writeQuery({
                  query: GET_SEARCH_HISTORY,
                  data: {
                    searchHistory: {
                      count: oldData.searchHistory.count - 1,
                      data: [...newData],
                    },
                  },
                });
              }
            },
          },
        });
      },
    });
  };

  return { remove, error, loading };
}
