import { GeneralContextProvider, VStack } from '@holdr-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import {
  GQLRenderer,
  makePath,
  NotFoundError,
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
  CheckBidStatus,
  ISaveClubViewsArgs,
  ISaveClubViewsResponse,
  SAVE_CLUB_VIEWS,
  SaveViews,
  useCurrentUser,
  useSuspenseGetArtist,
  useSuspenseGetClub,
} from '../../../../features';
import ArtistClubHeader from './artist-club.header';
import { useGetAuctionQuery } from '../../../../features';
import AuctionAlert from './auction.alert';
import { AuctionAlertProvider } from '../shared/contexts';
import { Fragment } from 'react';

function Content() {
  const { slug } = useParams();

  const currentUser = useCurrentUser();

  const { data: clubData } = useSuspenseGetClub({ slug: slug || '' });

  const { data: auctionData, error: auctionError } = useGetAuctionQuery(
    clubData?.club.id,
  );

  const { data: artistData } = useSuspenseGetArtist({
    slug,
  });

  const activeAuction =
    auctionData?.auction?.id != null && auctionError == null;

  return (
    <Fragment>
      <SaveViews<ISaveClubViewsResponse, ISaveClubViewsArgs>
        mutation={SAVE_CLUB_VIEWS}
        name='saveClubViews'
        args={{ clubIds: [clubData.club.id] }}
      />
      <AuctionAlertProvider>
        <GeneralContextProvider
          value={{ state: clubData.club, update: voidFn }}
        >
          <RadialSurface
            w='100%'
            radius={4}
            h='100%'
            overflowY='hidden'
            // position='relative'
          >
            <VStack h='100%' px={2} py={5}>
              <VStack
                pt={1}
                className='thin-scrollbar'
                h='100%'
                overflow='auto'
                css={{
                  paddingInline: '$3',
                }}
              >
                <AuctionAlert />
                <CheckBidStatus />
                <ArtistClubHeader />
                <RoutingTabs defaultValue='bio' flex={1}>
                  <RoutingTabsHeader
                    borderBottom={1}
                    borderColor='rgba(152, 152, 255, 0.10)'
                  >
                    <RoutingTabsList gap={1}>
                      {currentUser.id !== artistData.artist.accountId && (
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
                      )}
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
                    Fallback={() => (
                      <Navigate to={makePath([Paths.clubs])} />
                    )}
                    mt={4}
                    flex={1}
                  />
                </RoutingTabs>
              </VStack>
            </VStack>
          </RadialSurface>
        </GeneralContextProvider>
      </AuctionAlertProvider>
    </Fragment>
  );
}

function ArtistClubTabs() {
  return (
    <GQLRenderer ErrorFallback={() => <NotFoundError />}>
      <Content />
    </GQLRenderer>
  );
}

ArtistClubTabs.displayName = 'ArtistClubTabs';

export default ArtistClubTabs;
