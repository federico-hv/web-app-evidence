import { useNavigate } from 'react-router-dom';
import { prefix } from '../../utilities';
import { UseMenuNavigate } from './type';
import { Paths } from '../../constants';
import { useCurrentUser } from '../../../features';

export const useMenuNavigate: UseMenuNavigate = () => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const goto = {
    home: () => navigate(prefix('/', Paths.root)),
    notifications: () => navigate(prefix('/', Paths.notifications)),
    discover: () => navigate(prefix('/', Paths.discover)),
    settings: () => navigate(prefix('/', Paths.settings)),
    support: () => navigate(prefix('/', Paths.support)),
    releases: () => navigate(prefix('/', Paths.releases)),
    messages: () => navigate(prefix('/', Paths.messages)),
    channels: () => navigate(prefix('/', Paths.channels)),
    bookmarks: () => navigate(prefix('/', Paths.bookmarks)),
    profile: () => navigate(prefix('/', currentUser?.username || '')),
    back: () => navigate(-1),
  };

  return { goto };
};
