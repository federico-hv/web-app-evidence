import { useContext, useEffect } from 'react';
import {
  Text,
  Image,
  Box,
  HStack,
  VStack,
  Center,
  IconButton,
} from '@holdr-ui/react';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from 'layouts';
import {
  EditProfileDialog,
  FollowButton,
  FriendButton,
  NotFoundContent,
  PageHeader,
  RecommendationListsGroup,
  SpinnerLoader,
} from 'components';
import { GET_PROFILE } from 'lib';
import { IProfile } from 'shared';
import { AuthContext } from 'contexts';

import darkPlaceholder from 'assets/images/dark-placeholder.webp';

function ProfilePage() {
  const currentUser = useContext(AuthContext).currentUser;
  const username = useLocation().pathname.split('/')[1];

  const { data, loading, error } = useQuery<{ profile: IProfile }>(
    GET_PROFILE,
    {
      variables: {
        payload: { username: username, id: currentUser?.id || 'id' },
      },
    },
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (error) {
    return <NotFoundContent />;
  }

  return (
    <ContentLayout>
      <ContentLayoutMain>
        {data && data.profile && (
          <PageHeader>
            {/* Add a back button */}
            <HStack w='100%' justify='space-between'>
              <VStack>
                <Text size={4} weight={500}>
                  {data.profile.displayName}
                </Text>
                <Text color='base400' weight={500} size={2}>
                  0 Posts
                </Text>
              </VStack>
              <Box>
                {data.profile.accountType === 'ARTIST' && <FollowButton />}
                {data.profile.accountType === 'FAN' && <FriendButton />}
              </Box>
            </HStack>
          </PageHeader>
        )}

        <Box position='absolute' t={65} w='100%'>
          <Box position='relative' h='100%' overflow='hidden'>
            <SpinnerLoader loading={loading}>
              {data && data.profile && (
                <Box h={150} w='full' mt={1} position='relative'>
                  <Box zIndex={1} position='absolute' t={0} l={0} w='100%'>
                    <Image
                      src={data.profile.coverImage}
                      w='100%'
                      h={150}
                      fallback={
                        <Box h='100%' w='100%' bgColor='base100' />
                      }
                    />
                  </Box>

                  <Box
                    h='100%'
                    position='relative'
                    zIndex={5}
                    bgColor='darkTint400'
                    px={6}
                  >
                    <HStack h='100%'>
                      <Center w='100%'>
                        <HStack w='100%' justify='space-between'>
                          <HStack gap={4}>
                            <Image
                              src={data.profile.avatar}
                              size={100}
                              radius={4}
                              fallbackSrc={darkPlaceholder}
                            />
                            <VStack py={2} justify='space-between'>
                              <VStack gap={1}>
                                <Text
                                  css={{ color: '#FFFFFF' }}
                                  size={5}
                                  weight={500}
                                >
                                  {data.profile.displayName}
                                </Text>
                                <Text color='base200' weight={500}>
                                  @{data.profile.username}
                                </Text>
                              </VStack>
                            </VStack>
                          </HStack>
                          {currentUser && (
                            <Box py={2}>
                              {data.profile.accountType === 'ARTIST' && (
                                <HStack gap={3}>
                                  <FollowButton />
                                  <IconButton
                                    variant='ghost'
                                    colorTheme='primary400'
                                    icon='more-fill'
                                    ariaLabel='view more artist profile options'
                                  />
                                </HStack>
                              )}
                              {data.profile.accountType === 'FAN' && (
                                <FriendButton />
                              )}
                              {data.profile.accountType === 'PERSONAL' && (
                                <EditProfileDialog />
                              )}
                            </Box>
                          )}
                        </HStack>
                      </Center>
                    </HStack>
                  </Box>
                </Box>
              )}
            </SpinnerLoader>

            <Box px={6}>
              <Box pt={4} fontSize={3}>
                🚧 {"Hol' Up, We are building!"} 🚧
              </Box>
            </Box>
          </Box>
        </Box>
      </ContentLayoutMain>
      <ContentLayoutAside>
        <RecommendationListsGroup />
      </ContentLayoutAside>
    </ContentLayout>
  );
}
ProfilePage.displayName = 'ProfilePage';
export default ProfilePage;
