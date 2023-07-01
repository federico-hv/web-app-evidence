import {
  Box,
  Dialog,
  Text,
  IconButton,
  Skeleton,
  Center,
  VStack,
  HStack,
  Switch,
  Icon,
  Drawer,
  useDisclosure,
  Button,
} from '@holdr-ui/react';
import {
  Error,
  Loader,
  SwitchConditional,
  SwitchConditionalCase,
} from '../../utility';
import { EditProfileDialog } from '../../dialog';
import { useQuery } from '@apollo/client';
import { GET_RELATIONSHIP_STATUS_INFO, RelationshipStatusInfo } from 'lib';
import { useLocation } from 'react-router-dom';
import {
  FollowButton,
  FollowingButton,
  ProfileOptionsButton,
} from '../index';
import { extraBtnPadding, MotionWrapper } from '../../../shared';
import { RelationshipStatusContextProvider } from '../../../contexts';

function NotificationSettings() {
  return (
    <VStack
      flex={1}
      divider={<Box borderBottom={1} borderColor='base100' />}
    >
      <HStack p={4} justify='space-between'>
        <Text>Posts</Text>
        <Switch />
      </HStack>
      <HStack p={4} justify='space-between'>
        <Text>Releases</Text>
        <Switch />
      </HStack>
      <HStack p={4} justify='space-between'>
        <Text>Events</Text>
        <Switch />
      </HStack>
      <VStack p={4} justify='center' color='base400'>
        <HStack gap={4}>
          <Icon name='information-outline' />
          <Text size={2}>
            Get notifications whenever user shares new feeds, events and
            music releases
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}

function ProfileNotificationsButton() {
  const {
    isOpen: drawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();
  return (
    <>
      <Box display={{ '@bp1': 'none', '@bp3': 'block' }}>
        <Dialog>
          <Dialog.Trigger>
            <IconButton
              colorTheme='primary400'
              icon='notification-outline'
              ariaLabel='open profile options'
            />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content w={400} h={300}>
              <Dialog.Body css={{ padding: 0 }}>
                <Center p={5} borderBottom={1} borderColor='base100'>
                  <Text size={4} weight={500}>
                    Notifications
                  </Text>
                </Center>
                <NotificationSettings />
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      </Box>
      <Box display={{ '@bp1': 'block', '@bp3': 'none' }}>
        <IconButton
          onClick={openDrawer}
          colorTheme='primary400'
          icon='notification-outline'
          ariaLabel='open profile options'
        />
        <Drawer isOpen={drawerOpen} onClose={closeDrawer}>
          <Drawer.Portal>
            <Drawer.Overlay />
            <Drawer.Content>
              <VStack
                radius={3}
                bgColor='primary400'
                w='full'
                h='380px'
                divider={<Box borderBottom={1} borderColor='base100' />}
              >
                <Center p={4} borderBottom={1} borderColor='base100'>
                  <Text weight={500}>Notifications</Text>
                </Center>
                <NotificationSettings />
                <VStack flex={1} px={4} justify='center'>
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

function SocialButton() {
  const username = useLocation().pathname.split('/')[1];

  const { data, loading, error } = useQuery<{
    relationshipStatusInfo: RelationshipStatusInfo;
  }>(GET_RELATIONSHIP_STATUS_INFO, {
    variables: {
      username: username,
    },
  });

  return (
    <Error hasError={!!error} errorEl={<></>}>
      <Loader loading={loading} as={<Skeleton />}>
        {data && data.relationshipStatusInfo && (
          <RelationshipStatusContextProvider
            value={{ ...data.relationshipStatusInfo }}
          >
            <HStack gap={3}>
              <ProfileOptionsButton />
              <SwitchConditional>
                <SwitchConditionalCase
                  on={!data.relationshipStatusInfo.isFollowing}
                >
                  <FollowButton />
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
              {data.relationshipStatusInfo.isOwned === true && (
                <EditProfileDialog />
              )}
            </HStack>
          </RelationshipStatusContextProvider>
        )}
      </Loader>
    </Error>
  );
}
SocialButton.displayName = 'SocialButton';

export default SocialButton;
