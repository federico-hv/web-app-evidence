import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_ARTIST_DETAILS } from '../../queries';
import { IMusicRelease } from '../../../user';
import { IAnnouncement, IExternalLink } from '../../../../shared';

export function useGetArtistDetails(id: string) {
  console.log(id);

  return useQuery<
    {
      externalArtistLinks: IExternalLink[];
      artistPicks: IMusicRelease[];
      announcements: IAnnouncement[];
    },
    { id: string }
  >(GET_ARTIST_DETAILS, {
    variables: { id },
  });
}

export function useSuspenseGetArtistDetails(id: string) {
  return useSuspenseQuery<
    {
      externalArtistLinks: IExternalLink[];
      artistPicks: IMusicRelease[];
      announcements: IAnnouncement[];
    },
    { id: string }
  >(GET_ARTIST_DETAILS, {
    variables: { id },
  });
}
