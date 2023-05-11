import {
  Avatar,
  Box,
  ButtonGroup,
  HStack,
  IconButton,
  Image,
} from '@holdr-ui/react';
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
    >
      <Box px={5} py={4} w={375}>
        <Box as='span' onClick={goToHome}>
          <Image size={30} src={logoDark} />
        </Box>
      </Box>

      <Box px={4} h='2rem' w='calc(100% - 750px)' />

      <HStack
        px={5}
        py={4}
        gap={4}
        w={375}
        items='flex-start'
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
        <Box cursor='pointer'>
          <Avatar size='sm' name='Sam Harris' />
        </Box>
      </HStack>
    </HStack>
  );
}
NavigationLg.displayName = 'NavigationLg';

export default NavigationLg;
