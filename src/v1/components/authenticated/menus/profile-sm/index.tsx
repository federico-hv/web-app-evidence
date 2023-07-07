import {
  Avatar,
  Button,
  Card,
  CloseButton,
  HStack,
  Text,
  VStack,
} from '@holdr-ui/react';
import { extraBtnPadding, Paths } from '../../../../shared';
import { AuthenticatedProfileMenuProps } from '../profile-lg/profile-menu.type';
import { useNavigate } from 'react-router-dom';
import { MenuButton } from '../../../buttons';
import { useLogout } from '../../../../hooks';

function AuthenticatedProfileMenuSm({
  currentUser,
  onClose,
}: AuthenticatedProfileMenuProps) {
  const navigate = useNavigate();
  const logout = useLogout();

  const open = {
    profile: () => {
      onClose && onClose();
      navigate(currentUser ? currentUser.username : '');
    },
    settings: () => {
      onClose && onClose();
      navigate(Paths.settings);
    },
    support: () => {
      onClose && onClose();
      navigate(Paths.support);
    },
  };
  return (
    <Card boxShadow='none' h={350}>
      <Card.Header py={5} px={3} direction='horizontal' items='center'>
        {currentUser && (
          <HStack
            role='link'
            onClick={open.profile}
            flex={1}
            gap={3}
            items='center'
          >
            <Avatar
              src={currentUser.avatar}
              name={currentUser.displayName}
            />
            <VStack gap={1}>
              <Text weight={500}>{currentUser.displayName}</Text>
              <Text color='base400'>@{currentUser.username}</Text>
            </VStack>
          </HStack>
        )}
        <CloseButton onClick={onClose} variant='ghost' />
      </Card.Header>
      <Card.Body borderTop={2} borderColor='base100'>
        <MenuButton
          label='Settings & Privacy'
          icon='settings-outline'
          onClick={open.settings}
        />
        <MenuButton
          label='Help & Support'
          icon='question-outline'
          onClick={open.support}
        />
        <MenuButton
          label='Logout'
          icon='logout-outline'
          onClick={() => {
            logout();
            onClose && onClose();
          }}
        />
      </Card.Body>
      <Card.Footer
        h='calc(100% - 222px)'
        p={3}
        justify='center'
        borderTop={2}
        borderColor='base100'
      >
        <Button
          colorTheme='secondary400'
          className={extraBtnPadding()}
          label='Holdr Club'
          fullWidth
        />
      </Card.Footer>
    </Card>
  );
}
AuthenticatedProfileMenuSm.displayName = 'AuthenticatedProfileMenuSm';

export default AuthenticatedProfileMenuSm;
