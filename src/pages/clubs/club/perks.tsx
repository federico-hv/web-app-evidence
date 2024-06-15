import {
  Box,
  HStack,
  VStack,
  Text,
  Heading,
  Separator,
  StackDivider,
  useGeneralContext,
} from '@holdr-ui/react';
import { IClub, IPerk } from '../../../features';
import { Head, Loader, RadialSurface } from '../../../shared';
import { FlatList } from '../../../tmp/flat-list';
import { Fragment } from 'react';

function Perk({ data }: { data: IPerk & { additionalInfo?: string } }) {
  return (
    <VStack>
      <HStack gap={2} h='21px' items={'center'}>
        <Text size={4} weight={500} color='white500'>
          {data.label}
        </Text>
        <Text size={2} color='white700'>
          {data.additionalInfo}
        </Text>
      </HStack>
      <Box h='12px' />
      <VStack h='32px'>
        <Text
          size={'14px'}
          weight={400}
          color='white700'
          css={{ lineHeight: '115%' }}
        >
          {data.description}
        </Text>
      </VStack>
    </VStack>
  );
}

function ArtistMembershipPerks() {
  const { state: club } = useGeneralContext<IClub>();

  const perksData: IPerk[] = [
    {
      id: 1,
      label: 'Private Chat',
      additionalInfo: '',
      description: `Access to a dedicated online fan club community, where
      members can connect, share stories, and discuss their love
      for the artist. Exclusive forums and chatrooms will foster
      interaction between fans.`,
    },
    {
      id: 2,
      label: 'Direct notifications',
      additionalInfo: '',
      description: `Members will receive updates and personalized responses
      providing a unique opportunity for them to connect directly
      with their favourite artists.`,
    },
    {
      id: 3,
      label: 'FOTL (Front of the line) Access',
      additionalInfo: '',
      description: `Members receive a unique pass granting them VIP access to
      all of the musician's concerts and performances, including
      sound checks and meet-and-greet sessions.`,
    },
    {
      id: 4,
      label: 'Community Playlist',
      additionalInfo: '',
      description: `Members receive an invite to Boslen’s exclusive playlist
      granting them access to all of the musician's favourite new
      songs, and allowing them to connect and curate the playlist
      further with other membership owners.`,
    },
    {
      id: 5,
      label: 'VIP Tickets to Infinite Solitude Tour',
      additionalInfo: '(2 tickets per member)',
      description: `Members will have priority access to pre-sale tickets for
      all concerts and events, ensuring they get the best seats
      in the house before they go on sale to the general public.`,
    },
    {
      id: 6,
      label: 'Exclusive Lightning Collective Hoodies',
      additionalInfo: '(1 product per member)',
      description: `Members enjoy exclusive discounts on the artist's official
      merchandise, allowing them to show their support with
      unique items at a more affordable price.`,
    },
    {
      id: 7,
      label: 'Private access to unreleased music and videos',
      additionalInfo: '',
      description: `Access to an extensive library of unreleased music, demos,
      and rare recordings. Members can explore the artist's
      musical journey, discovering hidden gems and unreleased
      tracks not available anywhere else.`,
    },
  ];

  return (
    <Fragment>
      <Head
        prefix={`${club.artist.name}'s Club -`}
        title='Perks'
        description='A catalog of memberships that are being offered by artists.'
      />
      <RadialSurface radius={2}>
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
            data={perksData}
            renderItem={(item) => <Perk data={item} />}
            keyExtractor={(item) => item.id}
          />
        </VStack>
      </RadialSurface>
    </Fragment>
  );
}

ArtistMembershipPerks.displayName = 'ArtistMembershipPerks';
export default ArtistMembershipPerks;
