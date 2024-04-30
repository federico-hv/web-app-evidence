import { Route, Routes } from 'react-router';
import { Paths } from '../../shared';
import {
  AboutMeAndPerksView,
  UploadPhotoView,
  SocialMediaAccountsView,
  CustomURLView,
  ConnectOnboardingView,
} from '../../features';
import { SetupArtistFlow } from '../../pages';

const SetupProfileRoutes = () => (
  <Routes>
    <Route path={Paths.artist} element={<SetupArtistFlow />}>
      <Route
        path={Paths.setupArtist.uploadPhoto}
        element={<UploadPhotoView />}
      />
      <Route
        path={Paths.setupArtist.aboutMeAndPerks}
        element={<AboutMeAndPerksView />}
      />
      <Route
        path={Paths.setupArtist.socialMediaAccounts}
        element={<SocialMediaAccountsView />}
      />
      <Route
        path={Paths.setupArtist.customURL}
        element={<CustomURLView />}
      />
      <Route
        path={Paths.setupArtist.connectOnboarding}
        element={<ConnectOnboardingView />}
      />
    </Route>
  </Routes>
);

SetupProfileRoutes.displayName = 'SetupProfileRoutes';
export default SetupProfileRoutes;
