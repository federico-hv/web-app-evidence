import { Route, Routes } from 'react-router';
import {
  ArtistGenresPage,
  ArtistRecommendationsPage,
  FanGenresPage,
  FanRecommendationsPage,
  SetupAccountDialog,
} from '../../pages';
import { NavigateWithPreviousLocation } from '../../shared';

const SetupAccountRoutes = () => (
  <Routes>
    <Route path='fan' element={<SetupAccountDialog />}>
      <Route
        path=''
        element={<NavigateWithPreviousLocation to='genres' fallback='/' />}
      />
      <Route path='genres' element={<FanGenresPage />} />
      <Route path='recommended' element={<FanRecommendationsPage />} />
    </Route>
    <Route path='artist' element={<SetupAccountDialog />}>
      <Route
        path=''
        element={<NavigateWithPreviousLocation to='genres' fallback='/' />}
      />
      <Route path='genres' element={<ArtistGenresPage />} />
      <Route path='recommended' element={<ArtistRecommendationsPage />} />
    </Route>
  </Routes>
);
SetupAccountRoutes.displayName = 'SetupAccountRoutes';

export default SetupAccountRoutes;
