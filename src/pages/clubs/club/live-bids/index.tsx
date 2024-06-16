import {
  HStack,
  VStack,
  Button,
  Icon,
  Input,
  Countdown,
  Box,
  useGeneralContext,
} from '@holdr-ui/react';
import { Fragment } from 'react';
import {
  ArtistClubActiveBiddersList,
  ArtistClubInactiveBiddersList,
  ArtistClubMembershipPerksSummaryList,
} from './ui';
import { IClub, MembershipCard } from '../../../../features';
import { getRandomNumberInRange, Head } from '../../../../shared';
import { dummyPerks } from '../../shared';

function ArtistClubLiveBidsPage() {
  const { state: club } = useGeneralContext<IClub>();

  function addDays(_date: Date, days: number) {
    let date = new Date(_date);
    date.setDate(date.getDate() + days);
    return date;
  }

  const targetDate = addDays(new Date(), 3);

  return (
    <Fragment>
      <Head
        prefix={`${club.artist.name}'s Club -`}
        title='Live Bids'
        description='A catalog of memberships that are being offered by artists.'
      />
      <VStack gap={6}>
        <HStack gap={4} h={500}>
          <Box flex={1} h='100%'>
            <MembershipCard
              showPerksOnHover={false}
              data={{
                coverImage: club.coverImage,
                price: getRandomNumberInRange(300, 500),
                perks: dummyPerks,
              }}
            />
          </Box>
          <VStack maxHeight='484px' w='468px' radius={4}>
            <ArtistClubMembershipPerksSummaryList clubId={club.id} />
            <VStack gap={2} flex={1} justify={'flex-end'}>
              <HStack gap={2} h={'24px'} items={'center'}>
                <Icon name='time-outline' />
                <Countdown
                  size='base'
                  color='white500'
                  targetDate={targetDate}
                />
              </HStack>
              <Input
                type='string'
                placeholder='Enter Amount'
                _placeholder={{
                  color: '$base600',
                }}
                color='white500'
                css={{
                  backgroundColor: '$purple1000',
                  height: '48px',
                  fontSize: '18px',
                }}
              />
              <Button
                radius={2}
                colorTheme='purple500'
                fullWidth
                style={{
                  height: '48px',
                }}
              >
                Place Bid
              </Button>
            </VStack>
          </VStack>
        </HStack>
        <ArtistClubActiveBiddersList clubId={club.id} />
        <ArtistClubInactiveBiddersList clubId={club.id} />
      </VStack>
    </Fragment>
  );
}

ArtistClubLiveBidsPage.displayName = 'ArtistClubLiveBidsPage';
export default ArtistClubLiveBidsPage;
