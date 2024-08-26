import { useMutation } from '@apollo/client';
import { ISuccessResponse } from '../../../shared';
import { SAVE_FEED_VIEWS } from './schema';

interface ISaveFeedViewArgs {
  feedIds: string[];
}

export function useSaveFeedViews() {
  const [mutate, results] = useMutation<
    { saveFeedViews: ISuccessResponse },
    ISaveFeedViewArgs
  >(SAVE_FEED_VIEWS);

  const save = async (feedIds: string[]) => {
    return await mutate({
      variables: {
        feedIds,
      },
    });
  };

  return { save, ...results };
}
