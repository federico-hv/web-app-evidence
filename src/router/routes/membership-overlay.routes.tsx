import { Route, Routes } from 'react-router';
import {
  CreateMembershipEventPerkPage,
  FollowersListPage,
  FollowingListPage,
  MembershipEventPerkPage,
  RelationshipsDialog,
  UserMembershipsPage,
} from '../../pages';

const MembershipOverlayRoutes = () => (
  <Routes>
    <Route path='memberships' element={<UserMembershipsPage />} />
    <Route element={<RelationshipsDialog />}>
      <Route path='followers' element={<FollowersListPage />} />
      <Route path='following' element={<FollowingListPage />} />
    </Route>
    <Route path=':slug/create'>
      <Route
        path='event-perk'
        element={<CreateMembershipEventPerkPage />}
      />
    </Route>
    <Route path=':slug/event-perk'>
      <Route path=':id' element={<MembershipEventPerkPage />} />
    </Route>
  </Routes>
);

export default MembershipOverlayRoutes;
