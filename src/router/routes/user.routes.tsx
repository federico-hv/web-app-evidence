import { Route, Routes } from 'react-router';
import { Paths } from '../../shared';
import {
  UserProfileBidHistoryPage,
  UserProfileBioPage,
  UserProfileTabs,
} from '../../pages';
import { Navigate } from 'react-router-dom';

const UserRoutes = () => (
  <Routes>
    <Route path={Paths.root} element={<UserProfileTabs />}>
      <Route path='' element={<Navigate to='bio' replace />} />
      <Route path='bio' element={<UserProfileBioPage />} />
      <Route path='bid-history' element={<UserProfileBidHistoryPage />} />
    </Route>
  </Routes>
);

UserRoutes.displayName = 'User Routes';

export default UserRoutes;
