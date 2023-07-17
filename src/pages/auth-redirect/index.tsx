import { useEffect } from 'react';
import * as querystring from 'querystring';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCurrentUser } from '../../features';
import { Head } from '../../shared';

function AuthRedirect() {
  const currentUser = useCurrentUser();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const fromPath = searchParams.get('from');

  const queryParams = querystring.encode({
    redirect_url: `${import.meta.env.VITE_APP_BASE_URL}${fromPath}`,
  });

  useEffect(() => {
    if (!currentUser) {
      window.open(
        `${import.meta.env.VITE_AUTH_APP_URL}?${queryParams}`,
        '_self',
      );
    } else {
      // Bug workaround: for some reason the app doesn't
      // register the currentUser immediately, so we need to
      // confirm here that there is no currentUser.
      navigate(fromPath || '/');
    }
  });

  return <Head title='Redirecting' description='Going to login page' />;
}
AuthRedirect.displayName = 'AuthRedirect';

export default AuthRedirect;
