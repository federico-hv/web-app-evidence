import { IconName } from '@holdr-ui/react/dist/shared/types';
import {
  Box,
  Button,
  Drawer,
  HStack,
  Icon,
  IconButton,
  Popover,
  Text,
  useDisclosure,
  useSwitch,
  VStack,
} from '@holdr-ui/react';
import { SwitchConditional, SwitchConditionalCase } from '../../utility';
import { useAlertDialog, useUsername } from '../../../hooks';
import { useEffect } from 'react';
import { useRemoveRelationship } from '../../../lib';
import { extraBtnPadding } from '../../../shared';

function MenuItem({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: IconName;
  onClick?: VoidFunction;
}) {
  return (
    <HStack
      justify='space-between'
      items='center'
      radius={2}
      cursor='pointer'
      p={4}
      _hover={{ backgroundColor: '$base100' }}
      onClick={onClick}
    >
      <Text weight={500}>{label}</Text>
      <Icon name={icon} />
    </HStack>
  );
}

function FollowingButton() {
  const { switchState, turnOn, turnOff } = useSwitch();

  return (
    <HStack gap={4}>
      <Box onMouseEnter={turnOn} onMouseLeave={turnOff}>
        <SwitchConditional>
          <SwitchConditionalCase on={switchState}>
            <Button colorTheme='danger'>Unfollow</Button>
          </SwitchConditionalCase>
          <SwitchConditionalCase on={!switchState}>
            <Button colorTheme='base500'>Following</Button>
          </SwitchConditionalCase>
        </SwitchConditional>
      </Box>
      <Popover>
        <Popover.Trigger>
          <IconButton
            colorTheme='primary400'
            variant='ghost'
            size={{ '@bp1': 'base', '@bp4': 'base' }}
            ariaLabel='more'
            icon='more-fill'
          />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            minWidth={275}
            side='bottom'
            align='end'
            sideOffset={5}
          >
            <VStack
              px={4}
              divider={<Box borderBottom={1} borderColor='base100' />}
            >
              <MenuItem
                label='Add to friends'
                icon='subscriptions-outline'
              />
              <MenuItem label='Mute' icon='mute-outline' />
              <MenuItem label='Block' icon='close' />
              <MenuItem label='Report' icon='report-outline' />
              <MenuItem label='Unfollow' icon='user-unfollow-outline' />
            </VStack>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </HStack>
  );
}

function FollowingButton2() {
  const username = useUsername();
  // const {data, loading, error} = useQuery(GET_RELATIONSHIP_INFO)
  const {
    isOpen: drawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();
  const { open, isOpen, set } = useAlertDialog();
  const { removeRelationship } = useRemoveRelationship();

  const unfollow = () =>
    removeRelationship({ username, action: 'follow' });

  useEffect(() => {
    if (isOpen && set)
      set({
        actionText: 'Unfollow',
        onAction: unfollow,
        title: `Unfollow @${username}`,
        description:
          'Their posts will no longer show up in your home feed. You can still view their profile, unless their profile is protected.',
      });
  }, [isOpen, username, set]);

  const Menu = () => (
    <VStack divider={<Box borderBottom={1} borderColor='base100' />}>
      <MenuItem label='Add to friends' icon='subscriptions-outline' />
      <MenuItem label='Mute' icon='mute-outline' />
      <MenuItem label='Block' icon='close' />
      <MenuItem label='Report' icon='report-outline' />
      <MenuItem
        onClick={open}
        label='Unfollow'
        icon='user-unfollow-outline'
      />
    </VStack>
  );

  // Use fixed menu
  return (
    <>
      {/* The following should actually be a component in itself. possibly called ResponsiveMenu*/}
      {/* SC: Trigger, Header, Body, */}
      <Box display={{ '@bp1': 'none', '@bp3': 'block' }}>
        <Popover>
          <Popover.Trigger>
            <Button rightIcon='caret-down-outline' colorTheme='base500'>
              Following
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              minWidth={275}
              side='bottom'
              align='end'
              sideOffset={5}
            >
              <Menu />
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </Box>
      <Box display={{ '@bp1': 'block', '@bp3': 'none' }}>
        <Button
          onClick={openDrawer}
          rightIcon='caret-down-outline'
          colorTheme='base500'
        >
          Following
        </Button>
        <Drawer isOpen={drawerOpen} onClose={closeDrawer}>
          <Drawer.Portal>
            <Drawer.Overlay />
            <Drawer.Content>
              <VStack
                radius={3}
                bgColor='primary400'
                w='full'
                h='390px'
                divider={<Box borderBottom={1} borderColor='base100' />}
              >
                <HStack justify='center' p={4}>
                  <Text weight={500}>@{username}</Text>
                </HStack>
                <Menu />
                <VStack px={4} flex={1} justify='center'>
                  <Button
                    className={extraBtnPadding()}
                    fullWidth
                    onClick={closeDrawer}
                  >
                    Close
                  </Button>
                </VStack>
              </VStack>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer>
      </Box>
    </>
  );
}

export { FollowingButton, FollowingButton2 };
