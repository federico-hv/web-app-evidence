import { useMutation } from '@apollo/client';
import { SAVE_CLUB_VIEWS } from './schema';
import { ISuccessResponse } from '../../../shared';

export interface ISaveClubViewsArgs {
  clubIds: string[];
}

export interface ISaveClubViewsResponse {
  saveClubViews: ISuccessResponse;
}

export function useSaveClubViewsMutation() {
  const [mutate, results] = useMutation<
    ISaveClubViewsResponse,
    ISaveClubViewsArgs
  >(SAVE_CLUB_VIEWS);

  const save = async (clubIds: string[]) => {
    return await mutate({
      variables: {
        clubIds,
      },
    });
  };

  return { save, ...results };
}
