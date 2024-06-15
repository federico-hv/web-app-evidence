import { Route, Routes } from 'react-router';
import {
  FollowersListPage,
  FollowingListPage,
  RelationshipsDialog,
} from '../../pages';

const UserRelationshipsRoutes = () => (
  <Routes>
    <Route element={<RelationshipsDialog />}>
      <Route path='followers' element={<FollowersListPage />} />
      <Route path='following' element={<FollowingListPage />} />
    </Route>
  </Routes>
);

export default UserRelationshipsRoutes;
