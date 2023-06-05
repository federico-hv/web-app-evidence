import { useContext } from 'react';
import { AuthContext } from 'contexts';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { prefix } from '../../utilities';
import { Paths } from '../../shared';

export const useLogout = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return () => {
    const cookie = new Cookies();
    cookie.remove('access_token');
    cookie.remove('refresh_token');
    setCurrentUser(null);

    navigate(prefix('/', Paths.home));
  };
};
