import { Route, Routes } from 'react-router';
import { MessagePage, MessagesPage } from '../../pages';

const MessagesRoutes = () => (
  <Routes>
    <Route path='' element={<MessagesPage />}>
      <Route path=':id' element={<MessagePage />} />
    </Route>
  </Routes>
);
MessagesRoutes.displayName = 'MessagesRoutes';

export default MessagesRoutes;
