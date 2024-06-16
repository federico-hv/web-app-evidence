import { Route, Routes } from 'react-router';
import { ClubMembersPage } from '../../pages';

const ArtistClubOverlayRoutes = () => (
  <Routes>
    <Route path=':slug'>
      <Route path='members' element={<ClubMembersPage />} />
    </Route>
  </Routes>
);

export default ArtistClubOverlayRoutes;
