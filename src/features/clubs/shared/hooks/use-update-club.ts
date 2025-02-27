import { gql, Reference, useMutation } from '@apollo/client';
import { UPDATE_CLUB } from '../../mutations';
import { IClub } from '../types';
import { ErrorMessage, useToast } from '../../../../shared';

interface IUpdateClubPayload {
  coverImage?: File;
  bannerImage?: File;
  url?: string;
}

/**
 *
 */
export function useUpdateClub() {
  const { openWith } = useToast();

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
        update(cache, { data }) {
          cache.modify({
            fields: {
              club(current = {}) {
                let newClub: Reference = current;

                try {
                  newClub = cache.writeFragment({
                    id: current.__ref,
                    data: data?.updateClub,
                    fragment: gql`
                      fragment NewClub on ClubModel {
                        coverImage
                        bannerImage
                        url
                      }
                    `,
                  }) as Reference;
                } catch (e) {
                  console.error(e);
                }

                return newClub;
              },
            },
          });
        },
      });
    } catch (e) {
      if (import.meta.env.VITE_ENVIRONMENT === 'development') {
        console.error(e);
      }
      openWith({
        status: 'danger',
        description: ErrorMessage.Any,
      });
    }
  };

  return { updateClub, data, loading, error };
}
