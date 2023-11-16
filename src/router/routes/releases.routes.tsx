import { Route, Routes } from 'react-router';
import { ReleasesPage } from '../../pages';
import { useSearchParams } from 'react-router-dom';

function SpotifyConnectRedirect() {
  const [params] = useSearchParams();

  console.log(params);

  return <div>HAHAHA</div>;
}

const ReleasesRoutes = () => (
  <Routes>
    <Route path='' element={<ReleasesPage />} />
    <Route path='spotify/connect' element={<SpotifyConnectRedirect />} />
  </Routes>
);
ReleasesRoutes.displayName = 'ReleasesRoutes';

export default ReleasesRoutes;
