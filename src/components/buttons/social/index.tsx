import {
  Skeleton,
  HStack,
  Button,
  Box,
  Popover,
  Drawer,
  VStack,
  useDisclosure,
  Text,
} from '@holdr-ui/react';
import {
  Error,
  Loader,
  Responsive,
  ResponsiveItem,
  SwitchConditional,
  SwitchConditionalCase,
} from '../../utility';
import { EditProfileDialog } from '../../dialog';
import { useQuery } from '@apollo/client';
import { GET_RELATIONSHIP_STATUS_INFO, RelationshipStatusInfo } from 'lib';
import {
  FollowButton,
  FollowingButton,
  ProfileOptionsButton,
} from '../index';
import { extraBtnPadding, MotionWrapper } from '../../../shared';
import {
  RelationshipStatusContextProvider,
  useProfileContext,
} from '../../../contexts';
import { useUsername } from '../../../hooks';
import ProfileNotificationsButton from '../profile-notification';
import MenuButton from '../menu';
import { useRemoveRelationshipAction } from '../following';

function RequestedButton() {
  const { profile } = useProfileContext();
  const {
    isOpen: drawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();
  const { removeFollowRequest } = useRemoveRelationshipAction(
    profile.username,
  );

  const Menu = () => (
    <>
      <MenuButton
        onClick={removeFollowRequest}
        dangerous
        label='Cancel Request'
        icon='remove-outline'
      />
    </>
  );

  return (
    <Responsive>
      <ResponsiveItem tablet='show'>
        <Popover>
          <Popover.Trigger>
            <Button colorTheme='base100' rightIcon='caret-down-outline'>
              Requested
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
      </ResponsiveItem>
      <ResponsiveItem mobile='show' tablet='show'>
        <Button
          onClick={openDrawer}
          colorTheme='base100'
          rightIcon='caret-down-outline'
        >
          Requested
        </Button>
        <Drawer isOpen={drawerOpen} onClose={closeDrawer}>
          <Drawer.Portal>
            <Drawer.Overlay />
            <Drawer.Content>
              <VStack
                radius={3}
                bgColor='primary400'
                w='full'
                h='200px'
                divider={<Box borderBottom={1} borderColor='base100' />}
              >
                <HStack justify='center' p={4}>
                  <Text weight={500}>{profile.displayName}</Text>
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
      </ResponsiveItem>
    </Responsive>
  );
}

function SocialButton() {
  const username = useUsername();

  const { data, loading, error } = useQuery<{
    relationshipStatusInfo: RelationshipStatusInfo;
  }>(GET_RELATIONSHIP_STATUS_INFO, {
    variables: {
      username: username,
    },
  });

  return (
    <Error hasError={!!error} errorMessage={error?.message}>
      <Loader loading={loading} as={<Skeleton />}>
        {data && data.relationshipStatusInfo && (
          <RelationshipStatusContextProvider
            value={{ ...data.relationshipStatusInfo }}
          >
            <SwitchConditional>
              <SwitchConditionalCase
                on={!data.relationshipStatusInfo.isOwned}
              >
                <HStack gap={3}>
                  <ProfileOptionsButton />
                  <SwitchConditional>
                    <SwitchConditionalCase
                      on={
                        !data.relationshipStatusInfo.isFollowing &&
                        !data.relationshipStatusInfo.isOwned &&
                        !data.relationshipStatusInfo.hasFollowRequest
                      }
                    >
                      <FollowButton />
                    </SwitchConditionalCase>
                    <SwitchConditionalCase
                      on={!!data.relationshipStatusInfo.hasFollowRequest}
                    >
                      <RequestedButton />
                    </SwitchConditionalCase>
                    <SwitchConditionalCase
                      on={!!data.relationshipStatusInfo.isFollowing}
                    >
                      <MotionWrapper gap={3}>
                        <ProfileNotificationsButton />
                        <FollowingButton />
                      </MotionWrapper>
                    </SwitchConditionalCase>
                  </SwitchConditional>
                </HStack>
              </SwitchConditionalCase>
              <SwitchConditionalCase
                on={data.relationshipStatusInfo.isOwned === true}
              >
                <EditProfileDialog />
              </SwitchConditionalCase>
            </SwitchConditional>
          </RelationshipStatusContextProvider>
        )}
      </Loader>
    </Error>
  );
}
SocialButton.displayName = 'SocialButton';

export default SocialButton;
