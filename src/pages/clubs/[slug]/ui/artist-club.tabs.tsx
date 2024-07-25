import { Box, GeneralContextProvider, VStack } from '@holdr-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import {
  GQLRenderer,
  makePath,
  Paths,
  RadialSurface,
  RoutingTabs,
  RoutingTabsContent,
  RoutingTabsHeader,
  RoutingTabsList,
  RoutingTabsTrigger,
  voidFn,
} from '../../../../shared';
import {
  GET_ACCOUNT_INFO,
  IAccountInfo,
  useAccountInfo,
  useSuspenseGetClub,
} from '../../../../features';
import ArtistClubHeader from './artist-club.header';
import {
  LiveBidsAlert,
  getLiveBidAlert,
  AlertOrder,
} from '../live-bids/ui/live-bids-alerts';
import { useEffect, useState } from 'react';
import {
  AuctionData,
  IAuction,
  useGetAuction,
} from '../../../../features/auction/shared/hooks/use-get-auction';
import { useQuery } from '@apollo/client';

export interface OutletContext {
  auctionData: AuctionData;
  onToggleAlert: (alertIndex: number) => void;
}

function Content() {
  const { data: accountData } = useQuery<{
    accountInfo: IAccountInfo;
  }>(GET_ACCOUNT_INFO);

  const [alert, setAlert] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const { slug } = useParams();

  const { data, error } = useSuspenseGetClub({ slug: slug || '' });
  const { data: auctionData, error: auctionError } = useGetAuction(
    data?.club.id,
  );

  const email = accountData?.accountInfo.email || '';

  const alertProps = getLiveBidAlert(alert, email);

  const activeAuction =
    auctionData?.auction?.id != null && auctionError == null;

  const toggleAlert = (alert: number) => {
    setAlert(alert);
    setAlertVisible(!alertVisible);

    setTimeout(() => {
      setAlertVisible(false);
    }, 5000);
  };

  return (
    <GeneralContextProvider value={{ state: data.club, update: voidFn }}>
      <RadialSurface w='100%' radius={4} h='fit-content'>
        <VStack>
          {alertVisible && (
            <Box
              bg='rgba(28,27,38,1)'
              position='sticky'
              zIndex={100}
              px={5}
              py={5}
              t={80}
              css={{
                border: '1px solid rgba(152, 152, 255, 0.10)',
              }}
            >
              <LiveBidsAlert {...alertProps} />
            </Box>
          )}
          <VStack px={5} py={5} h='100%'>
            <ArtistClubHeader />
            <RoutingTabs defaultValue='bio' flex={1}>
              <RoutingTabsHeader
                borderBottom={1}
                borderColor='rgba(152, 152, 255, 0.10)'
              >
                <RoutingTabsList gap={1}>
                  <RoutingTabsTrigger
                    to='bio'
                    w='fit-content'
                    py={2}
                    px={6}
                    fontSize={2}
                    _hover={{ background: '#9898FF26' }}
                  >
                    Bio
                  </RoutingTabsTrigger>
                  <RoutingTabsTrigger
                    to='feeds'
                    w='fit-content'
                    py={2}
                    px={6}
                    fontSize={2}
                    _hover={{ background: '#9898FF26' }}
                  >
                    Feed
                  </RoutingTabsTrigger>
                  {activeAuction && (
                    <RoutingTabsTrigger
                      to='live-bids'
                      w='fit-content'
                      py={2}
                      px={6}
                      fontSize={2}
                      _hover={{ background: '#9898FF26' }}
                    >
                      Live Bids
                    </RoutingTabsTrigger>
                  )}

                  <RoutingTabsTrigger
                    to='membership-perks'
                    w='fit-content'
                    py={2}
                    px={6}
                    fontSize={2}
                    _hover={{ background: '#9898FF26' }}
                  >
                    Membership Perks
                  </RoutingTabsTrigger>
                </RoutingTabsList>
              </RoutingTabsHeader>

              <RoutingTabsContent
                Fallback={() => <Navigate to={makePath([Paths.clubs])} />}
                mt={4}
                flex={1}
                context={{
                  auctionData,
                  onToggleAlert: toggleAlert,
                }}
              />
            </RoutingTabs>
          </VStack>
        </VStack>
      </RadialSurface>
    </GeneralContextProvider>
  );
}

function ArtistClubTabs() {
  return (
    <GQLRenderer
      ErrorFallback={() => <Navigate to={makePath([Paths.clubs])} />}
    >
      <Content />
    </GQLRenderer>
  );
}

ArtistClubTabs.displayName = 'ArtistClubTabs';

export default ArtistClubTabs;
