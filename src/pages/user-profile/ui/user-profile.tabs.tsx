import UserProfileHeader from './user-profile.header';
import {
  CHECK_IS_PROFILE_BLOCKED_OR_PROTECTED,
  useCurrentUser,
} from '../../../features';
import { Navigate, useParams } from 'react-router-dom';
import {
  GQLRenderer,
  QueryGuard,
  RadialSurface,
  RoutingTabs,
  RoutingTabsContent,
  RoutingTabsHeader,
  RoutingTabsList,
  RoutingTabsTrigger,
  TextGroup,
  TextGroupHeading,
} from '../../../shared';
import { ProfileProvider } from '../shared';
import { ContentLayout, ContentLayoutMain } from '../../../layout';
import {
  Box,
  Center,
  CircularProgress,
  Icon,
  Text,
  VStack,
} from '@holdr-ui/react';

function UserProfileTabs() {
  const { username } = useParams();

  const currentUser = useCurrentUser();

  if (currentUser.role === 'artist' && username === currentUser.username) {
    return <Navigate to={`/artist/${currentUser.username}`} replace />;
  }

  return (
    <GQLRenderer>
      <ProfileProvider>
        <ContentLayout>
          <ContentLayoutMain>
            <RadialSurface w='100%' p={4} radius={4}>
              <UserProfileHeader />
              <QueryGuard
                query={CHECK_IS_PROFILE_BLOCKED_OR_PROTECTED}
                args={{ username }}
                name='checkIsProfileBlockedOrProtected'
                loader={
                  <Center
                    radius={2}
                    w='100%'
                    bgColor='rgba(48, 48, 75, 0.6)'
                    h='calc(100vh - 280px)'
                  >
                    <CircularProgress size={30} isIndeterminate />
                  </Center>
                }
                fallback={
                  <VStack
                    bgColor='rgba(48, 48, 75, 0.6)'
                    radius={2}
                    h='calc(100vh - 280px)'
                    w='100%'
                  >
                    <Center h='100%'>
                      <VStack items='center'>
                        <Box fontSize={9}>
                          <Icon
                            color='white400'
                            name='shield-keyhole-fill'
                          />
                        </Box>
                        <TextGroup w={500} items='center'>
                          <TextGroupHeading as='h2' size={5} weight={400}>
                            This profile is protected.
                          </TextGroupHeading>
                          <TextGroupHeading
                            align='center'
                            weight={300}
                            size={2}
                            color='white700'
                          >
                            <span>
                              {
                                "You cannot view the user's information because the account is protected. Only followers of "
                              }
                            </span>
                            <Text
                              weight={600}
                              css={{
                                display: 'inline-flex',
                              }}
                            >
                              @{username}
                            </Text>
                            <span>
                              {'  can view their bio and other info.'}
                            </span>
                          </TextGroupHeading>
                        </TextGroup>
                      </VStack>
                    </Center>
                  </VStack>
                }
              >
                <RoutingTabs flex={1}>
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
                        to='bid-history'
                        w='fit-content'
                        py={2}
                        px={6}
                        fontSize={2}
                        _hover={{ background: '#9898FF26' }}
                      >
                        Bid History
                      </RoutingTabsTrigger>
                    </RoutingTabsList>
                  </RoutingTabsHeader>
                  <RoutingTabsContent h='full' />
                </RoutingTabs>
              </QueryGuard>
            </RadialSurface>
          </ContentLayoutMain>
        </ContentLayout>
      </ProfileProvider>
    </GQLRenderer>
  );
}
UserProfileTabs.displayName = 'UserProfileTabs';

export default UserProfileTabs;
