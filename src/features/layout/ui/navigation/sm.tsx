import {
  Avatar,
  Box,
  Button,
  Circle,
  Drawer,
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import { Logo, TextGroupSubheading } from '../../../../shared/components';
import { useCurrentUser } from '../../../auth';
import { Fragment } from 'react';
import {
  extraBtnPadding,
  GQLRenderer,
  LinkOverlay,
  prefix,
  TextGroup,
  useLogout,
  useMenuNavigate,
  UserNamesGroup,
  useScrollDirection,
} from '../../../../shared';
import { IconName } from '@holdr-ui/react/dist/shared/types';
import { useSuspenseQuery } from '@apollo/client';
import { GET_RELATIONSHIP_COUNT } from '../../../relationships';

function MenuButton({
  label,
  icon,
  onClick,
}: {
  onClick?: VoidFunction;
  label: string;
  icon: IconName;
}) {
  return (
    <HStack
      onClick={() => {
        onClick && onClick();
      }}
      p={4}
      gap={3}
      items='center'
      cursor='pointer'
      _hover={{ backgroundColor: '$base100' }}
    >
      <Icon name={icon} />
      <Text size={2}>{label}</Text>
    </HStack>
  );
}

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
  const { goto } = useMenuNavigate();

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
                          {data.followers.total}
                        </TextGroupSubheading>
                        <TextGroupSubheading color='base400' weight={500}>
                          Following
                        </TextGroupSubheading>
                      </TextGroup>
                    </HStack>
                  </VStack>

                  <VStack borderTop={1} borderColor='base100'>
                    <MenuButton
                      onClick={goto.bookmarks}
                      label='Bookmarks'
                      icon='bookmark-outline'
                    />
                    <MenuButton
                      onClick={goto.channels}
                      label='Channels'
                      icon='channels-outline'
                    />
                    <MenuButton
                      onClick={goto.releases}
                      label='Releases'
                      icon='releases-outline'
                    />
                    <MenuButton
                      label='Events'
                      icon='calendar-event-outline'
                    />
                  </VStack>

                  <VStack borderTop={1} borderColor='base100'>
                    <MenuButton
                      onClick={goto.settings}
                      label='Privacy & settings'
                      icon='settings-outline'
                    />
                    <MenuButton
                      onClick={goto.support}
                      label='Help & support'
                      icon='question-outline'
                    />
                    <MenuButton label='Display' icon='night-mode' />
                  </VStack>
                  <VStack borderTop={1} borderColor='base100'>
                    <MenuButton
                      onClick={logout}
                      label='Logout'
                      icon='logout-outline'
                    />
                  </VStack>

                  <VStack h='100%' justify='flex-end'>
                    <Box px={2} py={3} borderTop={2} borderColor='base100'>
                      <Button
                        radius={4}
                        size='sm'
                        colorTheme='secondary400'
                        fullWidth
                        className={extraBtnPadding()}
                      >
                        Holdr Club
                      </Button>
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

function SmNavigation() {
  const { direction, delta } = useScrollDirection('#root');

  return (
    <Box
      display={direction === 'down' && delta > 0 ? 'none' : 'block'}
      position='fixed'
      t={0}
      w='100%'
      bgColor='clearTint500'
      css={{
        blur: '12px',
        zIndex: 50,
      }}
    >
      <HStack
        px={4}
        pt={4}
        pb={2}
        as='header'
        justify='space-between'
        items='center'
        w='100%'
      >
        <Logo />

        <GQLRenderer
          ErrorFallback={() => <Fragment />}
          LoadingFallback={<Fragment />}
        >
          <ProfileDrawer />
        </GQLRenderer>
      </HStack>
    </Box>
  );
}

SmNavigation.displayName = 'SmNavigation';

export default SmNavigation;
