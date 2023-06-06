import {
  Avatar,
  Box,
  Button,
  Drawer,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import Statistic from '../../data-display/statistic';
import { extraBtnPadding, textEllipsis } from '../../../shared';
import { DrawerButton } from '../../buttons';
import { ProfileFDrawerProps } from './profile.drawer.type';
import { useLogout, useMenuNavigate } from '../../../hooks';

function ProfileDrawer({
  avatar,
  username,
  displayName,
}: ProfileFDrawerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { goto } = useMenuNavigate();
  const logout = useLogout();

  return (
    <>
      <Box onClick={onOpen}>
        <Avatar size='sm' src={avatar} name={displayName} />
      </Box>
      <Drawer isOpen={isOpen} onClose={onClose} placement='left'>
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content>
            <VStack bgColor='primary400' h='full' w='80vw'>
              <VStack
                px={4}
                py={5}
                borderBottom={2}
                borderColor='base100'
                cursor='pointer'
                onClick={goto.profile}
              >
                <HStack gap={4}>
                  <Avatar
                    variant='squircle'
                    src={avatar}
                    name={displayName}
                  />
                  <VStack>
                    <Box
                      className={textEllipsis()}
                      css={{ fontWeight: 600 }}
                    >
                      {displayName}
                    </Box>
                    <Text size={2}>@{username}</Text>
                  </VStack>
                </HStack>
                <HStack position='relative' l={56} gap={4} mt={3}>
                  <Statistic value={0} label='friends' />
                  <Statistic value={0} label='following' />
                </HStack>
              </VStack>

              <VStack>
                <DrawerButton
                  action={goto.home}
                  icon='home-outline'
                  label='Feeds'
                />
                <DrawerButton
                  action={goto.discover}
                  icon='discover-outline'
                  label='Discover'
                />
                <DrawerButton
                  action={goto.channels}
                  icon='channels-outline'
                  label='Channels'
                />
                <DrawerButton
                  action={goto.bookmarks}
                  icon='bookmark-outline'
                  label='Bookmark'
                />
                <DrawerButton
                  action={goto.releases}
                  icon='releases-outline'
                  label='Releases'
                />
                <DrawerButton
                  action={goto.settings}
                  icon='settings-outline'
                  label='Settings & Privacy'
                />
                <DrawerButton
                  action={goto.support}
                  icon='question-outline'
                  label='Help & Support'
                />
                <DrawerButton
                  action={logout}
                  icon='logout-outline'
                  label='Logout'
                />
              </VStack>

              <VStack px={4} minHeight={100} flex={1} justify='center'>
                <Button
                  colorTheme='secondary400'
                  className={extraBtnPadding()}
                  label='Holdr Club'
                  fullWidth
                />
              </VStack>
            </VStack>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
    </>
  );
}
ProfileDrawer.displayName = 'ProfileDrawer';

export default ProfileDrawer;
