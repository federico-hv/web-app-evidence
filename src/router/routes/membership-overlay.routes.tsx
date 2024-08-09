import { Route, Routes } from 'react-router';
import {
  MembershipCreateEventPerkPage,
  FollowersListPage,
  FollowingListPage,
  MembershipAddPrivatePlaylistPage,
  MembershipAddPublicPlaylistPage,
  MembershipCreateCustomPerkPage,
  MembershipEventPerkPage,
  RelationshipsDialog,
  UserMembershipsPage,
  MembershipAddCustomMoreDescriptionPage,
  MembershipMembersPage,
  MembershipAddWelcomeMessagePage,
  MembershipAddRulesPage,
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
        element={<MembershipCreateEventPerkPage />}
      />
      <Route
        path='custom-perk'
        element={<MembershipCreateCustomPerkPage />}
      />
    </Route>
    <Route path=':slug'>
      <Route path='members' element={<MembershipMembersPage />} />
      <Route path='event-perk'>
        <Route path=':id' element={<MembershipEventPerkPage />} />
      </Route>
      <Route path='add'>
        <Route
          path='welcome-message'
          element={<MembershipAddWelcomeMessagePage />}
        />
        <Route
          path='rules-and-guidelines'
          element={<MembershipAddRulesPage />}
        />
        <Route
          path='custom-more-description'
          element={<MembershipAddCustomMoreDescriptionPage />}
        />
        <Route path='playlist'>
          <Route
            path='private'
            element={<MembershipAddPrivatePlaylistPage />}
          />
          <Route
            path='public'
            element={<MembershipAddPublicPlaylistPage />}
          />
        </Route>
      </Route>
    </Route>
  </Routes>
);

export default MembershipOverlayRoutes;
