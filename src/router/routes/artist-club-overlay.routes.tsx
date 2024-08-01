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
  ReviewAuctionInfoPage,
  ConfirmAuctionPage,
  AuctionDetailsPage,
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
            path=''
            element={<Navigate replace to={Paths.auctionDetails} />}
          />

          <Route
            path={Paths.auctionDetails}
            element={<AuctionDetailsPage />}
          />
          <Route
            path={Paths.reviewAuctionInfo}
            element={<ReviewAuctionInfoPage />}
          />
          <Route
            path={Paths.confirmAuction}
            element={<ConfirmAuctionPage />}
          />
        </Route>
      </Route>
      <Route path={Paths.members} element={<ClubMembersPage />} />
    </Route>
  </Routes>
);

export default ArtistClubOverlayRoutes;
