import { Route, Routes } from 'react-router';
import { NavigateWithPreviousLocation, Paths, voidFn } from '../../shared';
import {
  ClubContextProvider,
  IClub,
  useCurrentUser,
  useGetClub,
} from '../../features';
import {
  BioAndPerksView,
  ConnectOnboardingView,
  CustomURLView,
  SetupArtistFlow,
  SocialMediaAccountsView,
  UploadPhotoView,
} from '../../pages';
import { GeneralContextProvider } from '@holdr-ui/react';
import { createContext, Fragment, useContext } from 'react';

const SetupProfileRoutes = () => {
  const account = useCurrentUser();

  const { data, loading, error } = useGetClub({
    accountId: account?.id,
  });

  if (!data) {
    // maybe return home / throw error.
    return <Fragment />;
  }

  return (
    <ClubContextProvider value={data.club}>
      <Routes>
        <Route
          path={Paths.artist}
          element={<SetupArtistFlow error={error} loading={loading} />}
        >
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
    </ClubContextProvider>
  );
};
SetupProfileRoutes.displayName = 'SetupProfileRoutes';
export default SetupProfileRoutes;
