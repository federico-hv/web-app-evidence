import { useMutation } from '@apollo/client';
import { IStatus } from '../../../../shared';
import { REMOVE_ALL_SEARCH_HISTORY_ITEMS } from '../../mutations';
import { GET_SEARCH_HISTORY } from '../../queries';

export function useRemoveSearchHistoryItems() {
  const [mutation, { loading, error }] = useMutation<{
    removeAllSearchHistoryItems: IStatus;
  }>(REMOVE_ALL_SEARCH_HISTORY_ITEMS);

  const removeAll = async () => {
    await mutation({
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            searchHistory() {
              if (data && data.removeAllSearchHistoryItems.status)
                cache.writeQuery({
                  query: GET_SEARCH_HISTORY,
                  data: {
                    searchHistory: {
                      count: 0,
                      data: [],
                    },
                  },
                });
            },
          },
        });
      },
    });
  };

  return { removeAll, error, loading };
}
