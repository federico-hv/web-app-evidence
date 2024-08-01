import { Box, VStack, Heading, StackDivider } from '@holdr-ui/react';
import { Fragment } from 'react';
import { useSuspenseGetArtist } from '../../../../features';
import { ArtistClubPerkItem } from './ui';
import { FlatList } from '../../../../tmp/flat-list';
import { Head, RadialSurface } from '../../../../shared';
import { useParams } from 'react-router-dom';
import { dummyPerksData } from '../shared';

function ArtistClubMembershipPerksPage() {
  const { slug } = useParams();

  const { data: artistData } = useSuspenseGetArtist({
    slug,
  });

  return (
    <Fragment>
      <Head
        prefix={`${artistData.artist.name}'s Club -`}
        title='Perks'
        description='A catalog of memberships that are being offered by artists.'
      />
      <RadialSurface
        radius={2}
        h='100%'
        className='thin-scrollbar'
        maxHeight='calc(100vh - 250px)'
        overflow='auto'
      >
        <VStack
          divider={
            <StackDivider width={1} color='rgba(152, 152, 255, 0.10)' />
          }
        >
          <Box px={4} py={2}>
            <Heading weight={400} size={5}>
              Membership Details
            </Heading>
          </Box>
          <FlatList
            px={6}
            py={8}
            gap={8}
            direction='vertical'
            data={dummyPerksData}
            renderItem={(item) => <ArtistClubPerkItem data={item} />}
            keyExtractor={(item) => `MembershipDetails-${item.id}`}
          />
        </VStack>
      </RadialSurface>
    </Fragment>
  );
}

ArtistClubMembershipPerksPage.displayName =
  'ArtistClubMembershipPerksPage';
export default ArtistClubMembershipPerksPage;
