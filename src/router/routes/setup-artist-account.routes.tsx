import { Route, Routes } from 'react-router';
import { NavigateWithPreviousLocation } from '../../shared';
import {
  ArtistGenresPage,
  ArtistRecommendationsPage,
  SetupAccountDialog,
} from '../../pages';

const SetupArtistAccountRoutes = () => (
  <Routes>
    <Route path='' element={<SetupAccountDialog />}>
      <Route
        path=''
        element={<NavigateWithPreviousLocation to='genres' fallback='/' />}
      />
      <Route path='genres' element={<ArtistGenresPage />} />
      <Route path='recommended' element={<ArtistRecommendationsPage />} />
    </Route>
  </Routes>
);
SetupArtistAccountRoutes.displayName = 'SetupArtistAccountRoutes';

export default SetupArtistAccountRoutes;
