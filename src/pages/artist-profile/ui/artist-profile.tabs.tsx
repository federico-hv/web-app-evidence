import { Box, Button, Heading, HStack, VStack } from '@holdr-ui/react';
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
import { Link, Navigate } from 'react-router-dom';
import { useCurrentUser, useGetClub } from '../../../features';

function ArtistProfileTabs() {
  const currentUser = useCurrentUser();

  const { data, loading } = useGetClub({ slug: currentUser.username });

  if (!loading && !data) {
    return <Navigate to='/' replace />;
  }

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <GQLRenderer>
      <RadialSurface overflowY='hidden' h='100%' w='100%' radius={4}>
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
            <HStack py={4} mb={40} items='center' justify='space-between'>
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
          </VStack>
        </VStack>
      </RadialSurface>
    </GQLRenderer>
  );
}
ArtistProfileTabs.displayName = 'ArtistProfileTabs';

export default ArtistProfileTabs;
