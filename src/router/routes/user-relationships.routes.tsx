import { Route, Routes } from 'react-router';
import {
  FollowersListPage,
  FollowingListPage,
  RelationshipsDialog,
  UserMembershipsPage,
} from '../../pages';

const UserRelationshipsRoutes = () => (
  <Routes>
    <Route path='memberships' element={<UserMembershipsPage />} />
    <Route element={<RelationshipsDialog />}>
      <Route path='followers' element={<FollowersListPage />} />
      <Route path='following' element={<FollowingListPage />} />
    </Route>
  </Routes>
);

export default UserRelationshipsRoutes;
