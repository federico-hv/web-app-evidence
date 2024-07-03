import { HStack, VStack, useGeneralContext } from '@holdr-ui/react';
import { Fragment } from 'react';
import {
  ArtistClubBioAdditionalContent,
  ArtistClubSummaryCard,
} from '../ui';
import { Head } from '../../../../shared';
import { IClub, useSuspenseGetArtist } from '../../../../features';
import { ArtistFeedsList } from './ui';
import { useParams } from 'react-router-dom';

function ArtistClubFeedsPage() {
  const { slug } = useParams();

  const { data: artistData } = useSuspenseGetArtist({
    slug,
  });

  return (
    <Fragment>
      <Head
        prefix={`${artistData.artist.name}'s Club -`}
        title='Feeds'
        description='A catalog of memberships that are being offered by artists.'
      />
      <HStack
        maxHeight='calc(100vh - 240px)'
        overflow='hidden'
        justify='space-between'
      >
        <VStack
          flex={1}
          shrink={0}
          gap={4}
          pr={4}
          overflow='auto'
          className='thin-scrollbar'
        >
          <ArtistClubSummaryCard />
          <ArtistFeedsList forArtist={artistData.artist.username} />
        </VStack>

        <ArtistClubBioAdditionalContent />
      </HStack>
    </Fragment>
  );
}
ArtistClubFeedsPage.displayName = 'ArtistClubFeedsPage';

export default ArtistClubFeedsPage;
