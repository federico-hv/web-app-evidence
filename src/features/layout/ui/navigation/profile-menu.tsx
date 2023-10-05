import { useState } from 'react';
import {
  Avatar,
  Box,
  Center,
  HStack,
  Popover,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  MenuItem,
  prefix,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useLogout,
  useMenuNavigate,
} from '../../../../shared';
import { useCurrentUser } from '../../../auth';
import { Link } from 'react-router-dom';

function ProfileMenu() {
  const currentUser = useCurrentUser();
  const { goto } = useMenuNavigate();
  const [state, set] = useState(false);
  const logout = useLogout();

  const close = () => set(false);

  const navigateTo = {
    settings: () => {
      goto.settings();
      close();
    },
    support: () => {
      goto.support();
      close();
    },
  };
  return (
    <Popover isOpen={state} onOpenChange={set}>
      <Popover.Trigger onClick={() => set(true)}>
        <Center>
          <Avatar
            src={currentUser?.avatar}
            name={currentUser?.displayName}
            size='sm'
          />
        </Center>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          w={325}
          zIndex={50}
          sideOffset={20}
          align='end'
          css={{ backgroundColor: '#FFF' }}
        >
          <VStack>
            <Link
              onClick={close}
              to={prefix('/', currentUser?.username || '')}
            >
              <HStack
                items='center'
                gap={3}
                p={4}
                border={1}
                borderColor='base100'
                radius={3}
                cursor='pointer'
                _hover={{
                  background: '$base100',
                }}
              >
                <Avatar
                  variant='squircle'
                  src={currentUser?.avatar}
                  name={currentUser?.displayName}
                />
                <TextGroup gap={1}>
                  <TextGroupHeading size={3}>
                    {currentUser?.displayName}
                  </TextGroupHeading>
                  <TextGroupSubheading
                    weight={500}
                    size={2}
                    color='base400'
                  >
                    @ {currentUser?.username}
                  </TextGroupSubheading>
                </TextGroup>
              </HStack>
            </Link>
            <VStack pt={3}>
              <MenuItem
                action={navigateTo.settings}
                label='Privacy & Settings'
                icon='settings-outline'
              />
              <MenuItem label='Help & Support' icon='question-outline' />
              <MenuItem
                action={logout}
                label='Logout'
                icon='logout-outline'
              />
            </VStack>
          </VStack>
          <HStack
            borderTop={1}
            items='center'
            borderColor='base100'
            gap={3}
            pt={4}
            pb={3}
            px={4}
            divider={<Box color='base300'>·</Box>}
          >
            <Text size={2}>Privacy</Text>
            <Text size={2}>Terms</Text>
            <Text size={2}>© Holdr 2023</Text>
          </HStack>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
ProfileMenu.displayName = 'ProfileMenu';

export default ProfileMenu;
