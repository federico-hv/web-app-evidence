import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';
import {
  ArtistProfileDashboardPage,
  ArtistProfileMembersPage,
  ArtistProfileTabs,
  ArtistProfileWatchlistPage,
} from '../../pages';

const ArtistProfileRoutes = () => (
  <Routes>
    <Route element={<ArtistProfileTabs />}>
      <Route path='' element={<Navigate to='dashboard' replace />} />
      <Route path='dashboard' element={<ArtistProfileDashboardPage />} />
      <Route path='members' element={<ArtistProfileMembersPage />} />
      <Route path='watchlist' element={<ArtistProfileWatchlistPage />} />
    </Route>
  </Routes>
);

export default ArtistProfileRoutes;
