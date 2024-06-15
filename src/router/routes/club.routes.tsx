import { Route, Routes } from 'react-router';
import {
  ClubPage,
  ClubsMyMembershipsPage,
  ClubsRootPage,
} from '../../pages';
import { Paths } from '../../shared';
import { Navigate } from 'react-router-dom';
import {
  ClubsActiveBidsContent,
  ClubsAllContent,
  ClubsLiveAuctionContent,
  ClubsWatchlistContent,
} from '../../pages/clubs/root/ui';
import ArtistClubBioContent from '../../pages/clubs/club/bio';
import ArtistClubFeedContent from '../../pages/clubs/club/feed';
import ArtistClubLiveBidsContent from '../../pages/clubs/club/live-bids';
import ArtistClubMembershipPerks from '../../pages/clubs/club/perks';

const ClubRoutes = () => (
  <Routes>
    <Route path=':slug' element={<ClubPage />}>
      <Route path='' element={<Navigate to='bio' replace />} />
      <Route path='bio' element={<ArtistClubBioContent />} />
      <Route path='feeds' element={<ArtistClubFeedContent />} />
      <Route path='live-bids' element={<ArtistClubLiveBidsContent />} />
      <Route
        path='membership-perks'
        element={<ArtistClubMembershipPerks />}
      />
    </Route>
    <Route path='' element={<ClubsRootPage />}>
      <Route path='' element={<Navigate to='all' replace />} />
      <Route path='all' element={<ClubsAllContent />} />
      <Route path='auction' element={<ClubsLiveAuctionContent />} />
      <Route path='watchlist' element={<ClubsWatchlistContent />} />
      <Route path='bids' element={<ClubsActiveBidsContent />} />
    </Route>
    <Route
      path={Paths.club.memberships}
      element={<ClubsMyMembershipsPage />}
    />
  </Routes>
);

ClubRoutes.displayName = 'Bookmarks Routes';

export default ClubRoutes;
