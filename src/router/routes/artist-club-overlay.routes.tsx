import { Route, Routes } from 'react-router';
import {
  ClubMembersPage,
  EditArtistClubAuctionDetailsPage,
  EditArtistClubBioPage,
  EditArtistClubDialog,
  EditArtistClubMusicAndLinksPage,
} from '../../pages';
import { Paths } from '../../shared';
import { Box, Overlay } from '@holdr-ui/react';
import { Navigate } from 'react-router-dom';

const ArtistClubOverlayRoutes = () => (
  <Routes>
    <Route path={Paths.slug}>
      <Route path={Paths.edit} element={<EditArtistClubDialog />}>
        <Route path='' element={<Navigate replace to={Paths.bio} />} />
        <Route path={Paths.bio} element={<EditArtistClubBioPage />} />
        <Route
          path={Paths.musicAndLinks}
          element={<EditArtistClubMusicAndLinksPage />}
        />
        <Route
          path={Paths.auction}
          element={<EditArtistClubAuctionDetailsPage />}
        />
      </Route>
      <Route path={Paths.auction}>
        {/* 📝 @Fed Replace with auction creation dialog -- see above*/}
        <Route path={Paths.create} element={<Overlay zIndex={15} />} />
      </Route>
      <Route path={Paths.members} element={<ClubMembersPage />} />
    </Route>
  </Routes>
);

export default ArtistClubOverlayRoutes;
