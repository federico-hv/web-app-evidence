import { AlertDialog, Heading } from '@holdr-ui/react';

import { MenuButton } from '../../buttons';
import { useLogout } from 'hooks';

function LogoutDialog() {
  const logout = useLogout();
  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <MenuButton label='Logout' icon='logout-outline' />
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
