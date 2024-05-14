import { Route, Routes } from 'react-router';
import { Paths, voidFn } from '../../shared';
import { useCurrentUser, useGetClub } from '../../features';
import {
  BioAndPerksView,
  ConnectOnboardingView,
  CustomURLView,
  SetupArtistFlow,
  SocialMediaAccountsView,
  UploadPhotoView,
} from '../../pages';
import { GeneralContextProvider } from '@holdr-ui/react';
import { Fragment } from 'react';

const SetupProfileRoutes = () => {
  const account = useCurrentUser();

  const { data, loading, error } = useGetClub({
    accountId: account?.id,
  });

  if (!data) {
    return <Fragment />;
  }

  return (
    <GeneralContextProvider
      value={{
        state: data.club,
        update: voidFn,
      }}
    >
      <Routes>
        <Route
          path={Paths.artist}
          element={<SetupArtistFlow error={error} loading={loading} />}
        >
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
    </GeneralContextProvider>
  );
};
SetupProfileRoutes.displayName = 'SetupProfileRoutes';
export default SetupProfileRoutes;
