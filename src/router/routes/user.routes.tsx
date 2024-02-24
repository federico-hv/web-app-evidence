import { Route, Routes } from 'react-router';
import { Paths } from '../../shared';
import { ProfilePage } from '../../pages';

const UserRoutes = () => (
  <Routes>
    <Route path={Paths.root} element={<ProfilePage />} />
    {/*<Route path={Paths.feed} element={<FeedPage />} />*/}
  </Routes>
);

UserRoutes.displayName = 'User Routes';

export default UserRoutes;
