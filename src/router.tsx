import { Routes, Route } from 'react-router';
import {
  NotFoundPage,
  HomePage,
  DiscoverPage,
  ReleasesPage,
  ChannelsPage,
  BookmarksPage,
  NotificationsPage,
  ProfilePage,
} from 'pages';
import { MainLayout } from 'layouts';

export const Paths = {
  home: '',
  discover: 'discover',
  channels: 'channels',
  bookmarks: 'bookmark',
  releases: 'releases',
  notifications: 'notifications',
};

function Router() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path={Paths.home} element={<HomePage />} />
        <Route path=':id' element={<ProfilePage />} />
        <Route path={Paths.discover} element={<DiscoverPage />} />
        <Route path={Paths.channels} element={<ChannelsPage />} />
        <Route path={Paths.bookmarks} element={<BookmarksPage />} />
        <Route path={Paths.releases} element={<ReleasesPage />} />
        <Route
          path={Paths.notifications}
          element={<NotificationsPage />}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
