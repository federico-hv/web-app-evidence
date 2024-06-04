import {
  GQLRenderer,
  RadialSurface,
  RoutingTabs,
  RoutingTabsContent,
  RoutingTabsHeader,
  RoutingTabsList,
  RoutingTabsTrigger,
} from '../../shared';
import { ProfileProvider } from '../profile/shared';
import { ContentLayout, ContentLayoutMain } from '../../layout';
import { Box, Heading } from '@holdr-ui/react';

function ArtistProfilePage() {
  return (
    <GQLRenderer>
      <ProfileProvider>
        <ContentLayout>
          <ContentLayoutMain>
            <Box h='full'>
              <RadialSurface
                w='100%'
                h='full'
                p={4}
                radius={4}
                minHeight='calc(100vh - 96px)'
              >
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
                        to='club'
                      >
                        My Club Page
                      </RoutingTabsTrigger>
                      <RoutingTabsTrigger
                        w='fit-content'
                        py={2}
                        px={6}
                        fontSize={2}
                        _hover={{ background: '#9898FF26' }}
                        to='membership'
                      >
                        My Membership Page
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
      </ProfileProvider>
    </GQLRenderer>
  );
}

export default ArtistProfilePage;
