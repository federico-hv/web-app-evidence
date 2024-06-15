import {
  HStack,
  Heading,
  VStack,
  Card,
  IconButton,
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
import { IClub } from '../../../../features';
import { Asset, Head } from '../../../../shared';

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
        <HStack gap={4}>
          <VStack>
            <Card
              boxShadow='base'
              h='484px'
              w='396px'
              bgImageUrl={Asset.Image.LightPlaceholder}
            >
              <Card.Header
                p={4}
                direction='horizontal'
                items='center'
                justify='space-between'
              >
                <HStack w='100%' justify={'flex-end'}>
                  <IconButton
                    size={'xl'}
                    colorTheme='base600'
                    icon='eye-show'
                    ariaLabel=''
                  />
                </HStack>
              </Card.Header>
              <Card.Body
                position='absolute'
                b={0}
                l={0}
                w='full'
                bgColor='#30304B'
                p={4}
                gap={4}
                css={{
                  blur: '12px',
                  borderBottomRadius: '$4',
                }}
              >
                <VStack>
                  <HStack h='18px'>
                    <Heading size={'16px'} weight={300} color='white600'>
                      Entry Price
                    </Heading>
                  </HStack>
                  <Box h='8px' />
                  <HStack h='23px'>
                    <Heading size={'20px'} weight={400} color='white500'>
                      $732.00 USD
                    </Heading>
                  </HStack>
                </VStack>
              </Card.Body>
            </Card>
          </VStack>
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
