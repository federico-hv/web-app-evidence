import { Route, Routes } from 'react-router';
import { ReleasesPage } from '../../pages';

const MessagesRoutes = () => (
  <Routes>
    <Route path='*' element={<ReleasesPage />} />
  </Routes>
);
MessagesRoutes.displayName = 'MessagesRoutes';

export default MessagesRoutes;
