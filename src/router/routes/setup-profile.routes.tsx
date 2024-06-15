import { Route, Routes } from 'react-router';
import {
  BioAndPerksView,
  ConnectOnboardingView,
  CustomURLView,
  SocialMediaAccountsView,
  UploadPhotoView,
} from '../../pages';
import { NavigateWithPreviousLocation, Paths } from '../../shared';
import SetupArtistDialog from '../../pages/overlays/artist-profile/ui/setup-artist.dialog';

const SetupProfileRoutes = () => (
  <Routes>
    <Route path='artist' element={<SetupArtistDialog />}>
      <Route
        path=''
        element={
          <NavigateWithPreviousLocation
            to={Paths.setupArtist.uploadPhoto}
            fallback='/'
          />
        }
      />
      <Route
        path={Paths.setupArtist.uploadPhoto}
        element={<UploadPhotoView />}
      />
      <Route
        path={Paths.setupArtist.aboutMeAndPerks}
        element={<BioAndPerksView />}
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

export default SetupProfileRoutes;
