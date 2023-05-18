import { AlertDialog, Heading, Icon, Text } from '@holdr-ui/react';
import { ActionWrapper } from '../../cards/profile-lg/support';
import { Cookies } from 'react-cookie';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts';

function LogoutDialog() {
  const { setCurrentUser } = useContext(AuthContext);
  const logout = () => {
    const cookie = new Cookies();
    cookie.remove('access_token');
    cookie.remove('refresh_token');
    setCurrentUser(null);
  };

  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <ActionWrapper>
          <Text>Logout</Text>
          <Icon name='logout-outline' size='lg' />
        </ActionWrapper>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay blur='sm' />
        <AlertDialog.Content>
          <AlertDialog.Title>
            <Heading as='h4' size={3}>
              Log out
            </Heading>
          </AlertDialog.Title>
          <AlertDialog.Description>
            If you log out, you will have to manually log in to your
            account again. Are you sure you want to log out off your
            account?
          </AlertDialog.Description>
          <AlertDialog.Actions>
            <AlertDialog.Cancel variant='ghost'>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action onClick={logout} colorTheme='danger'>
              Yes, Logout
            </AlertDialog.Action>
          </AlertDialog.Actions>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
LogoutDialog.displayName = 'LogoutDialog';

export default LogoutDialog;
