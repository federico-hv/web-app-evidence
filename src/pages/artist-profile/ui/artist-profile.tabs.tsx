import { Box, Heading } from '@holdr-ui/react';
import {
  GQLRenderer,
  RadialSurface,
  RoutingTabs,
  RoutingTabsContent,
  RoutingTabsHeader,
  RoutingTabsList,
  RoutingTabsTrigger,
} from '../../../shared';
import { ContentLayout, ContentLayoutMain } from '../../../layout';

function ArtistProfileTabs() {
  return (
    <GQLRenderer>
      <ContentLayout>
        <ContentLayoutMain>
          <Box h='full'>
            <RadialSurface w='100%' p={4} radius={4}>
              <Heading
                pl={6}
                mb={40}
                color='white100'
                weight={400}
                size={6}
              >
                My Profile
              </Heading>
              <RoutingTabs flex={1}>
                <RoutingTabsHeader
                  borderBottom={1}
                  borderColor='rgba(152, 152, 255, 0.10)'
                >
                  <RoutingTabsList gap={1}>
                    <RoutingTabsTrigger
                      w='fit-content'
                      py={2}
                      px={6}
                      fontSize={2}
                      _hover={{ background: '#9898FF26' }}
                      to='dashboard'
                    >
                      Dashboard
                    </RoutingTabsTrigger>
                    <RoutingTabsTrigger
                      w='fit-content'
                      py={2}
                      px={6}
                      fontSize={2}
                      _hover={{ background: '#9898FF26' }}
                      to='members'
                    >
                      My Members
                    </RoutingTabsTrigger>
                    <RoutingTabsTrigger
                      w='fit-content'
                      py={2}
                      px={6}
                      fontSize={2}
                      _hover={{ background: '#9898FF26' }}
                      to='watchlist'
                    >
                      Watchlist
                    </RoutingTabsTrigger>
                  </RoutingTabsList>
                </RoutingTabsHeader>
                <RoutingTabsContent pt='40px' h='full' />
              </RoutingTabs>
            </RadialSurface>
          </Box>
        </ContentLayoutMain>
      </ContentLayout>
    </GQLRenderer>
  );
}
ArtistProfileTabs.displayName = 'ArtistProfileTabs';

export default ArtistProfileTabs;
