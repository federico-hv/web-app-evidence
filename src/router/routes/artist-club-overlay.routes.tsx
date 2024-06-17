import { Route, Routes } from 'react-router';
import { ClubMembersPage, EditArtistClubDialog } from '../../pages';
import { Paths } from '../../shared';
import { Box, Overlay } from '@holdr-ui/react';

const ArtistClubOverlayRoutes = () => (
  <Routes>
    <Route path={Paths.slug}>
      <Route path={Paths.edit} element={<EditArtistClubDialog />}>
        <Route path={Paths.bio} element={<Box>Bio</Box>} />
        <Route
          path={Paths.musicAndLinks}
          element={<Box>Music and links</Box>}
        />
        <Route path={Paths.auction} element={<Box>Auction</Box>} />
      </Route>
      <Route path={Paths.members} element={<ClubMembersPage />} />
      <Route path={Paths.auction}>
        {/* Replace with auction creation dialog */}
        <Route path={Paths.create} element={<Overlay zIndex={15} />} />
      </Route>
    </Route>
  </Routes>
);

export default ArtistClubOverlayRoutes;
