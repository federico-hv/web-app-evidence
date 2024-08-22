import { useToast } from '../../../../shared';
import { gql, useMutation } from '@apollo/client';
import { IProfile } from '../../../user';
import { IPerk } from '../types';
import { UPDATE_PERKS } from '../../mutations';
import { GET_CLUB_PERKS } from '../../queries';

export function useUpdatePerks() {
  const { openWith } = useToast();

  const [mutate, { loading, error, data }] = useMutation<
    {
      updateProfile: IProfile;
      updatePerks: IPerk[];
    },
    { perks: number[] }
  >(UPDATE_PERKS);

  const updatePerks = async (
    clubId: string,
    data: { perks: number[] },
  ) => {
    try {
      return await mutate({
        variables: {
          perks: data.perks,
        },
        refetchQueries: [
          { query: GET_CLUB_PERKS, variables: { id: clubId } },
        ],
      });
    } catch (e) {
      console.error(e);

      openWith({
        status: 'danger',
        description: 'Something went wrong. Please try again later.',
      });
    }
  };

  return { updatePerks, loading, error, data };
}
