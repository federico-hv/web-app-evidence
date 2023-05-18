import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'contexts';
import { prefix } from 'utilities';
import { Paths } from 'shared';
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
import { ProfileMenu } from '../../menus';
import { ActionWrapper } from '../../cards/profile-lg/support';

function AuthenticatedNavActions() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const goToNotifications = () =>
    navigate(prefix('/', Paths.notifications));

  return (
    <>
      {currentUser && (
        <HStack gap={4} items='center' justify='flex-end'>
          <ButtonGroup items='center' gap={4} colorTheme='primary400'>
            <IconButton icon='chat-outline' ariaLabel='open chats' />
            <IconButton
              onClick={goToNotifications}
              icon='notification-outline'
              ariaLabel='open notifications'
            />
          </ButtonGroup>
          <ProfileMenu currentUser={currentUser} />
        </HStack>
      )}
    </>
  );
}

function UnauthenticatedNavActions() {
  return (
    <HStack gap={4} items='center' justify='flex-end'>
      <Popover>
        <Popover.Trigger>
          <Circle bgColor='base300' size={32}>
            <Icon name='user-fill' color='primary400' />
          </Circle>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content sideOffset={10} align='end'>
            <VStack gap={2}>
              <ActionWrapper>
                <Text>Help & Support</Text>
                <Icon name='question-outline' size='lg' />
              </ActionWrapper>
              <a
                href={`${import.meta.env.VITE_AUTH_APP_URL}?redirect_url=${
                  import.meta.env.VITE_APP_BASE_URL
                }${import.meta.env.VITE_APP_BASE_PATH}`}
              >
                <ActionWrapper>
                  <Text>Log In / Register</Text>
                  <Icon name='logout-outline' size='lg' />
                </ActionWrapper>
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
