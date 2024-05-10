import { useMutation } from '@apollo/client';
import { UPDATE_CLUB } from '../../mutations';
import { IClub } from '../interfaces';

interface IUpdateClubPayload {
  coverImage?: File;
  bannerImage?: File;
  url?: string;
}

/**
 *
 */
export function useUpdateClub() {
  const [mutate, { loading, error, data }] = useMutation<
    { updateClub: IClub },
    { payload: IUpdateClubPayload }
  >(UPDATE_CLUB);

  /**
   *
   * @param data
   */
  const updateClub = async (data: IUpdateClubPayload) => {
    try {
      return await mutate({
        variables: { payload: data },
        context: {
          headers: {
            'apollo-require-preflight': true,
          },
        },
      });
    } catch (error) {}
  };

  return { updateClub, data, loading, error };
}
