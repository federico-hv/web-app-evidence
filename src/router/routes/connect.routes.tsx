import { Route, Routes } from 'react-router';
import { ConnectSpotifyRedirect } from '../../pages';

const ConnectRoutes = () => (
  <Routes>
    <Route path='spotify' element={<ConnectSpotifyRedirect />} />
  </Routes>
);
ConnectRoutes.displayName = 'ConnectRoutes';

export default ConnectRoutes;
