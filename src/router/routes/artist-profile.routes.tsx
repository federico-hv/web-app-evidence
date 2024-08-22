import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';
import {
  ArtistProfileStatsPage,
  ArtistProfileMembersPage,
  ArtistProfileTabs,
  ArtistProfileWatchlistPage,
} from '../../pages';

const ArtistProfileRoutes = () => (
  <Routes>
    <Route element={<ArtistProfileTabs />}>
      <Route path='' element={<Navigate to='stats' replace />} />
      <Route path='stats' element={<ArtistProfileStatsPage />} />
      <Route path='my-members' element={<ArtistProfileMembersPage />} />
      <Route path='watchlist' element={<ArtistProfileWatchlistPage />} />
    </Route>
  </Routes>
);

export default ArtistProfileRoutes;
