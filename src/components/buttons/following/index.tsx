import { IconName } from '@holdr-ui/react/dist/shared/types';
import {
  Box,
  Button,
  Drawer,
  HStack,
  Icon,
  Popover,
  Text,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import { useAlertDialog, useToast, useUsername } from '../../../hooks';
import { useContext, useEffect } from 'react';
import {
  useCreateRelationship,
  useRemoveRelationship,
  useRequestRelationship,
} from '../../../lib';
import { extraBtnPadding } from '../../../shared';
import {
  RelationshipStatusContext,
  useProfileContext,
} from '../../../contexts';
import MenuButton from '../menu';
import {
  Responsive,
  ResponsiveItem,
  SwitchConditional,
  SwitchConditionalCase,
} from '../../utility';

/**
 * Create a new relationship
 *
 * @param username
 */
export function useCreateRelationshipAction(username: string) {
  const { createRelationship, error, loading } = useCreateRelationship();
  const { open, set } = useToast({
    status: 'danger',
    description:
      'Oops! Something went wrong. Totally our fault, but try again later. ',
  });

  useEffect(() => {
    if (error && set) {
      set({ description: error.message, status: 'danger' });
      open();
    }
  }, [error, set, open]);

  const follow = () => createRelationship({ username, action: 'follow' });
  const mute = () => createRelationship({ username, action: 'mute' });
  const favourite = () =>
    createRelationship({ username, action: 'favourite' });

  return { mute, favourite, follow, loading };
}

/**
 * Remove a relationship
 * @param username
 */
export function useRemoveRelationshipAction(username: string) {
  const { removeRelationship, loading, error } = useRemoveRelationship();
  const { open, set } = useToast({
    status: 'danger',
    description:
      'Oops! Something went wrong. Totally our fault, but try again later. ',
  });

  useEffect(() => {
    if (error && set) {
      set({ description: error.message, status: 'danger' });
      open();
    }
  }, [error, set, open]);

  const unfollow = () =>
    removeRelationship({ username, action: 'follow' });
  const unmute = () => removeRelationship({ username, action: 'mute' });
  const removeFavourite = () =>
    removeRelationship({ username, action: 'favourite' });
  const removeFriendRequest = () =>
    removeRelationship({ username, action: 'friend request' });
  const removeFollowRequest = () =>
    removeRelationship({ username, action: 'follow request' });
  const removeFriend = () =>
    removeRelationship({ username, action: 'friend' });

  return {
    unfollow,
    unmute,
    removeFavourite,
    removeFriendRequest,
    removeFollowRequest,
    removeFriend,
    loading,
  };
}

/**
 * Create a relationship request
 *
 * @param username
 */
export function useRequestRelationshipAction(username: string) {
  const { requestRelationship, loading, error } = useRequestRelationship();
  const { open, set } = useToast({
    status: 'danger',
    description:
      'Oops! Something went wrong. Totally our fault, but try again later. ',
  });

  useEffect(() => {
    if (error && set) {
      set({ description: error.message, status: 'danger' });
      open();
    }
  }, [error, set, open]);

  const friendRequest = () =>
    requestRelationship({ username, action: 'friend request' });
  const followRequest = () =>
    requestRelationship({ username, action: 'follow request' });

  return { friendRequest, followRequest, loading };
}

function FollowingMenu() {
  const username = useUsername();
  const { isFriend, hasFriendRequest } = useContext(
    RelationshipStatusContext,
  );

  const { unfollow, unmute, removeFavourite } =
    useRemoveRelationshipAction(username);

  const { mute, favourite } = useCreateRelationshipAction(username);

  const { friendRequest } = useRequestRelationshipAction(username);

  const { removeFriendRequest, removeFriend } =
    useRemoveRelationshipAction(username);

  const { open } = useAlertDialog({
    actionText: 'Unfollow',
    onAction: unfollow,
    title: `Unfollow @${username}`,
    description:
      'Their posts will no longer show up in your home feed. You can still view their profile, unless their profile is protected.',
  });

  const { isMuted, isFavourite } = useContext(RelationshipStatusContext);

  return (
    <VStack divider={<Box borderBottom={1} borderColor='base100' />}>
      <SwitchConditional>
        <SwitchConditionalCase on={!hasFriendRequest && !isFriend}>
          <MenuButton
            label='Add to friends'
            icon='subscriptions-outline'
            onClick={friendRequest}
          />
        </SwitchConditionalCase>
        <SwitchConditionalCase on={!!hasFriendRequest}>
          <MenuButton
            label='Cancel Friend Request'
            icon='subscriptions-outline'
            onClick={removeFriendRequest}
          />
        </SwitchConditionalCase>
        <SwitchConditionalCase on={!!isFriend}>
          <MenuButton
            label='Remove friend'
            icon='subscriptions-fill'
            onClick={removeFriend}
          />
        </SwitchConditionalCase>
      </SwitchConditional>

      <MenuButton
        label={
          isFavourite ? 'Remove from favourites' : 'Add to favourites'
        }
        icon={isFavourite ? 'heart-fill' : 'heart-outline'}
        onClick={isFavourite ? removeFavourite : favourite}
      />
      <MenuButton
        label={isMuted ? 'Unmute' : 'Mute'}
        icon={isMuted ? 'mute-fill' : 'mute-outline'}
        onClick={isMuted ? unmute : mute}
      />
      <MenuButton dangerous label='Restrict' icon='close' />

      {!isFriend && (
        <MenuButton
          dangerous
          onClick={open}
          label='Unfollow'
          icon='user-unfollow-outline'
        />
      )}
    </VStack>
  );
}

function FollowingButton() {
  const { profile } = useProfileContext();
  // const {data, loading, error} = useQuery(GET_RELATIONSHIP_INFO)
  const {
    isOpen: drawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  // Use fixed menu
  return (
    <Responsive>
      <ResponsiveItem tablet='show'>
        <Popover>
          <Popover.Trigger>
            <Button rightIcon='caret-down-outline' colorTheme='primary400'>
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
              <FollowingMenu />
            </Popover.Content>
          </Popover.Portal>
        </Popover>
      </ResponsiveItem>
      <ResponsiveItem mobile='show' tablet='show'>
        <Button
          onClick={openDrawer}
          rightIcon='caret-down-outline'
          colorTheme='primary400'
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
                  <Text weight={500}>{profile.displayName}</Text>
                </HStack>
                <FollowingMenu />
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
      </ResponsiveItem>
    </Responsive>
  );
}

export default FollowingButton;
