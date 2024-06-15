import { Route, Routes } from 'react-router';
import {
  BioAndPerksView,
  ConnectOnboardingView,
  CustomURLView,
  SetupArtistDialog,
  SocialMediaAccountsView,
  UploadPhotoView,
} from '../../pages';
import { NavigateWithPreviousLocation, Paths } from '../../shared';

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
