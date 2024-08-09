import { Route, Routes } from 'react-router';
import { Paths } from '../../shared';
import {
  MembershipsAboutPage,
  MembershipsEventsPage,
  MembershipsHomePage,
  MembershipsMorePage,
  MembershipsMusicPage,
  MembershipTabs,
} from '../../pages';
import { Navigate } from 'react-router-dom';

const MembershipRoutes = () => (
  <Routes>
    <Route path={Paths.slug} element={<MembershipTabs />}>
      <Route
        path={Paths.root}
        element={<Navigate to={Paths.home} replace />}
      />
      <Route path={Paths.home} element={<MembershipsHomePage />} />
      <Route path={Paths.events} element={<MembershipsEventsPage />} />
      <Route path={Paths.music} element={<MembershipsMusicPage />} />
      <Route path={Paths.more} element={<MembershipsMorePage />} />
      <Route path={Paths.about} element={<MembershipsAboutPage />} />
    </Route>
  </Routes>
);
MembershipRoutes.displayName = 'MembershipRoutes';

export default MembershipRoutes;
