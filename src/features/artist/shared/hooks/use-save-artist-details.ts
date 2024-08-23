import { useMutation } from '@apollo/client';
import { SAVE_ARTIST_DETAILS } from '../../mutations';
import { IMusicRelease, ISaveMusicRelease } from '../../../user';
import { IAnnouncement, IExternalLink } from '../../../../shared';
import { GET_ARTIST_DETAILS } from '../../../clubs/queries';
import { useCurrentArtist } from '../contexts';

interface ISaveDetailsArgs {
  announcements: string[];
  releases: ISaveMusicRelease[];
  links: Omit<IExternalLink, 'id'>[];
}

export function useSaveArtistDetails() {
  const currentArtist = useCurrentArtist();

  const [mutate, { loading, error, data }] = useMutation<
    {
      updateAnnouncements: IAnnouncement[];
      saveArtistPicks: IMusicRelease[];
      updateArtistLinks: IExternalLink[];
    },
    ISaveDetailsArgs
  >(SAVE_ARTIST_DETAILS);

  const saveArtistDetails = async (params: ISaveDetailsArgs) => {
    console.log(params.releases);

    try {
      return await mutate({
        variables: params,
        update(cache, { data }) {
          cache.modify({
            fields: {
              announcements(current = []) {
                return current;
              },
              artistPicks(current = []) {
                // let newArtistPicks: Reference = current;
                //
                // try {
                // } catch (e) {
                //   console.error(e);
                // }
                //
                // return newArtistPicks;
                const artistDetails = cache.readQuery({
                  query: GET_ARTIST_DETAILS,
                  variables: {
                    id: currentArtist?.id,
                  },
                });

                return current;
              },
              externalArtistLinks(current = []) {
                // let newExternalArtist: Reference = current;
                //
                // try {
                // } catch (e) {
                //   console.error(e);
                // }
                //
                // return newExternalArtist;
              },
            },
          });
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return { loading, data, error, saveArtistDetails };
}
