import { MenuButton } from '../../buttons';
import { useAlertDialog, useLogout } from 'hooks';

function LogoutDialog() {
  const logout = useLogout();

  const { open } = useAlertDialog({
    actionText: 'Yes, Logout',
    onAction: logout,
    title: 'Log out',
    description:
      'If you log out, you will have to manually log in to your account again. ' +
      'Are you sure you want to log out off your account?',
  });

  return (
    <MenuButton onClick={open} label='Logout' icon='logout-outline' />
  );
}
LogoutDialog.displayName = 'LogoutDialog';

export default LogoutDialog;
