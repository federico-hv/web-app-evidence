import { useMutation } from '@apollo/client';
import { UPDATE_BIO_AND_PERKS } from '../../mutations';
import { useToast } from '../../../../shared';

interface IUpdateArtistDetails {
  bio: string;
}

export function useUpdateBioAndPerks() {
  const { openWith } = useToast();

  const [mutate, { loading, error, data }] = useMutation<
    {
      updateArtistDetails: IUpdateArtistDetails;
      updatePerks: number[];
    },
    { payload: IUpdateArtistDetails; perks: number[] }
  >(UPDATE_BIO_AND_PERKS);

  const updateBioAndPerks = async (data: {
    perks: number[];
    bio: string;
  }) => {
    try {
      const result = await mutate({
        variables: {
          perks: data.perks,
          payload: { bio: data.bio },
        },
      });

      // openWith({
      //   status: 'success',
      //   description: 'We have saved your bio and perks',
      // });

      return result;
    } catch (e) {
      console.error(e);

      openWith({
        status: 'danger',
        description: 'Something went wrong. Please try again later.',
      });
    }
  };

  return { updateBioAndPerks, loading, error, data };
}
