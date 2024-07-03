import {
  HStack,
  VStack,
  Button,
  Icon,
  Input,
  Countdown,
  Box,
  useGeneralContext,
  useInputChange,
} from '@holdr-ui/react';
import { Fragment, useEffect } from 'react';
import {
  ArtistClubActiveBiddersList,
  ArtistClubInactiveBiddersList,
  ArtistClubMembershipPerksSummaryList,
} from './ui';
import {
  IClub,
  MembershipCard,
  useSuspenseGetArtist,
} from '../../../../features';
import {
  getRandomNumberInRange,
  Head,
  makePath,
  useAlertDialog,
} from '../../../../shared';
import { dummyPerks } from '../../shared';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const DialogState = {
  addPayment: {
    title: 'Add a payment method',
    description:
      'To participate in a live auction, please add a payment method. This allows you to bid and win memberships in real-time auctions',
    actionText: 'Add payment',
    cancelText: 'Add later',
  },
};

function useAddPaymentMethod() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  return () =>
    navigate(makePath(['payment-method', 'add']), {
      state: {
        previousLocation: pathname,
      },
    });
}

function PaymentMethodAlertDialog() {
  const addPaymentMethod = useAddPaymentMethod();

  const { openWith } = useAlertDialog();

  useEffect(() => {
    openWith({ ...DialogState.addPayment, onAction: addPaymentMethod });
  }, []);

  return <Fragment />;
}

function ArtistClubLiveBidsPage() {
  const { slug } = useParams();

  const { value, handleOnChange } = useInputChange('');

  const { data: artistData } = useSuspenseGetArtist({
    slug,
  });

  const { state: club } = useGeneralContext<IClub>();

  const addPaymentMethod = useAddPaymentMethod();

  const targetDate = dayjs().add(3, 'd').toDate();

  return (
    <Fragment>
      <Head
        prefix={`${artistData.artist.name}'s Club -`}
        title='Live Bids'
        description='A catalog of memberships that are being offered by artists.'
      />

      {/*<PaymentMethodAlertDialog />*/}

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
          <VStack flex={1} radius={4}>
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
                value={value}
                onChange={handleOnChange}
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
                onClick={addPaymentMethod}
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
