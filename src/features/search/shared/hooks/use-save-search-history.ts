import { useMutation } from '@apollo/client';
import { SAVE_SEARCH_HISTORY } from '../../mutations';
import { IReturnMany } from '../../../../shared';
import { GET_SEARCH_HISTORY } from '../../queries';

export function useSaveSearchHistory<T>() {
  const [mutation, { loading, error }] = useMutation<
    { saveSearchHistory: T },
    { id: string; entity: string }
  >(SAVE_SEARCH_HISTORY);

  console.log(error);

  const save = async (id: string, entity: 'account') => {
    return await mutation({
      variables: { id, entity },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            searchHistory() {
              const oldData: { searchHistory: IReturnMany<T> } | null =
                cache.readQuery({
                  query: GET_SEARCH_HISTORY,
                });

              if (oldData && data)
                cache.writeQuery({
                  query: GET_SEARCH_HISTORY,
                  data: {
                    searchHistory: {
                      count: oldData.searchHistory.count,
                      data: [
                        data.saveSearchHistory,
                        ...oldData.searchHistory.data,
                      ],
                    },
                  },
                });
            },
          },
        });
      },
    });
  };

  return { save, loading, error };
}
