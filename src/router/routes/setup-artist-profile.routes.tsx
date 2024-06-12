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
  SetupArtistDialog,
  SocialMediaAccountsView,
  UploadPhotoView,
} from '../../pages';
import { Fragment } from 'react';
import { Overlay } from '@holdr-ui/react';

const SetupArtistProfileRoutes = () => (
  <Routes>
    <Route path='' element={<Overlay />} />
    {/*<Route*/}
    {/*  path=''*/}
    {/*  // element={<SetupArtistDialog error={error} loading={loading} />}*/}
    {/*  element={<Overlay />}*/}
    {/*>*/}
    {/*  <Route*/}
    {/*    path=''*/}
    {/*    element={*/}
    {/*      <NavigateWithPreviousLocation*/}
    {/*        to={Paths.setupArtist.uploadPhoto}*/}
    {/*        fallback='/'*/}
    {/*      />*/}
    {/*    }*/}
    {/*  />*/}
    {/*  <Route*/}
    {/*    path={Paths.setupArtist.uploadPhoto}*/}
    {/*    element={<UploadPhotoView />}*/}
    {/*  />*/}
    {/*  <Route*/}
    {/*    path={Paths.setupArtist.aboutMeAndPerks}*/}
    {/*    element={<BioAndPerksView />}*/}
    {/*  />*/}
    {/*  <Route*/}
    {/*    path={Paths.setupArtist.socialMediaAccounts}*/}
    {/*    element={<SocialMediaAccountsView />}*/}
    {/*  />*/}
    {/*  <Route*/}
    {/*    path={Paths.setupArtist.customURL}*/}
    {/*    element={<CustomURLView />}*/}
    {/*  />*/}
    {/*  <Route*/}
    {/*    path={Paths.setupArtist.connectOnboarding}*/}
    {/*    element={<ConnectOnboardingView />}*/}
    {/*  />*/}
    {/*</Route>*/}
  </Routes>
);

SetupArtistProfileRoutes.displayName = 'SetupProfileRoutes';
export default SetupArtistProfileRoutes;
