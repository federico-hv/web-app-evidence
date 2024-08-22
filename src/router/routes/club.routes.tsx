import React from 'react';
import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { ErrorFallback, Loader } from '../../shared';
import { ErrorBoundary } from 'react-error-boundary';

const ActiveBidsClubsPage = React.lazy(
  () => import('../../pages/clubs/active-bids'),
);
const AllClubsPage = React.lazy(() => import('../../pages/clubs/all'));
const ArtistClubBioPage = React.lazy(
  () => import('../../pages/clubs/[slug]/bio'),
);
const ArtistClubFeedsPage = React.lazy(
  () => import('../../pages/clubs/[slug]/feeds'),
);
const ArtistClubLiveBidsPage = React.lazy(
  () => import('../../pages/clubs/[slug]/live-bids'),
);
const ArtistClubMembershipPerksPage = React.lazy(
  () => import('../../pages/clubs/[slug]/membership-perks'),
);
const ArtistClubTabs = React.lazy(
  () => import('../../pages/clubs/[slug]/ui/artist-club.tabs'),
);
const ClubsTabs = React.lazy(
  () => import('../../pages/clubs/ui/clubs.tabs'),
);
const LiveAuctionsClubPage = React.lazy(
  () => import('../../pages/clubs/live-auctions'),
);
const WatchlistClubPage = React.lazy(
  () => import('../../pages/clubs/watchlist'),
);

const ClubRoutes = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Suspense fallback={<Loader loading={true} />}>
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
    </Suspense>
  </ErrorBoundary>
);

ClubRoutes.displayName = 'Bookmarks Routes';

export default ClubRoutes;
