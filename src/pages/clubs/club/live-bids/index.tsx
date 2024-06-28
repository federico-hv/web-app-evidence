import {
  HStack,
  VStack,
  Button,
  Icon,
  Input,
  Countdown,
  Box,
  useGeneralContext,
  useDisclosure,
  Heading,
  Text,
  Dialog,
} from '@holdr-ui/react';
import { Fragment, useEffect, useState } from 'react';
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
import { getRandomNumberInRange, Head } from '../../../../shared';
import { dummyPerks } from '../../shared';
import { useParams } from 'react-router-dom';
import LiveBidsDialog, { Disclosure } from './ui/live-bids-dialog';
import { BillingForm, PaymentMethodForm } from '../../../../shared';
import { useLocation } from 'react-router-dom';

function ArtistClubLiveBidsPage() {
  const { slug } = useParams();

  const { data: artistData } = useSuspenseGetArtist({
    slug,
  });

  const { state: club } = useGeneralContext<IClub>();
  const disclosure: Disclosure = useDisclosure(true);
  const [dialog, setDialog] = useState(0);

  const location = useLocation();
  const { dialogMessage } = location.state || {};

  useEffect(() => {
    if (dialogMessage) {
      if (dialogMessage === 'congratulations') {
        setDialog(4);
      } else if (dialogMessage === 'updatebid') {
        disclosure.onClose();
      }
    }
  }, []);

  function addDays(_date: Date, days: number) {
    const date = new Date(_date);
    date.setDate(date.getDate() + days);
    return date;
  }

  const targetDate = addDays(new Date(), 3);

  const onNextDialog = () => {
    // disclosure.onClose();
    setDialog(dialog + 1);
    // disclosure.onOpen();
  };

  const ActionDialog = ({
    title,
    bodyText,
    actionOneTitle,
    actionTwoTitle,
  }: {
    title: string;
    bodyText: string;
    actionOneTitle: string;
    actionTwoTitle: string;
  }) => (
    <VStack>
      <Box>
        <Heading size={'24px'} weight={500} css={{ lineHeight: '115%' }}>
          {title}
        </Heading>
      </Box>
      <Box pt={'24px'} pb='32px'>
        <Text>{bodyText}</Text>
      </Box>
      <HStack>
        <Button
          type='button'
          radius={1}
          colorTheme='purple500'
          css={{
            padding: '14px 28px',
            // width: '123px',
          }}
          onClick={onNextDialog}
        >
          <Text size='14px' weight={500}>
            {actionOneTitle}
          </Text>
        </Button>

        <VStack justify='center' items='center' py='14px' px='28px'>
          <Dialog.Close>
            <Text
              color='white700'
              size='14px'
              weight={500}
              css={{ textDecoration: 'underline' }}
            >
              {actionTwoTitle}
            </Text>
          </Dialog.Close>
        </VStack>
      </HStack>
    </VStack>
  );

  const dialogProps = [
    {
      bodyChild: (
        <ActionDialog
          title='Add a payment method'
          bodyText='To participate in a live auction, please add a payment method. This allows you to bid and win memberships in real-time auctions'
          actionOneTitle='Add Payment'
          actionTwoTitle='Add Later'
        />
      ),
    },
    {
      bodyChild: <PaymentMethodForm onContinue={onNextDialog} />,
    },
    {
      bodyChild: (
        <BillingForm
          onContinue={() => {
            disclosure.onClose();
          }}
        />
      ),
    },
    {
      bodyChild: (
        <ActionDialog
          title='Are you sure?'
          bodyText='Leaving this page will no longer allow you to update your bid in the live auction membership for Boslen’s club'
          actionOneTitle='Stay on page'
          actionTwoTitle='Leave page'
        />
      ),
    },
    {
      bodyChild: (
        <ActionDialog
          title='Congratulations!'
          bodyText='You are now an exclusive member of Jade Lightning’s club. Get ready to explore exclusive benefits and exciting opportunities!'
          actionOneTitle='View membership'
          actionTwoTitle='Later'
        />
      ),
    },
  ];

  const dialogBodyChild = dialogProps[dialog].bodyChild;

  return (
    <Fragment>
      <Head
        prefix={`${artistData.artist.name}'s Club -`}
        title='Live Bids'
        description='A catalog of memberships that are being offered by artists.'
      />
      <LiveBidsDialog
        disclosure={disclosure}
        contentProps={{
          minHeight: '310px',
          w: '540px',
          bgColor: '#30304B',
          zIndex: 100,
        }}
        bodyChild={dialogBodyChild}
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
