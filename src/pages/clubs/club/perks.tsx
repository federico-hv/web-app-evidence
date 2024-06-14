import {
  Box,
  Card,
  HStack,
  List,
  OrderedList,
  VStack,
  Text,
  IconButton,
  Heading,
  UnorderedList,
  AvatarGroup,
  Avatar,
} from '@holdr-ui/react';
import { ArtistProfileCard } from './bio';
import {
  IPerk,
  useClubContext,
  useGetClub,
  useGetClubPerks,
} from '../../../features/clubs/shared';
import { useCurrentUser } from '../../../features/auth/shared';

function Perk({ label, description }: IPerk) {
  return (
    <VStack py={4}>
      <HStack gap={2} h='21px' items={'center'}>
        <Heading size={'18px'} weight={500} color='white500'>
          {label}
        </Heading>
        <Text color='white700'>{''}</Text>
      </HStack>
      <Box h='12px' />
      <VStack h='32px'>
        <Text
          size={'14px'}
          weight={400}
          color='white700'
          css={{ lineHeight: '115%' }}
        >
          {description}
        </Text>
      </VStack>
    </VStack>
  );
}

function ArtistMembershipPerks() {
  const account = useCurrentUser();

  const {
    data: clubData,
    loading,
    error,
  } = useGetClub({
    accountId: account?.id,
  });

  // const club = useClubContext(); // Not working gives me empty id

  const {
    loading: loadingPerks,
    data,
    error: errorPerks,
  } = useGetClubPerks(clubData?.club.id as string); //club.id from context not working

  // console.log('CLUB_DATA:  ', clubData?.club);
  // console.log('PERKS:  ', data?.clubPerks);
  // console.log('USE THIS:  ', clubData?.club.id);

  // const perksData = [
  //   {
  //     label: 'Private Chat',
  //     detail: '',
  //     description: `Access to a dedicated online fan club community, where
  //     members can connect, share stories, and discuss their love
  //     for the artist. Exclusive forums and chatrooms will foster
  //     interaction between fans.`,
  //   },
  //   {
  //     label: 'Direct notifications',
  //     detail: '',
  //     description: `Members will receive updates and personalized responses
  //     providing a unique opportunity for them to connect directly
  //     with their favourite artists.`,
  //   },
  //   {
  //     label: 'FOTL (Front of the line) Access',
  //     detail: '',
  //     description: `Members receive a unique pass granting them VIP access to
  //     all of the musician's concerts and performances, including
  //     sound checks and meet-and-greet sessions.`,
  //   },
  //   {
  //     label: 'Community Playlist',
  //     detail: '',
  //     description: `Members receive an invite to Boslen’s exclusive playlist
  //     granting them access to all of the musician's favourite new
  //     songs, and allowing them to connect and curate the playlist
  //     further with other membership owners.`,
  //   },
  //   {
  //     label: 'VIP Tickets to Infinite Solitude Tour',
  //     detail: '(2 tickets per member)',
  //     description: `Members will have priority access to pre-sale tickets for
  //     all concerts and events, ensuring they get the best seats
  //     in the house before they go on sale to the general public.`,
  //   },
  //   {
  //     label: 'Exclusive Lightning Collective Hoodies',
  //     detail: '(1 product per member)',
  //     description: `Members enjoy exclusive discounts on the artist's official
  //     merchandise, allowing them to show their support with
  //     unique items at a more affordable price.`,
  //   },
  //   {
  //     label: 'Private access to unreleased music and videos',
  //     detail: '',
  //     description: `Access to an extensive library of unreleased music, demos,
  //     and rare recordings. Members can explore the artist's
  //     musical journey, discovering hidden gems and unreleased
  //     tracks not available anywhere else.`,
  //   },
  // ];

  const perksData = data?.clubPerks || [];

  return (
    <VStack
      flex={2}
      radius={2}
      bgColor='rgba(48, 48, 75, 0.4)'
      divider={
        <Box
          w={'100%'}
          h={'0.5px'}
          bgColor='purple300'
          css={{ opacity: '10%' }}
        />
      }
    >
      <Card
        w='100%'
        boxShadow='base'
        divider={
          <Box
            w={'100%'}
            h={'1px'}
            bgColor='purple300'
            css={{ opacity: '10%' }}
          />
        }
      >
        <Card.Header
          direction='horizontal'
          items='center'
          justify='space-between'
        >
          <VStack justify={'center'} h='48px' px={'16px'} py='8px'>
            <Box h='23px'>
              <Heading weight={400} size={'20px'}>
                Membership Details
              </Heading>
            </Box>
          </VStack>
        </Card.Header>
        <Card.Body
          w='full'
          px='32px'
          py='24px'
          css={{
            blur: '12px',
            borderBottomRadius: '$4',
          }}
        >
          {perksData.map((perk: IPerk) => (
            <Perk {...perk} />
          ))}
        </Card.Body>
      </Card>
    </VStack>
  );
}

ArtistMembershipPerks.displayName = 'ArtistMembershipPerks';
export default ArtistMembershipPerks;
