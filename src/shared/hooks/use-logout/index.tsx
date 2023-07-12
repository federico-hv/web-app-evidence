import { useContext } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../features/auth';
import { prefix } from '../../utilities';
import { Paths } from '../../constants';

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
