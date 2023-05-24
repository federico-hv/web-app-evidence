import { useContext } from 'react';
import {
  Avatar,
  Box,
  Circle,
  Drawer,
  HStack,
  Icon,
  IconButton,
  Image,
  useDisclosure,
} from '@holdr-ui/react';
import { prefix } from 'utilities';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from 'contexts';
import { Paths } from 'shared';
import { AuthenticatedProfileMenuSm } from '../../authenticated';
import { UnauthenticatedProfileMenuSm } from '../../unauthenticated';

import logoDark from 'assets/images/logo-dark.png';

function HeaderSm() {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const open = {
    notifications: () => navigate(prefix('/', Paths.notifications)),
  };

  return (
    <>
      <HStack
        as='header'
        px={3}
        py={2}
        items='center'
        justify='evenly'
        borderBottom={2}
        borderColor='base100'
        css={{
          '@bp3': { display: 'none' },
        }}
      >
        <Box flex={1} role='button' onClick={onOpen}>
          {currentUser ? (
            <Avatar
              size='sm'
              src={currentUser.avatar}
              name={currentUser.displayName}
            />
          ) : (
            <Circle bgColor='base300' size={30}>
              <Icon color='primary400' name='user-fill' />
            </Circle>
          )}
        </Box>

        <Box flex={1}>
          <Link to={prefix('/', Paths.home)}>
            <Image size={22.5} src={logoDark} alt='logo' />
          </Link>
        </Box>

        <>
          {currentUser ? (
            <IconButton
              onClick={open.notifications}
              icon='notification-outline'
              ariaLabel='open notifications'
              variant='ghost'
              size='lg'
            />
          ) : (
            <Box w={10} />
          )}
        </>
      </HStack>
      {isOpen && (
        <Drawer placement='left' isOpen={isOpen} onClose={onClose}>
          <Drawer.Portal>
            <Drawer.Overlay />
            <Drawer.Content>
              <Box
                h='100vh'
                borderRight={2}
                borderColor='base100'
                w='75vw'
                bgColor='primary400'
              >
                {currentUser ? (
                  <AuthenticatedProfileMenuSm
                    onClose={onClose}
                    currentUser={currentUser}
                  />
                ) : (
                  <UnauthenticatedProfileMenuSm onClose={onClose} />
                )}
              </Box>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer>
      )}
    </>
  );
}
HeaderSm.displayName = 'HeaderSm';

export default HeaderSm;
