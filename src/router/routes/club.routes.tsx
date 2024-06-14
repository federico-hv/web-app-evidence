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

const BookmarksRoutes = () => (
  <Routes>
    <Route path='' element={<ClubsRootPage />} />
    <Route path=':slug' element={<ClubPage />} />
    <Route path='' element={<ClubsRootPage />}>
      <Route path='' element={<Navigate to='all' />} />
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

BookmarksRoutes.displayName = 'Bookmarks Routes';

export default BookmarksRoutes;
