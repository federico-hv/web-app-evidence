import { Cookies } from 'react-cookie';
import { useAlertDialog } from '../use-alert-dialog';

export const useLogout = () => {
  const { openWith } = useAlertDialog();
  // const navigate = useNavigate();

  const logout = () => {
    const cookie = new Cookies();

    cookie.remove('access_token', {
      path: '/',
      domain: import.meta.env.VITE_DOMAIN_URL,
    });
    cookie.remove('refresh_token', {
      path: '/',
      domain: import.meta.env.VITE_DOMAIN_URL,
    });

    window.location.reload();
  };

  return () =>
    openWith({
      actionText: 'Yes, Logout',
      onAction: logout,
      title: 'Log out',
      description:
        'If you log out, you will have to manually log in to your account again. ' +
        'Are you sure you want to log out of your account?',
    });
};
