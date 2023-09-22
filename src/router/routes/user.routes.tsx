import { Route, Routes } from 'react-router';
import { Paths } from '../../shared';
import { FeedPage, ProfilePage } from '../../pages';

const UserRoutes = () => (
  <Routes>
    <Route path={Paths.root} element={<ProfilePage />} />
    <Route path={Paths.feed} element={<FeedPage />} />
  </Routes>
);

UserRoutes.displayName = 'User Routes';

export default UserRoutes;
