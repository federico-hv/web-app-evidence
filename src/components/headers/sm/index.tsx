import {
  Avatar,
  Box,
  ButtonGroup,
  Drawer,
  HStack,
  IconButton,
  useDisclosure,
} from '@holdr-ui/react';
import { prefix } from 'utilities';
import { Paths } from 'shared';
import { useNavigate } from 'react-router-dom';

function HeaderSm() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const goToNotifications = () =>
    navigate(prefix('/', Paths.notifications));
  return (
    <Box
      css={{
        '@bp3': { display: 'none' },
      }}
    >
      <HStack px={3} py={4} items='center' justify='space-between'>
        <Box role='button' onClick={onOpen}>
          <Avatar size='sm' name='Sam Hack' />
        </Box>
        <ButtonGroup variant='ghost' size='lg'>
          <IconButton icon='chat-outline' ariaLabel='open chats' />
          <IconButton
            onClick={goToNotifications}
            icon='notification-outline'
            ariaLabel='open notifications'
          />
        </ButtonGroup>
      </HStack>
      {isOpen && (
        <Drawer isOpen={isOpen} onClose={onClose}>
          <Drawer.Portal>
            <Drawer.Overlay />
            <Drawer.Content>
              <Box
                bgColor='primary400'
                w='full'
                minHeight='450px'
                css={{
                  borderTopLeftRadius: '$2',
                  borderTopRightRadius: '$2',
                }}
              ></Box>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer>
      )}
    </Box>
  );
}
HeaderSm.displayName = 'HeaderSm';

export default HeaderSm;
