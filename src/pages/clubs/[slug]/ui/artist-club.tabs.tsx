import { GeneralContextProvider, VStack } from '@holdr-ui/react';
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
import { useSuspenseGetClub } from '../../../../features';
import ArtistClubHeader from './artist-club.header';
import { useGetAuctionQuery } from '../../../../features';

function Content() {
  const { slug } = useParams();

  const { data } = useSuspenseGetClub({ slug: slug || '' });
  const { data: auctionData, error: auctionError } = useGetAuctionQuery(
    data?.club.id,
  );

  const activeAuction =
    auctionData?.auction?.id != null && auctionError == null;

  return (
    <GeneralContextProvider value={{ state: data.club, update: voidFn }}>
      <RadialSurface w='100%' radius={4} h='fit-content'>
        <VStack>
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
