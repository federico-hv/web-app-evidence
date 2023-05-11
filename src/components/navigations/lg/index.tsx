import {
  Avatar,
  Box,
  ButtonGroup,
  Center,
  HStack,
  IconButton,
  Image,
} from '@holdr-ui/react';
import { GlobalSearch } from '../../overlays/';
import { useNavigate } from 'react-router-dom';
import { prefix } from 'utilities';
import { Paths } from 'shared';

import logoDark from 'assets/images/logo-dark.png';

function NavigationLg() {
  const navigate = useNavigate();
  const goToHome = () => navigate('/');
  const goToNotifications = () =>
    navigate(prefix('/', Paths.notifications));

  return (
    <HStack
      as='header'
      items='center'
      borderBottom={1}
      borderColor='base100'
      boxShadow='0px 3px 3px rgba(0, 0, 0, 0.1)'
      css={{
        '@bp1': { display: 'none' },
        '@bp3': { display: 'flex' },
      }}
    >
      <Box px={5} py={4} w={{ '@bp1': 75, '@bp7': 375 }}>
        <Box as='span' onClick={goToHome}>
          <Image size={{ '@bp1': 2, '@bp4': 30 }} src={logoDark} />
        </Box>
      </Box>

      <Box
        h='2rem'
        w={{
          '@bp1': 'calc(100% - 235px)',
          '@bp5': 'calc(100% - 450px)',
          '@bp7': 'calc(100% - 750px)',
        }}
        css={{
          '&  label': {
            // width: 'auto',
            boxSizing: 'border-box',
          },
        }}
      >
        <GlobalSearch />
      </Box>

      <HStack
        py={4}
        pr={5}
        gap={4}
        w={{ '@bp1': 160, '@bp5': 375 }}
        items='center'
        justify='flex-end'
      >
        <ButtonGroup items='center' gap={4} colorTheme='primary400'>
          <IconButton icon='chat-outline' ariaLabel='open chats' />
          <IconButton
            onClick={goToNotifications}
            icon='notification-outline'
            ariaLabel='open notifications'
          />
        </ButtonGroup>
        <Center>
          <Avatar size='sm' name='Sam Hack' />
        </Center>
      </HStack>
    </HStack>
  );
}
NavigationLg.displayName = 'NavigationLg';

export default NavigationLg;
