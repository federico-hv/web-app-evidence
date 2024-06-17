import {
  Button,
  Center,
  Heading,
  HStack,
  useGeneralContext,
} from '@holdr-ui/react';
import { IClub, useCurrentUser } from '../../../../features';
import ArtistClubSocialButton from './artist-club-social.button';

function ArtistClubHeader() {
  const currentUser = useCurrentUser();

  const { state: club } = useGeneralContext<IClub>();

  return (
    <HStack py={3} gap={4} items='center' justify='space-between'>
      <HStack gap={4} items='center'>
        <Heading weight={400} size={6} css={{ lineHeight: '115%' }}>
          {`${club.artist.name}'s`} Club Page
        </Heading>
        <Center
          px={2}
          border={1}
          fontWeight={500}
          fontSize={2}
          borderColor='success500'
          color='success500'
          radius={1}
        >
          LIVE
        </Center>
      </HStack>
      <HStack gap={4}>
        {currentUser.id === club.artist.accountId ? (
          <Button
            variant='outline'
            css={{ px: '50px' }}
            colorTheme='purple50'
            onClick={() => console.log('Open edit')}
          >
            Edit
          </Button>
        ) : (
          <ArtistClubSocialButton username={club.artist.username} />
        )}
        <Button
          css={{ px: '50px' }}
          colorTheme='purple100'
          onClick={() => console.log('Open edit')}
        >
          Create Auction
        </Button>
      </HStack>
    </HStack>
  );
}
ArtistClubHeader.displayName = 'ArtistClubHeader';

export default ArtistClubHeader;
