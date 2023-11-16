import { Route, Routes } from 'react-router';
import { ReleasesPage } from '../../pages';

const ReleasesRoutes = () => (
  <Routes>
    <Route path='' element={<ReleasesPage />} />
  </Routes>
);
ReleasesRoutes.displayName = 'ReleasesRoutes';

export default ReleasesRoutes;
