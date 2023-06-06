import { useContext } from 'react';
import { AuthContext } from 'contexts';
import {
  ButtonGroup,
  Circle,
  HStack,
  Icon,
  IconButton,
  Popover,
  Text,
  VStack,
} from '@holdr-ui/react';
import { ProfilePopoverLg } from '../../popover';
import { MenuButton } from '../../buttons';
import querystring from 'querystring';
import { useMenuNavigate } from '../../../hooks';

function AuthenticatedNavActions() {
  const { currentUser } = useContext(AuthContext);
  const { goto } = useMenuNavigate();
  return (
    <>
      {currentUser && (
        <HStack gap={4} items='center' justify='flex-end'>
          <ButtonGroup items='center' gap={4} colorTheme='primary400'>
            <IconButton icon='chat-outline' ariaLabel='open chats' />
            <IconButton
              onClick={goto.notifications}
              icon='notification-outline'
              ariaLabel='open notifications'
            />
          </ButtonGroup>
          <ProfilePopoverLg currentUser={currentUser} />
        </HStack>
      )}
    </>
  );
}

function UnauthenticatedNavActions() {
  const queryParams = querystring.encode({
    redirect_url: `${import.meta.env.VITE_APP_BASE_URL}${
      import.meta.env.VITE_APP_BASE_PATH
    }`,
  });

  const { goto } = useMenuNavigate();

  return (
    <HStack gap={4} items='center' justify='flex-end'>
      <Popover>
        <Popover.Trigger>
          <Circle bgColor='base300' size={32}>
            <Icon name='user-fill' color='primary400' />
          </Circle>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content zIndex={50} sideOffset={10} align='end'>
            <VStack gap={2}>
              <MenuButton
                label='Settings & Privacy'
                icon='settings-outline'
                onClick={goto.settings}
              />
              <MenuButton
                label='Help & Support'
                icon='question-outline'
                onClick={goto.support}
              />
              <a
                href={`${
                  import.meta.env.VITE_AUTH_APP_URL
                }?${queryParams}`}
              >
                <MenuButton
                  label='Login / Register'
                  icon='logout-outline'
                />
              </a>
              <HStack
                items='center'
                gap={3}
                px={3}
                borderTop={2}
                borderColor='base100'
                divider={<Text>·</Text>}
              >
                <Text size={2}>Privacy</Text>
                <Text size={2}>Terms</Text>
                <Text size={2}>© Holdr 2023</Text>
              </HStack>
            </VStack>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </HStack>
  );
}

UnauthenticatedNavActions.displayName = 'UnauthenticatedNavActions';
AuthenticatedNavActions.displayName = 'AuthenticatedNavActions';

export { UnauthenticatedNavActions, AuthenticatedNavActions };
