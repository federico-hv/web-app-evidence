import { useToast } from '../../../../shared';
import { gql, Reference, useMutation } from '@apollo/client';
import { IProfile } from '../../../user';
import { IPerk } from '../types';
import { UPDATE_PERKS } from '../../mutations';

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
    data: {
      perks: number[];
    },
  ) => {
    try {
      return await mutate({
        variables: {
          perks: data.perks,
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              clubPerks(current = []) {
                // let newPerksList: Reference[] = current;
                //
                // try {
                //   console.log();
                //   newPerksList = cache.writeFragment({
                //     id: clubId,
                //     fragment: gql`
                //       fragment NewPerks on PerkModel {
                //         id
                //         label
                //         description
                //       }
                //     `,
                //     data: data,
                //   }) as Reference;
                // } catch (e) {
                //   console.error(e);
                // }
                //
                // return [...newPerksList];
              },
            },
          });
        },
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
