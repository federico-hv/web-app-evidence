import { useContext } from 'react';
import {
  Avatar,
  Box,
  Drawer,
  HStack,
  IconButton,
  Image,
  useDisclosure,
} from '@holdr-ui/react';
import { prefix } from 'utilities';
import { Paths } from 'shared';
import { Link, useNavigate } from 'react-router-dom';
import { ProfileCardSm } from '../../cards';
import { AuthContext } from '../../../contexts';

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
        p={3}
        items='center'
        justify='space-between'
        css={{
          '@bp3': { display: 'none' },
        }}
      >
        <Box role='button' onClick={onOpen}>
          <Avatar size='sm' name='Got Sauce' />
        </Box>
        <Link to={prefix('/', Paths.home)}>
          <Image size={22.5} src={logoDark} alt='logo' />
        </Link>

        <IconButton
          onClick={open.notifications}
          icon='notification-outline'
          ariaLabel='open notifications'
          variant='ghost'
          size='lg'
        />
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
                {currentUser && (
                  <ProfileCardSm
                    onClose={onClose}
                    currentUser={currentUser}
                  />
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
