import { useNavigate } from 'react-router-dom';
import { prefix } from '../../utilities';
import { Paths } from '../../shared';
import { UseMenuNavigate } from './use-menu-navigate.type';
import { useAuthContext } from '../use-auth-context';

export const useMenuNavigate: UseMenuNavigate = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  const goto = {
    home: () => navigate(prefix('/', Paths.home)),
    notifications: () => navigate(prefix('/', Paths.notifications)),
    discover: () => navigate(prefix('/', Paths.discover)),
    settings: () => navigate(prefix('/', Paths.settings)),
    support: () => navigate(prefix('/', Paths.support)),
    releases: () => navigate(prefix('/', Paths.releases)),
    channels: () => navigate(prefix('/', Paths.channels)),
    bookmarks: () => navigate(prefix('/', Paths.bookmarks)),
    profile: () => navigate(prefix('/', currentUser?.username || '')),
  };

  return { goto };
};
