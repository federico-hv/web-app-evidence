import {
  Avatar,
  Box,
  Button,
  Circle,
  Drawer,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import { Logo } from '../../../../shared/components';
import menuIcon from '../../../../assets/images/menu.png';
import { useCurrentUser } from '../../../auth';
import { Fragment } from 'react';
import {
  extraBtnPadding,
  GeneralContextProvider,
  LinkOverlay,
  prefix,
  useGeneralContext,
  useRecordState,
  UserNamesGroup,
} from '../../../../shared';
import { IconName } from '@holdr-ui/react/dist/shared/types';

function MenuButton({
  label,
  icon,
  centered,
}: {
  centered?: boolean;
  label: string;
  icon: IconName;
}) {
  return (
    <HStack
      p={4}
      gap={centered ? 4 : 3}
      items='center'
      cursor='pointer'
      justify={centered ? 'center' : 'flex-start'}
      _hover={{ backgroundColor: '$base100' }}
    >
      <Icon size='xl' name={icon} />
      <Text>{label}</Text>
    </HStack>
  );
}

function MenuDrawer() {
  const { update, state } = useGeneralContext();

  return (
    <Fragment>
      <Flex flex={1} css={{ userSelect: 'none' }}>
        <Box
          onClick={() => {
            if (!state.on) {
              update({ name: 'menu', on: true });
            } else if (state.on && state.name === 'menu') {
              update({ on: false });
            } else {
              update({ name: 'menu', on: true });
            }
          }}
        >
          <Image size={24} src={menuIcon} alt='menu icon' />
        </Box>
      </Flex>
      <Drawer
        isOpen={state.on && state.name === 'menu'}
        onClose={() => update({ on: false })}
        placement='left'
      >
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content>
            <Box minWidth={1} position='relative' h='100%'>
              <Box
                position='absolute'
                t={69}
                l={0}
                h='calc(100% - 66px)'
                w='65vw'
                css={{
                  backgroundColor: '#fcfbfa',
                  borderTopRightRadius: '$4',
                }}
              >
                <VStack h='100%'>
                  <VStack
                    pt={4}
                    divider={
                      <Box borderBottom={2} borderColor='base100' />
                    }
                    borderBottom={2}
                    borderTop={2}
                    borderColor='base100'
                  >
                    <MenuButton label='Home' icon='home-outline' />
                    <MenuButton
                      label='Bookmarks'
                      icon='bookmark-outline'
                    />
                    <MenuButton label='Channels' icon='channels-outline' />
                    <MenuButton label='Discover' icon='discover-outline' />
                    <MenuButton label='Releases' icon='releases-outline' />
                  </VStack>
                  <VStack h='100%' justify='flex-end'>
                    <Box px={4} py={5} borderTop={2} borderColor='base100'>
                      <Button
                        colorTheme='secondary400'
                        fullWidth
                        className={extraBtnPadding()}
                      >
                        Marketplace
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

function ProfileDrawer() {
  const currentUser = useCurrentUser();
  const { update, state } = useGeneralContext();

  return (
    <Fragment>
      <Flex flex={1} justify='flex-end' css={{ userSelect: 'none' }}>
        <Box
          onClick={() => {
            if (!state.on) {
              update({ name: 'profile', on: true });
            } else if (state.on && state.name === 'profile') {
              update({ on: false });
            } else {
              update({ name: 'profile', on: true });
            }
          }}
          w={24}
        >
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

      <Drawer
        isOpen={state.on && state.name === 'profile'}
        onClose={() => update({ on: false })}
        placement='right'
      >
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content>
            <Box minWidth={1} position='relative' h='100%'>
              <Box
                position='absolute'
                t={69}
                r={0}
                h='calc(100% - 66px)'
                w='65vw'
                overflow='hidden'
                css={{
                  backgroundColor: '#fcfbfa',
                  borderTopLeftRadius: '$4',
                }}
              >
                <VStack h='100%'>
                  {currentUser && (
                    <HStack
                      gap={3}
                      p={4}
                      position='relative'
                      _hover={{ backgroundColor: '$base100' }}
                    >
                      <LinkOverlay
                        onClick={() => update({ on: false })}
                        to={prefix('/', currentUser.username)}
                      />
                      <Avatar
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

                  <VStack
                    divider={
                      <Box borderBottom={2} borderColor='base100' />
                    }
                    borderBottom={2}
                    borderTop={2}
                    borderColor='base100'
                  >
                    <MenuButton
                      label='Notifications'
                      icon='notification-outline'
                    />
                    <MenuButton
                      label='Privacy & Settings'
                      icon='settings-outline'
                    />
                    <MenuButton
                      label='Help & Support'
                      icon='question-outline'
                    />
                    <MenuButton label='Logout' icon='logout-outline' />
                  </VStack>
                  <VStack h='100%' justify='flex-end'>
                    <Box
                      px={4}
                      py={5}
                      borderTop={2}
                      borderColor='base100'
                    ></Box>
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
  const [active, update] = useRecordState<{
    name?: 'menu' | 'profile';
    on?: false;
  }>({});

  return (
    <HStack
      as='header'
      items='center'
      position='fixed'
      p={4}
      t={0}
      w='100%'
      borderBottom={1}
      borderColor='base100'
      boxShadow='0px 3px 3px rgba(0, 0, 0, 0.1)'
      css={{
        backgroundColor: '#fbfbfa',
        zIndex: 101,
      }}
    >
      <GeneralContextProvider value={{ update, state: active }}>
        <MenuDrawer />
        <Logo />
        <ProfileDrawer />
      </GeneralContextProvider>
    </HStack>
  );
}

SmNavigation.displayName = 'SmNavigation';

export default SmNavigation;
