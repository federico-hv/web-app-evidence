import { Box, GeneralContextProvider } from '@holdr-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import { Fragment } from 'react';
import {
  GQLRenderer,
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

function Content() {
  const { slug } = useParams();

  const { data } = useSuspenseGetClub({ slug: slug || '' });

  return (
    <GeneralContextProvider value={{ state: data.club, update: voidFn }}>
      <RadialSurface w='100%' radius={4} h='fit-content'>
        <Box px={5} py={5}>
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

            <RoutingTabsContent mt={4} h='full' />
          </RoutingTabs>
        </Box>
      </RadialSurface>
    </GeneralContextProvider>
  );
}

function ArtistClubTabs() {
  return (
    <GQLRenderer>
      <Content />
    </GQLRenderer>
  );
}

ArtistClubTabs.displayName = 'ArtistClubTabs';

export default ArtistClubTabs;
