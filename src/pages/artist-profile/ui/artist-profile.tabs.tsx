import { Box, Button, Heading, HStack } from '@holdr-ui/react';
import {
  GQLRenderer,
  Loader,
  makePath,
  RadialSurface,
  RoutingTabs,
  RoutingTabsContent,
  RoutingTabsHeader,
  RoutingTabsList,
  RoutingTabsTrigger,
} from '../../../shared';
import { ContentLayout, ContentLayoutMain } from '../../../layout';
import { Link, Navigate } from 'react-router-dom';
import { useCurrentUser, useGetClub } from '../../../features';

function ArtistProfileTabs() {
  const currentUser = useCurrentUser();

  const { data, loading } = useGetClub({ slug: currentUser.username });

  if (!loading && !data) {
    return <Navigate to='/' replace />;
  }

  return (
    <Loader loading={loading}>
      <GQLRenderer>
        <ContentLayout>
          <ContentLayoutMain>
            <Box h='full'>
              <RadialSurface w='100%' p={4} radius={4}>
                <HStack
                  py={4}
                  mb={40}
                  items='center'
                  justify='space-between'
                >
                  <Heading color='white100' weight={400} size={6}>
                    My Profile
                  </Heading>
                  {data && (
                    <Link to={makePath(['memberships', data.club.id])}>
                      <Button colorTheme='purple100' css={{ px: '36px' }}>
                        Edit membership page
                      </Button>
                    </Link>
                  )}
                </HStack>
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
                        to='bio'
                      >
                        Bio
                      </RoutingTabsTrigger>
                      <RoutingTabsTrigger
                        w='fit-content'
                        py={2}
                        px={6}
                        fontSize={2}
                        _hover={{ background: '#9898FF26' }}
                        to='stats'
                      >
                        Stats
                      </RoutingTabsTrigger>
                      <RoutingTabsTrigger
                        w='fit-content'
                        py={2}
                        px={6}
                        fontSize={2}
                        _hover={{ background: '#9898FF26' }}
                        to='my-members'
                      >
                        My Members
                      </RoutingTabsTrigger>
                      {/*<RoutingTabsTrigger*/}
                      {/*  w='fit-content'*/}
                      {/*  py={2}*/}
                      {/*  px={6}*/}
                      {/*  fontSize={2}*/}
                      {/*  _hover={{ background: '#9898FF26' }}*/}
                      {/*  to='watchlist'*/}
                      {/*>*/}
                      {/*  Watchlist*/}
                      {/*</RoutingTabsTrigger>*/}
                    </RoutingTabsList>
                  </RoutingTabsHeader>

                  <RoutingTabsContent pt='40px' h='full' />
                </RoutingTabs>
              </RadialSurface>
            </Box>
          </ContentLayoutMain>
        </ContentLayout>
      </GQLRenderer>
    </Loader>
  );
}
ArtistProfileTabs.displayName = 'ArtistProfileTabs';

export default ArtistProfileTabs;
