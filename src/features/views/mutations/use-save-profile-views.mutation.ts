import { useMutation } from '@apollo/client';
import { ISuccessResponse } from '../../../shared';
import { SAVE_FEED_VIEWS } from './schema';
import { ISaveClubViewsResponse } from './use-save-club-views.mutation';

export interface ISaveProfileViewsArgs {
  username: string;
}

export interface ISaveProfileViewsResponse {
  saveClubViews: ISuccessResponse;
}

export function useSaveProfileViewsMutation() {
  const [mutate, results] = useMutation<
    ISaveClubViewsResponse,
    ISaveProfileViewsArgs
  >(SAVE_FEED_VIEWS);

  const save = async (username: string) => {
    return await mutate({
      variables: {
        username,
      },
    });
  };

  return { save, ...results };
}
