import { Route, Routes } from 'react-router';
import {
  ActiveBidsClubsPage,
  AllClubsPage,
  ArtistClubBioPage,
  ArtistClubFeedsPage,
  ArtistClubLiveBidsPage,
  ArtistClubMembershipPerksPage,
  ArtistClubTabs,
  ClubsTabs,
  LiveAuctionsClubPage,
  WatchlistClubPage,
} from '../../pages';

import { Navigate } from 'react-router-dom';

const ClubRoutes = () => (
  <Routes>
    <Route path=':slug' element={<ArtistClubTabs />}>
      <Route path='' element={<Navigate to='bio' replace />} />
      <Route path='bio' element={<ArtistClubBioPage />} />
      <Route path='feeds' element={<ArtistClubFeedsPage />} />
      <Route path='live-bids' element={<ArtistClubLiveBidsPage />} />
      <Route
        path='membership-perks'
        element={<ArtistClubMembershipPerksPage />}
      />
    </Route>
    <Route path='' element={<ClubsTabs />}>
      <Route path='' element={<Navigate to='all' replace />} />
      <Route path='all' element={<AllClubsPage />} />
      <Route path='auction' element={<LiveAuctionsClubPage />} />
      <Route path='watchlist' element={<WatchlistClubPage />} />
      <Route path='bids' element={<ActiveBidsClubsPage />} />
    </Route>
  </Routes>
);

ClubRoutes.displayName = 'Bookmarks Routes';

export default ClubRoutes;
