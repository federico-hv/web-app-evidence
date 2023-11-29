import { useSuspenseQuery } from '@apollo/client';
import {
  Avatar,
  Box,
  Button,
  Circle,
  Drawer,
  Flex,
  HStack,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import { Fragment } from 'react';
import { GET_RELATIONSHIP_COUNT, useCurrentUser } from '../../../features';
import ProfileDrawerOption from './profile-drawer-option';
import {
  TextGroup,
  TextGroupSubheading,
  UserNamesGroup,
} from '../../../shared/components';
import {
  extraBtnPadding,
  LinkOverlay,
  Paths,
  prefix,
  useLogout,
} from '../../../shared';
import { Link } from 'react-router-dom';

function ProfileDrawer() {
  const logout = useLogout();
  const currentUser = useCurrentUser();

  const { data } = useSuspenseQuery<
    {
      followers: { total: number };
      following: { total: number };
    },
    { username: string }
  >(GET_RELATIONSHIP_COUNT, {
    variables: { username: currentUser?.username || '' },
  });

  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <Flex css={{ userSelect: 'none' }}>
        <Box onClick={onOpen}>
          {currentUser ? (
            <Avatar
              size='sm'
              src={currentUser?.avatar}
              name={currentUser?.displayName}
            />
          ) : (
            <Circle size={24} />
          )}
        </Box>
      </Flex>

      <Drawer isOpen={isOpen} onClose={onClose} placement='right'>
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content>
            <Box minWidth={1} position='relative' h='100%'>
              <Box
                position='absolute'
                t={0}
                r={0}
                h='100%'
                w='80vw'
                overflow='hidden'
                css={{
                  backgroundColor: '#fcfbfa',
                  borderTopLeftRadius: '$3',
                  borderBottomLeftRadius: '$3',
                }}
              >
                <VStack h='100%'>
                  <VStack pb={4}>
                    {currentUser && (
                      <HStack gap={3} p={4} position='relative'>
                        <LinkOverlay
                          onClick={onClose}
                          to={prefix('/', currentUser.username)}
                        />
                        <Avatar
                          size='sm'
                          variant='squircle'
                          src={currentUser.avatar}
                          name={currentUser.displayName}
                        />
                        <UserNamesGroup
                          displayName={currentUser.displayName}
                          username={currentUser.username}
                        />
                      </HStack>
                    )}
                    <HStack gap={4} px={4}>
                      <TextGroup
                        w='fit-content'
                        fontSize={2}
                        direction='horizontal'
                      >
                        <TextGroupSubheading weight={500}>
                          {data.followers.total}
                        </TextGroupSubheading>
                        <TextGroupSubheading color='base400' weight={500}>
                          Followers
                        </TextGroupSubheading>
                      </TextGroup>
                      <TextGroup
                        w='fit-content'
                        fontSize={2}
                        direction='horizontal'
                      >
                        <TextGroupSubheading weight={500}>
                          {data.following.total}
                        </TextGroupSubheading>
                        <TextGroupSubheading color='base400' weight={500}>
                          Following
                        </TextGroupSubheading>
                      </TextGroup>
                    </HStack>
                  </VStack>

                  <VStack borderTop={1} borderColor='base100'>
                    <ProfileDrawerOption
                      onClick={onClose}
                      to={Paths.bookmarks}
                      label='Bookmarks'
                      icon='bookmark-outline'
                    />
                    <ProfileDrawerOption
                      onClick={onClose}
                      to={Paths.channels}
                      label='Channels'
                      icon='channels-outline'
                    />
                    <ProfileDrawerOption
                      onClick={onClose}
                      to={Paths.releases}
                      label='Releases'
                      icon='releases-outline'
                    />
                    <ProfileDrawerOption
                      onClick={onClose}
                      to='/events'
                      label='Events'
                      icon='calendar-event-outline'
                    />
                  </VStack>

                  <VStack borderTop={1} borderColor='base100'>
                    <ProfileDrawerOption
                      onClick={onClose}
                      to={Paths.settings}
                      label='Privacy & settings'
                      icon='settings-outline'
                    />
                    <ProfileDrawerOption
                      onClick={onClose}
                      to={Paths.support}
                      label='Help & support'
                      icon='question-outline'
                    />
                    <ProfileDrawerOption
                      label='Display'
                      icon='night-mode'
                    />
                  </VStack>
                  <VStack borderTop={1} borderColor='base100'>
                    <ProfileDrawerOption
                      onClick={() => {
                        onClose();
                        logout();
                      }}
                      label='Logout'
                      icon='logout-outline'
                    />
                  </VStack>

                  <VStack h='100%' justify='flex-end'>
                    <Box px={2} py={3} borderTop={2} borderColor='base100'>
                      <Link to={import.meta.env.VITE_CLUBS_APP_URL}>
                        <Button
                          radius={4}
                          size='sm'
                          colorTheme='secondary400'
                          fullWidth
                          className={extraBtnPadding()}
                        >
                          Holdr Club
                        </Button>
                      </Link>
                    </Box>
                  </VStack>
                </VStack>
              </Box>
            </Box>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
    </Fragment>
  );
}

ProfileDrawer.displayName = 'ProfileDrawer';

export default ProfileDrawer;
