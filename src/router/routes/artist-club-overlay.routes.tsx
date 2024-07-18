import { Route, Routes } from 'react-router';
import {
  ClubMembersPage,
  EditArtistClubAuctionDetailsPage,
  EditArtistClubBioPage,
  EditArtistClubDialog,
  EditArtistClubMusicAndLinksPage,
} from '../../pages';
import { Paths } from '../../shared';
import { Navigate } from 'react-router-dom';
import {
  CreateLiveAuctionDialog,
  ReviewAuctionInfo,
  ConfirmAuction,
} from '../../pages/overlays/create-live-auction';

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
        <Route path={Paths.create} element={<CreateLiveAuctionDialog />}>
          <Route
            path={Paths.auctionDetails}
            element={
              <div>
                Add your page here - Do not use the
                EditArtistClubAuctionDetailsPage component
              </div>
            }
          />
          <Route
            path={Paths.reviewAuctionInfo}
            element={<ReviewAuctionInfo />}
          />
          <Route
            path={Paths.confirmAuction}
            element={<ConfirmAuction />}
          />
        </Route>
      </Route>
      <Route path={Paths.members} element={<ClubMembersPage />} />
    </Route>
  </Routes>
);

export default ArtistClubOverlayRoutes;
