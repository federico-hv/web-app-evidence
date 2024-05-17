import { Route, Routes } from 'react-router';
import { NavigateWithPreviousLocation } from '../../shared';
import {
  FanGenresPage,
  FanRecommendationsPage,
  SetupAccountDialog,
} from '../../pages';

const SetupArtistAccountRoutes = () => (
  <Routes>
    <Route path='' element={<SetupAccountDialog />}>
      <Route
        path=''
        element={<NavigateWithPreviousLocation fallback='/' />}
      />
      <Route path='genres' element={<FanGenresPage />} />
      <Route path='recommended' element={<FanRecommendationsPage />} />
    </Route>
  </Routes>
);
SetupArtistAccountRoutes.displayName = 'SetupArtistAccountRoutes';

export default SetupArtistAccountRoutes;
