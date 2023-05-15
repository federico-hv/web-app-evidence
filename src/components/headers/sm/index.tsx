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
import { IUserSm, Paths } from 'shared';
import { useNavigate } from 'react-router-dom';
import { ProfileCardSm } from '../../cards';

function HeaderSm() {
  const currentUser: IUserSm = {
    displayName: 'Got Sauce',
    username: 'trent45',
    avatarUrl: '',
  };

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
          <Avatar size='sm' name='Got Sauce' />
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
                minHeight='350px'
                css={{
                  borderTopLeftRadius: '$3',
                  borderTopRightRadius: '$3',
                }}
              >
                <ProfileCardSm
                  onClose={onClose}
                  currentUser={currentUser}
                />
              </Box>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer>
      )}
    </Box>
  );
}
HeaderSm.displayName = 'HeaderSm';

export default HeaderSm;
