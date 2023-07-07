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
  MenuButton,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../core';

function ProfileMenu() {
  const [state, set] = useState(false);
  return (
    <Popover isOpen={state} onOpenChange={set}>
      <Popover.Trigger onClick={() => set(true)}>
        <Center>
          <Avatar src='' name='' size='sm' />
        </Center>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content w={325} zIndex={50} sideOffset={20} align='end'>
          <VStack>
            <HStack
              items='center'
              gap={3}
              p={4}
              radius={3}
              boxShadow='0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              cursor='pointer'
              _hover={{
                background: '$base100',
              }}
            >
              <Avatar variant='squircle' src='' name='' />
              <TextGroup gap={1}>
                <TextGroupHeading size={3}>Display name</TextGroupHeading>
                <TextGroupSubheading weight={500} size={2} color='base400'>
                  @username
                </TextGroupSubheading>
              </TextGroup>
            </HStack>
            <VStack pt={3}>
              <MenuButton
                label='Privacy & Settings'
                icon='settings-outline'
              />
              <MenuButton label='Help & Support' icon='question-outline' />
              <MenuButton label='Logout' icon='logout-outline' />
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
