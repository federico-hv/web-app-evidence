import { Route, Routes } from 'react-router';
import { Paths } from '../../shared';
import { ProfilePage } from '../../pages';
import {
  GeneralUserBidHistoryContent,
  GeneralUserBioContent,
  GeneralUserWatchlistContent,
} from '../../pages/profile';
import { Navigate } from 'react-router-dom';

const UserRoutes = () => (
  <Routes>
    <Route path={Paths.root} element={<ProfilePage />}>
      <Route path='' element={<Navigate to='bio' />} />
      <Route path='bio' element={<GeneralUserBioContent />} />
      <Route
        path='bid-history'
        element={<GeneralUserBidHistoryContent />}
      />
      <Route path='watchlist' element={<GeneralUserWatchlistContent />} />
    </Route>
    {/*<Route path={Paths.feed} element={<FeedPage />} />*/}
  </Routes>
);

UserRoutes.displayName = 'User Routes';

export default UserRoutes;
